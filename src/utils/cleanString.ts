export const cleanString = (input: string) => {
  const unCodeTeks = input.replace(/\0/g, "");
  const contextIndex = unCodeTeks.indexOf("KONTEKS:");
  if (contextIndex !== -1) {
    return unCodeTeks.substring(contextIndex);
  }
  return unCodeTeks;
};
