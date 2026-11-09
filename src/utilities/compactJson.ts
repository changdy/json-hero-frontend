/** Compact already valid JSON without parsing or rounding numeric literals. */
export function compactJson(text: string): string {
  let result = "";
  let inString = false;
  let escaped = false;
  for (const character of text) {
    if (inString) {
      result += character;
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
    } else if (character === '"') {
      inString = true;
      result += character;
    } else if (character !== " " && character !== "\t" && character !== "\r" && character !== "\n") {
      result += character;
    }
  }
  return result;
}
