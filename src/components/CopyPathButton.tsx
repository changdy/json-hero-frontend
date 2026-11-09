import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useHotkeys } from "react-hotkeys-hook";
import { useJson } from "~/hooks/useJson";
import { useCopyText } from "~/hooks/useCopyText";
import { formatPath } from "~/utilities/pathFormatter";
import { CopyTextButton } from "./CopyTextButton";
import { Popover, PopoverContent, PopoverTrigger } from "./UI/Popover";

export function CopyPathButton({ path }: { path: string }) {
  const [json] = useJson();
  const { copy, status } = useCopyText();
  useHotkeys("shift+p", event => {
    event.preventDefault();
    void copy(() => formatPath(path, "jsonpath", json));
  }, [copy, path, json]);
  const Icon = status === "copied" ? CheckIcon : ClipboardDocumentIcon;
  return (
    <Popover>
      <PopoverTrigger>
        <button type="button" aria-label="Copy path" title={status === "error" ? "Copy failed" : "Copy path (Shift+P)"}
          className="ml-auto flex h-[26px] w-[26px] shrink-0 items-center justify-center text-slate-700 hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:text-slate-400 dark:hover:bg-slate-700">
          <Icon className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" sideOffset={8}
        className="z-50 flex flex-col rounded-sm border border-slate-300 bg-white p-1 text-slate-800 shadow-md dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
        <CopyTextButton label="Copy as JSONPath" value={() => formatPath(path, "jsonpath", json)}
          className="rounded-sm px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700" />
        <CopyTextButton label="Copy as JavaScript" value={() => formatPath(path, "js", json)}
          className="rounded-sm px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700" />
      </PopoverContent>
    </Popover>
  );
}
