export const iconRandomColor = () => {
  var color: Array<string> = [
    // "red",
    "blue",
    // "yellow",
    // "green",
    // "pink",
    // "purple",
  ];

  return color[generateRandom(color.length)];
};

const generateRandom = (color: number) => {
  return Math.floor(Math.random() * color);
};
