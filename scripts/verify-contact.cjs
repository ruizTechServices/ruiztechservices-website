const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

// Load the actual TS modules with only network/framework boundaries stubbed.
function load(file, stubs = {}) {
  const filename = path.resolve(file);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const output = { exports: {} };
  new Function("require", "module", "exports", source)(
    (name) => (name in stubs ? stubs[name] : require(name)),
    output,
    output.exports,
  );
  return output.exports;
}
const schema = load("lib/forms/contactSchema.ts");
const valid = {
  name: "Test Visitor",
  email: "visitor@example.com",
  service: "tech-rescue",
  websiteUrl: "https://example.com/contact",
  message: "The contact form shows an error when submitted.",
  privacy: "accepted",
};
function form(changes = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ ...valid, ...changes }))
    if (value !== undefined) data.set(key, value);
  return data;
}
for (const [name, changes] of [
  ["missing message", { message: undefined }],
  ["whitespace message", { message: "   " }],
  ["blank name", { name: "  " }],
  ["invalid email", { email: "a@" }],
  ["oversized message", { message: "x".repeat(5001) }],
  ["unknown service", { service: "admin" }],
  ["honeypot", { companyWebsite: "spam.example" }],
  ["unacknowledged privacy", { privacy: undefined }],
  ["incomplete URL", { websiteUrl: "https://" }],
  ["missing rescue URL", { websiteUrl: "" }],
  ["unsafe URL scheme", { websiteUrl: "javascript:alert(1)" }],
  ["URL credentials", { websiteUrl: "https://secret:password@example.com" }],
  [
    "uploaded file instead of text",
    { message: new Blob(["not a plain message"]) },
  ],
])
  test(`rejects ${name}`, () =>
    assert.equal(schema.parseContactForm(form(changes)).success, false));

test("normalizes names/email and keeps inquiry context", () => {
  const result = schema.parseContactForm(
    form({
      name: "  Test Visitor  ",
      email: "Visitor@Example.COM",
      source: "just-tools",
    }),
  );
  assert.equal(result.success, true);
  assert.equal(result.data.name, "Test Visitor");
  assert.equal(result.data.email, "visitor@example.com");
  assert.match(
    schema.formatContactMessage(result.data),
    /Inquiry context: just-tools/,
  );
});
test("local support does not require a website", () =>
  assert.equal(
    schema.parseContactForm(
      form({ service: "local-tech-help", websiteUrl: "" }),
    ).success,
    true,
  ));

function contactActions(error) {
  let writes = 0;
  const module = load("lib/actions/contact.ts", {
    "@/lib/supabase": {
      supabase: {
        from(table) {
          assert.equal(table, "contact_submissions");
          return {
            insert(row) {
              writes++;
              assert.equal(row.status, "new");
              return { abortSignal: async () => ({ error }) };
            },
          };
        },
      },
    },
    "@/lib/forms/contactSchema": schema,
    "next/headers": { headers: async () => new Headers() },
    "next/navigation": {
      redirect() {
        throw new Error("unexpected redirect");
      },
    },
  });
  return { module, writes: () => writes };
}
test("invalid requests never reach the database", async () => {
  const actions = contactActions(null);
  const result = await actions.module.submitContactForm(
    {},
    form({ message: "" }),
  );
  assert.equal(result.success, false);
  assert.equal(actions.writes(), 0);
});
test("contact success needs insert only, without inbox readback", async () => {
  const actions = contactActions(null);
  const result = await actions.module.submitContactForm({}, form());
  assert.equal(result.success, true);
  assert.equal(actions.writes(), 1);
});
test("an unavailable database never returns a false success", async () => {
  const actions = contactActions({ code: "unavailable" });
  const result = await actions.module.submitContactForm({}, form());
  assert.equal(result.success, false);
  assert.match(result.error, /email/);
});
test("non-admins cannot use any inbox action", async () => {
  const actions = load("lib/actions/admin-contact.ts", {
    "@/lib/auth/admin": { requireAdminUser: async () => ({ ok: false }) },
    "next/cache": {
      revalidatePath() {
        throw new Error("unauthorized cache mutation");
      },
    },
  });
  assert.equal((await actions.getContactSubmissions()).data, null);
  assert.equal(
    (await actions.updateContactSubmissionStatus(1, "read")).success,
    false,
  );
  assert.equal((await actions.deleteContactSubmission(1)).success, false);
});
