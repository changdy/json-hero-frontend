import assert from "node:assert/strict";
import { test } from "node:test";
import { EditorState } from "@codemirror/state";
import { nodeSelection, nodeSelectionTransaction } from "../src/utilities/editorSelection.ts";

test("external node navigation updates the selection repeatedly", () => {
  let state = EditorState.create({ doc: '{"first": 1, "second": 2}' });
  for (const selection of [{ start: 1, end: 11 }, { start: 13, end: 24 }, { start: 1, end: 11 }]) {
    const transaction = state.update(nodeSelectionTransaction(state, selection)!);
    assert.equal(transaction.annotation(nodeSelection), true);
    assert.equal(transaction.state.selection.main.anchor, selection.start);
    assert.equal(transaction.state.selection.main.head, Math.min(selection.end, state.doc.length));
    assert.ok(transaction.effects.length > 0, "navigation must scroll to the target");
    state = transaction.state;
  }
});

test("manual selection stays distinguishable and unchanged ranges do not dispatch again", () => {
  const state = EditorState.create({ doc: "123456" });
  const manual = state.update({ selection: { anchor: 2, head: 3 } });
  assert.equal(manual.annotation(nodeSelection), undefined);
  assert.equal(nodeSelectionTransaction(manual.state, { start: 2, end: 3 }), undefined);
});

test("stale ranges are bounded to the current document", () => {
  const state = EditorState.create({ doc: "123" });
  const result = state.update(nodeSelectionTransaction(state, { start: -1, end: 100 })!);
  assert.equal(result.state.selection.main.from, 0);
  assert.equal(result.state.selection.main.to, 3);
});
