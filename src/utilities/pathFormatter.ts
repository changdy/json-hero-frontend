import { JSONHeroPath } from "@jsonhero/path";

export type PathFormat = "jsonpath" | "js";
const identifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/** Use the document to distinguish array indices from numeric object keys. */
export function formatPath(path: string, format: PathFormat, json: unknown): string {
  const pointer = new JSONHeroPath(path).jsonPointer();
  const keys = pointer === "" ? [] : pointer.slice(1).split("/").map(
    key => key.replace(/~1/g, "/").replace(/~0/g, "~")
  );
  let result = format === "jsonpath" ? "$" : "root";
  let parent = json;
  for (const key of keys) {
    if (Array.isArray(parent) && /^(0|[1-9]\d*)$/.test(key)) {
      result += `[${key}]`;
    } else if (identifier.test(key)) {
      result += `.${key}`;
    } else {
      result += `[${JSON.stringify(key)}]`;
    }
    parent = parent !== null && typeof parent === "object" &&
      Object.prototype.hasOwnProperty.call(parent, key)
      ? (parent as Record<string, unknown>)[key]
      : undefined;
  }
  return result;
}
