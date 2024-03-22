function hashCode(str: string) {
  const colorLength = 5;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << colorLength) - hash + char;
    hash &= hash; // Convert to 32bit integer
  }
  return hash;
}
function hashToColor(hash: number) {
  const darkColor = 0xAAAAAA;
  const hex = 16;
  const white = "000000";
  // Use the bitwise AND operation with 0xFFFFFF to get the last 6 digits
  // and convert them to a hexadecimal string.
  const color = (hash & darkColor).toString(hex).toUpperCase();
  // Ensure the color code has 6 digits by padding with leading zeros if necessary.
  return `#${white.substring(color.length) + color}`;
}
export function stringToColorCode(inputString: string) {
  const hash = hashCode(inputString);
  return hashToColor(hash);
}

