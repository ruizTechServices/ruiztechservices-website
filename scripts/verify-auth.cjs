const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const { NextRequest } = require("next/server");

// Execute real middleware and Next response handling; only Supabase is stubbed.
function middleware({ admin = false, missingClaims = false } = {}) {
  const source = ts.transpileModule(
    fs.readFileSync("lib/supabase/middleware.ts", "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  let calls = 0;
  const stubs = {
    "@/lib/env": {
      env: {
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-public-key",
      },
    },
    "@supabase/ssr": {
      createServerClient(_url, _key, { cookies }) {
        calls++;
        return {
          auth: {
            async getClaims() {
              cookies.setAll([
                {
                  name: "sb-test-auth-token.0",
                  value: missingClaims ? "" : "refreshed",
                  options: {
                    path: "/",
                    sameSite: "lax",
                    secure: true,
                    maxAge: missingClaims ? 0 : 3600,
                  },
                },
                {
                  name: "sb-test-auth-token.1",
                  value: "",
                  options: { path: "/", maxAge: 0 },
                },
              ]);
              return {
                data: missingClaims ? null : { claims: { sub: "test-user" } },
                error: null,
              };
            },
          },
          from(table) {
            assert.equal(table, "admins");
            return {
              select() {
                return this;
              },
              eq(column, value) {
                assert.equal(column, "user_id");
                assert.equal(value, "test-user");
                return this;
              },
              async maybeSingle() {
                return {
                  data: admin ? { user_id: "test-user" } : null,
                  error: null,
                };
              },
            };
          },
        };
      },
    },
  };
  const output = { exports: {} };
  new Function("require", "module", "exports", source)(
    (name) => (name in stubs ? stubs[name] : require(name)),
    output,
    output.exports,
  );
  return { run: output.exports.updateSupabaseSession, calls: () => calls };
}

function request(path) {
  return new NextRequest(`https://www.ruiztechservices.com${path}`, {
    headers: {
      cookie:
        "sb-test-auth-token.0=expired; sb-test-auth-token.1=old-chunk; preference=keep",
    },
  });
}

function assertRefreshedCookies(response) {
  const cookie = response.cookies.get("sb-test-auth-token.0");
  assert.equal(cookie?.value, "refreshed");
  assert.equal(cookie?.path, "/");
  assert.equal(cookie?.sameSite, "lax");
  assert.equal(cookie?.secure, true);
  assert.equal(cookie?.maxAge, 3600);
  assert.equal(response.cookies.get("sb-test-auth-token.1")?.maxAge, 0);
}

test("refreshed session reaches both Server Components and the browser", async () => {
  const response = await middleware().run(request("/dashboard"));
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("x-middleware-request-cookie"),
    /sb-test-auth-token.0=refreshed/,
  );
  assert.match(
    response.headers.get("x-middleware-request-cookie"),
    /preference=keep/,
  );
  assert.doesNotMatch(
    response.headers.get("x-middleware-request-cookie"),
    /expired|old-chunk/,
  );
  assertRefreshedCookies(response);
});

test("admin dashboard redirect preserves refreshed and removed cookie chunks", async () => {
  const response = await middleware({ admin: true }).run(request("/dashboard"));
  assert.equal(
    response.headers.get("location"),
    "https://www.ruiztechservices.com/admin",
  );
  assertRefreshedCookies(response);
});

test("admin denial preserves refreshed cookies and still denies access", async () => {
  const response = await middleware().run(request("/admin"));
  assert.equal(
    new URL(response.headers.get("location")).searchParams.get("auth_error"),
    "forbidden",
  );
  assertRefreshedCookies(response);
});

test("invalid session redirect clears browser cookies and retains the return path", async () => {
  const response = await middleware({ missingClaims: true }).run(
    request("/dashboard?tab=profile"),
  );
  const redirect = new URL(response.headers.get("location"));
  assert.equal(redirect.searchParams.get("auth_error"), "login_required");
  assert.equal(redirect.searchParams.get("next"), "/dashboard?tab=profile");
  assert.equal(response.cookies.get("sb-test-auth-token.0")?.maxAge, 0);
});

test("public requests do not call Supabase", async () => {
  const subject = middleware();
  const response = await subject.run(request("/services"));
  assert.equal(response.status, 200);
  assert.equal(subject.calls(), 0);
  assert.equal(response.cookies.getAll().length, 0);
});
