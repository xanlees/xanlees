function hashCode(str: string) {
  const colorLength = 5;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << colorLength) - hash + char;
    hash &= hash;
  }
  return hash;
}
function hashToColor(hash: number) {
  const darkColor = 0xAAAAAA;
  const hex = 16;
  const white = "000000";
  const color = (hash & darkColor).toString(hex).toUpperCase();
  return `#${white.substring(color.length) + color}`;
}
export function stringToColorCode(inputString: string) {
  const hash = hashCode(inputString);
  return hashToColor(hash);
}

