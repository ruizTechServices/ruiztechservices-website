const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");

// Execute the actual OAuth function; only browser and network boundaries are stubbed.
function oauth({ response, fetchError, oauthError } = {}) {
  const source = ts.transpileModule(
    fs.readFileSync("lib/auth/oauth.ts", "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  const calls = [];
  const output = { exports: {} };
  const stubs = {
    "@/lib/env": {
      env: {
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-public-key",
      },
    },
    "@/lib/supabase/browser": {
      createSupabaseBrowserClient() {
        return {
          auth: {
            async signInWithOAuth(options) {
              calls.push(options);
              return { error: oauthError ?? null };
            },
          },
        };
      },
    },
  };
  new Function("require", "module", "exports", "fetch", "window", source)(
    (name) => (name in stubs ? stubs[name] : require(name)),
    output,
    output.exports,
    async (url, options) => {
      assert.equal(url, "https://example.supabase.co/auth/v1/settings");
      assert.equal(options.headers.apikey, "test-public-key");
      assert.ok(options.signal instanceof AbortSignal);
      if (fetchError) throw fetchError;
      return response;
    },
    { location: { origin: "https://www.ruiztechservices.com" } },
  );
  return { run: output.exports.signInWithGoogleOAuth, calls };
}

const unavailable =
  "Sign-in is temporarily unavailable. You can request help without an account.";

for (const [name, settings] of [
  ["disabled Google provider", { external: { google: false } }],
  ["missing provider settings", {}],
  ["missing Google provider", { external: {} }],
  ["non-boolean provider setting", { external: { google: "true" } }],
  ["null settings", null],
]) {
  test(`${name} keeps visitors out of the OAuth redirect`, async () => {
    const subject = oauth({
      response: { ok: true, async json() { return settings; } },
    });
    await assert.rejects(subject.run("/admin"), { message: unavailable });
    assert.deepEqual(subject.calls, []);
  });
}

for (const [name, options] of [
  ["HTTP failure", { response: { ok: false } }],
  ["network failure", { fetchError: new Error("network unavailable") }],
  ["invalid JSON", {
    response: {
      ok: true,
      async json() { throw new SyntaxError("invalid JSON"); },
    },
  }],
]) {
  test(`${name} shows the availability message without an OAuth redirect`, async () => {
    const subject = oauth(options);
    await assert.rejects(subject.run(), { message: unavailable });
    assert.deepEqual(subject.calls, []);
  });
}

test("enabled Google sign-in retains the callback and requested destination", async () => {
  const subject = oauth({
    response: { ok: true, async json() { return { external: { google: true } }; } },
  });
  await subject.run("/admin");
  assert.deepEqual(subject.calls, [{
    provider: "google",
    options: {
      redirectTo: "https://www.ruiztechservices.com/auth/callback?next=%2Fadmin",
    },
  }]);
});

test("an enabled provider still reports an OAuth SDK error", async () => {
  const error = new Error("OAuth request failed");
  const subject = oauth({
    response: { ok: true, async json() { return { external: { google: true } }; } },
    oauthError: error,
  });
  await assert.rejects(subject.run(), error);
  assert.equal(subject.calls.length, 1);
});
