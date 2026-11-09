import assert from "node:assert/strict";
import { test } from "node:test";
import { inferTemporal, isNumericDateString } from "../src/utilities/inferredTemporal.ts";
import { inferType } from "@jsonhero/json-infer-types";

test("numeric identifiers do not become dates or emit parsing errors", () => {
  for (const value of ["12345678", "20241109", "00123456", "2024", "+123456", "1234.56"]) {
    assert.equal(isNumericDateString(value), true);
    assert.equal(inferTemporal(value, { name: "datetime", variant: "rfc3339", parts: "date" }), undefined);
  }
});

test("explicit ISO dates, times and time zones continue to work", () => {
  for (const value of ["2024-11-09", "2024-11-09T12:30:00Z", "2024-11-09T12:30:00+08:00", "12:30:00"]) {
    const info = inferType(value);
    assert.ok(info.name === "string" && info.format?.name === "datetime");
    assert.ok(inferTemporal(value, info.format), value);
  }
});

test("invalid date-shaped strings fall back without console errors", () => {
  const previous = console.error;
  console.error = () => assert.fail("date inference should not log expected parsing failures");
  try {
    assert.equal(inferTemporal("2024-99-99", { name: "datetime", variant: "rfc3339", parts: "date" }), undefined);
  } finally {
    console.error = previous;
  }
});
