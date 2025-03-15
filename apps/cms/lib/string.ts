export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
};

export const unslugify = (slug: string) => {
  return slug.replace(/-/g, " ");
};
