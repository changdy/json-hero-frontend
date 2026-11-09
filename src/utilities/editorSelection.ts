import { Annotation } from "@codemirror/state";
import type { EditorState, TransactionSpec } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

// Keep programmatic node navigation out of the editor-to-node feedback loop.
export const nodeSelection = Annotation.define<boolean>();

export function nodeSelectionTransaction(
  state: EditorState,
  selection: { start: number; end: number }
): TransactionSpec | undefined {
  const anchor = Math.max(0, Math.min(selection.start, state.doc.length));
  const head = Math.max(anchor, Math.min(selection.end, state.doc.length));
  if (state.selection.main.anchor === anchor && state.selection.main.head === head) {
    return;
  }
  return {
    selection: { anchor, head },
    annotations: nodeSelection.of(true),
    effects: EditorView.scrollIntoView(anchor, { y: "start", yMargin: 100 }),
  };
}
