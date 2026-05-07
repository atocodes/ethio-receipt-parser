export const removeAmharcChars = (text: string) =>
  text.substring(text.lastIndexOf("/") + 1).trim();

export const parseBirr = (value: string): number =>
  parseFloat(value.replace(/[^\d.]/g, ""));
