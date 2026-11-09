import { useCallback, useEffect, useRef, useState } from "react";

export type CopyValue = string | (() => string);

export function useCopyText() {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async (value: CopyValue) => {
    clearTimeout(timer.current);
    setStatus("copying");
    try {
      const text = typeof value === "function" ? value() : value;
      await navigator.clipboard.writeText(text);
      if (!mounted.current) return;
      setStatus("copied");
    } catch {
      if (!mounted.current) return;
      setStatus("error");
    }
    timer.current = setTimeout(() => setStatus("idle"), 1800);
  }, []);
  return { copy, status };
}
