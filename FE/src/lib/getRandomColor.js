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

const pipe = (...functions) => (args) => functions.reduce((arg, nextFn) => nextFn(arg), args);

const isDark = () => pipe(chooseColors, isBackDark)([]);
const randomColor = () => pipe(chooseColors, rgbToHex)([]);

export { isDark, randomColor };
