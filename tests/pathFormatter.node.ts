import assert from "node:assert/strict";
import { test } from "node:test";
import { JSONHeroPath } from "@jsonhero/path";
import { formatPath } from "../src/utilities/pathFormatter.ts";

test("copy paths distinguish object keys from actual array indices", () => {
  const json = { data: [{ "01": { name: "Ada" }, "0": "zero", "12x": "code" }] };
  assert.equal(formatPath("$.data.0.01.name", "jsonpath", json), '$.data[0]["01"].name');
  assert.equal(formatPath("$.data.0.0", "js", json), 'root.data[0]["0"]');
  assert.equal(formatPath("$.data.0.12x", "jsonpath", json), '$.data[0]["12x"]');
  assert.equal(formatPath("$.0.0", "jsonpath", [[false]]), "$[0][0]");
});

test("root and false, empty, null values have usable paths", () => {
  assert.equal(formatPath("$", "jsonpath", {}), "$");
  assert.equal(formatPath("$", "js", {}), "root");
  for (const value of [false, 0, "", null]) {
    assert.equal(formatPath("$.value", "js", { value }), "root.value");
  }
});

test("special keys use properly escaped quoted brackets", () => {
  for (const key of ["a.b", "user-name", 'a"b', "a\\b", "line\nbreak", "tab\tkey", "中文", "a/b", "a~b"]) {
    const path = new JSONHeroPath("$." + key.replace(/\./g, "\\."));
    assert.equal(formatPath(path.toString(), "js", { [key]: true }), `root[${JSON.stringify(key)}]`, key);
  }
});
