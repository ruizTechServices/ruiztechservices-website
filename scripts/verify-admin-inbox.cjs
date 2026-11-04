const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const submission = {
  id: 17,
  name: "Test Visitor",
  email: "visitor@example.com",
  message: "The contact form returns an error after submission.",
  status: "new",
  created_at: "2026-10-31T12:00:00Z",
};

// Execute the actual component and event handlers. Only React hooks, the JSX
// element factory, UI primitives, and server-action boundaries are stubbed.
function inbox(actions = {}) {
  let error = null;
  const transitions = [];
  const calls = [];
  const primitives = (names) =>
    Object.fromEntries(names.split(" ").map((name) => [name, name]));
  const element = (type, props, key) => ({ type, props, key });
  const stubs = {
    react: {
      useState: () => [error, (value) => { error = value; }],
      useTransition: () => [false, (callback) => transitions.push(callback())],
    },
    "react/jsx-runtime": { jsx: element, jsxs: element },
    "@/components/ui/card": primitives("Card CardContent CardHeader CardTitle"),
    "@/components/ui/button": primitives("Button"),
    "@/components/ui/select": primitives(
      "Select SelectContent SelectItem SelectTrigger SelectValue",
    ),
    "@/components/ui/alert-dialog": primitives(
      "AlertDialog AlertDialogAction AlertDialogCancel AlertDialogContent AlertDialogDescription AlertDialogFooter AlertDialogHeader AlertDialogTitle AlertDialogTrigger",
    ),
    "@/components/ui/badge": primitives("Badge"),
    "lucide-react": primitives("Trash2 Mail Clock User"),
    "@/lib/actions/admin-contact": {
      async updateContactSubmissionStatus(id, status) {
        calls.push({ action: "status", id, status });
        return actions.update ? actions.update() : { success: true };
      },
      async deleteContactSubmission(id) {
        calls.push({ action: "delete", id });
        return actions.remove ? actions.remove() : { success: true };
      },
    },
  };
  const filename = path.resolve("components/admin/ContactSubmissionsManager.tsx");
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
  const output = { exports: {} };
  new Function("require", "module", "exports", source)(
    (name) => (name in stubs ? stubs[name] : require(name)),
    output,
    output.exports,
  );
  return {
    calls,
    render: (rows = [submission]) =>
      output.exports.ContactSubmissionsManager({ submissions: rows }),
    settle: async () => { await Promise.all(transitions.splice(0)); },
  };
}

function find(tree, predicate) {
  if (Array.isArray(tree)) {
    for (const child of tree) {
      const match = find(child, predicate);
      if (match) return match;
    }
  } else if (tree && typeof tree === "object") {
    if (predicate(tree)) return tree;
    return find(tree.props?.children, predicate);
  }
  return undefined;
}

const byType = (type) => (node) => node.type === type;
const alert = (tree) => find(tree, (node) => node.props?.role === "alert");

test("a rejected status update keeps the saved status selected", async () => {
  const view = inbox({ update: async () => ({ success: false, error: "Update denied." }) });
  find(view.render(), byType("Select")).props.onValueChange("replied");
  await view.settle();
  const tree = view.render();
  const select = find(tree, byType("Select"));
  assert.equal(select.props.value, "new");
  assert.equal(select.props.defaultValue, undefined);
  assert.equal(alert(tree).props.children, "Update denied.");
  assert.deepEqual(view.calls, [{ action: "status", id: 17, status: "replied" }]);
});

test("the status control follows refreshed server data", () => {
  const view = inbox();
  assert.equal(find(view.render(), byType("Select")).props.value, "new");
  assert.equal(
    find(view.render([{ ...submission, status: "read" }]), byType("Select")).props.value,
    "read",
  );
});

test("a thrown status action shows a recovery message without false confirmation", async () => {
  const view = inbox({ update: async () => { throw new Error("Network interrupted"); } });
  find(view.render(), byType("Select")).props.onValueChange("replied");
  await assert.doesNotReject(view.settle());
  const tree = view.render();
  assert.equal(find(tree, byType("Select")).props.value, "new");
  assert.match(alert(tree).props.children, /confirm.*status change/i);
  assert.match(alert(tree).props.children, /refresh.*inbox/i);
});

test("a thrown deletion keeps the entry visible and explains how to recover", async () => {
  const view = inbox({ remove: async () => { throw new Error("Response lost"); } });
  find(view.render(), byType("AlertDialogAction")).props.onClick();
  await assert.doesNotReject(view.settle());
  const tree = view.render();
  assert.ok(find(tree, byType("Card")));
  assert.match(alert(tree).props.children, /confirm.*deletion/i);
  assert.match(alert(tree).props.children, /refresh.*inbox/i);
  assert.deepEqual(view.calls, [{ action: "delete", id: 17 }]);
});

test("each inbox action has an accessible name identifying its submission", () => {
  const tree = inbox().render();
  assert.match(find(tree, byType("SelectTrigger")).props["aria-label"], /status.*Test Visitor/i);
  assert.match(find(tree, byType("Button")).props["aria-label"], /delete.*Test Visitor/i);
});
