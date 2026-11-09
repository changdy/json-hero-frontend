import { json as jsonLang } from "@codemirror/lang-json";
import {
  useCodeMirror,
  ViewUpdate,
} from "@uiw/react-codemirror";
import { useRef, useEffect } from "react";
import { useJsonDoc } from "~/hooks/useJsonDoc";
import { getEditorSetup } from "~/utilities/codeMirrorSetup";
import { darkTheme, lightTheme } from "~/utilities/codeMirrorTheme";
import { useTheme } from "./ThemeProvider";
import { useHotkeys } from "react-hotkeys-hook";
import { nodeSelectionTransaction } from "~/utilities/editorSelection";

export type CodeEditorProps = {
  content: string;
  language?: "json";
  readOnly?: boolean;
  onChange?: (value: string) => void;
  onUpdate?: (update: ViewUpdate) => void;
  selection?: { start: number; end: number };
  syncSelection?: boolean;
};

const languages = {
  json: jsonLang,
};

type CodeEditorDefaultProps = Required<
  Omit<CodeEditorProps, "content" | "onChange" | "onUpdate">
>;

const defaultProps: CodeEditorDefaultProps = {
  language: "json",
  readOnly: true,
  selection: { start: 0, end: 0 },
  syncSelection: true,
};

export function CodeEditor(opts: CodeEditorProps) {
  const { content, language, readOnly, onChange, onUpdate, selection, syncSelection } = {
    ...defaultProps,
    ...opts,
  };

  const [theme] = useTheme();

  const extensions = getEditorSetup();

  const languageExtension = languages[language];

  extensions.push(languageExtension());

  const editor = useRef(null);
  const { setContainer, view, state } = useCodeMirror({
    extensions,
    editable: !readOnly,
    contentEditable: !readOnly,
    value: content,
    autoFocus: false,
    theme: theme === "light" ? lightTheme() : darkTheme(),
    indentWithTab: false,
    basicSetup: false,
    onChange,
    onUpdate,
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [setContainer]);

  const initializedView = useRef<typeof view>(undefined);

  useEffect(() => {
    if (!view || !selection || (!syncSelection && initializedView.current === view)) {
      return;
    }
    initializedView.current = view;
    const transaction = nodeSelectionTransaction(view.state, selection);
    if (transaction) view.dispatch(transaction);
  }, [selection, syncSelection, view, content]);

  const { minimal } = useJsonDoc();

  useHotkeys(
   "ctrl+a,meta+a,command+a",
   (e) => {
     e.preventDefault();
     view?.dispatch({ selection: { anchor: 0, head: state?.doc.length } });
   },
   [view, state]
 );


  return (
    <div>
      <div
        className={`${
          minimal ? "h-jsonViewerHeightMinimal" : "h-jsonViewerHeight"
        } overflow-y-auto no-scrollbar`}
        ref={editor}
      />
    </div>
  );
}
