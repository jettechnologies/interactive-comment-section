export const getImagePath = (name: string) => {
  return new URL(`../images/avatars/${name}`, import.meta.url).href;
};

console.log(getImagePath);
