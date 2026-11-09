import assert from "node:assert/strict";
import { test } from "node:test";
import { compactJson } from "../src/utilities/compactJson.ts";

test("single line copy removes formatting while preserving string content", () => {
  const value = { text: 'spaces  and\ttab\nline "quoted" \\ slash', nested: [null, false, 0, { "a b": "中文 😀" }] };
  const formatted = JSON.stringify(value, null, 2);
  const compact = compactJson(formatted);
  assert.equal(compact, JSON.stringify(value));
  assert.deepEqual(JSON.parse(compact), value);
  assert.equal(compact.includes("\n"), false);
});

test("single line copy keeps exact numeric digits, exponents and negative zero", () => {
  const formatted = '{\n  "id": 9223372036854775807,\r\n  "decimal": 0.123456789012345678901,\n  "exponent": 1.00e+400,\n  "zero": -0\n}';
  assert.equal(compactJson(formatted), '{"id":9223372036854775807,"decimal":0.123456789012345678901,"exponent":1.00e+400,"zero":-0}');
});

test("escaped quotes and backslashes do not confuse string boundaries", () => {
  for (const value of ['\\"  still inside', 'ends with \\', '" a "', "", false, null, 0, []]) {
    const formatted = JSON.stringify(value, null, 4);
    assert.equal(compactJson(" \t\r\n" + formatted + "\n"), JSON.stringify(value));
  }
});
