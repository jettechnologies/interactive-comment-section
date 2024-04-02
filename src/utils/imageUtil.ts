// export const getImagePath = (name: string) => {
//   const fileName = name.split("/")[3];
//   console.log(fileName)
//   return new URL(`../images/avatars/${fileName}`, import.meta.url).href;
// };

export const getImagePath = (url: string) => {
  const fileName = url.split("/").pop(); // Extract the file name from the URL
  const imagePath = new URL(`../images/avatars/${fileName}`, import.meta.url).href;
  return imagePath;
};
