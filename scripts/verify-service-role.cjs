const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");

const source = ts.transpileModule(
  fs.readFileSync("lib/supabase/admin.ts", "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;

const websiteUrl = "https://website-test.supabase.co";
const legacyUrl = "https://legacy-test.supabase.co";
const serviceRoleKey = "test-service-role-key";

function adminClient(serviceRoleUrl) {
  const output = { exports: {} };
  const stubs = {
    "server-only": {},
    "@/lib/env": {
      env: {
        NEXT_PUBLIC_SUPABASE_URL: websiteUrl,
        SUPABASE_SERVICE_ROLE_URL: serviceRoleUrl,
        SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey,
      },
    },
    "@supabase/supabase-js": {
      createClient: (url, key) => ({ url, key }),
    },
  };
  new Function("require", "module", "exports", source)(
    (name) => (name in stubs ? stubs[name] : require(name)),
    output,
    output.exports,
  );
  return output.exports.createSupabaseAdmin();
}

test("the legacy service role key stays on its project after the website cutover", () => {
  assert.deepEqual(adminClient(legacyUrl), { url: legacyUrl, key: serviceRoleKey });
});

test("deployments without a service role URL retain their existing configuration", () => {
  assert.deepEqual(adminClient(), { url: websiteUrl, key: serviceRoleKey });
});
