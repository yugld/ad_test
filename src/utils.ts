export const removeEmpty = (obj: { [key: string]: unknown }) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v != null && v !== '' && (!Array.isArray(v) || v.length > 0)
    )
  );
};
