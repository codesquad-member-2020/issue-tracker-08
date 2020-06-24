const chooseColors = (random) => {
  for (let i = 0; i < 3; i++) {
    random.push(Math.floor(Math.random() * 256));
  }
  return random;
};

const isBackDark = (rgb) => rgb.reduce((a, b) => a + b) < 127 * 3;

const rgbToHex = (rgb) =>
  "#" +
  rgb
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join("");

const isInvalid = (hex) => {
  const regex = /([a-f\d]{2})/gm;
  const result = hex.match(regex);

  return result.length < 3;
};

const hexToRGB = (hex) => {
  const regex = /([a-f\d]{2})/gm;
  const result = hex.match(regex);
  return [parseInt(result[0], 16), parseInt(result[1], 16), parseInt(result[2], 16)];
};

const randomColor = () => {
  const color = chooseColors([]);
  return [rgbToHex(color), isBackDark(color)];
};

const isDark = (hex) => isBackDark(hexToRGB(hex));

export { isDark, randomColor, isInvalid };
