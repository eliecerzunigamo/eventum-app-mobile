export const toTitle = (title: string) => {
  const newTitle = title.charAt(0).toUpperCase() + title.slice(1);
  return newTitle;
};
