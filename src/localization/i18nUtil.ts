export const interpolationFormat = {
  format: (value: string, format?: string) => {
    if (format === "uppercase") return value.toUpperCase();
    if (format === "lowercase") return value.toLowerCase();
    return value;
  }
};
