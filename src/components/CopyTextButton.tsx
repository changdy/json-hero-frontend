import { ClipboardIcon } from "@heroicons/react/24/outline";
import { useCopyText, type CopyValue } from "~/hooks/useCopyText";
import { Body } from "./Primitives/Body";

export type CopyTextButtonProps = {
  value: CopyValue;
  className?: string;
  label?: string;
};

export function CopyTextButton({ value, className, label = "Copy" }: CopyTextButtonProps) {
  const { copy, status } = useCopyText();
  return (
    <button type="button" onClick={() => void copy(value)} disabled={status === "copying"}
      aria-label={label} className={`${className} focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500`}>
      <span className="flex items-center" aria-live="polite">
          <ClipboardIcon className="h-4 w-4 mr-[2px]" />
          <Body>{status === "copied" ? "Copied!" : status === "error" ? "Copy failed" : label}</Body>
      </span>
    </button>
  );
}
