import { inferType as inferNativeType } from "@jsonhero/json-infer-types";
import type { JSONValueType } from "@jsonhero/json-infer-types";
import { isNumericDateString } from "./inferredTemporal";

export type { JSONValueType, JSONIntType, JSONFloatType } from "@jsonhero/json-infer-types";

export function inferType(value: unknown): JSONValueType {
  const inferred = inferNativeType(value);
  if (inferred.name === "string" && inferred.format?.name === "datetime" &&
      isNumericDateString(inferred.value)) {
    return { name: "string", value: inferred.value };
  }
  return inferred;
}
