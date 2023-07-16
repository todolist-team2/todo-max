// theme.ts

export type TTheme = {
  font: {
    bold: {
      L: string;
      M: string;
      R: string;
      S: string;
    };
    medium: {
      M: string;
      R: string;
      S: string;
    };
    display: {
      bold24: string;
      bold16: string;
      bold14: string;
      bold12: string;
      medium16: string;
      medium14: string;
      medium12: string;
    };
    selected: {
      bold16: string;
      bold14: string;
    };
    available: {
      medium16: string;
      medium14: string;
    };
  };
  color: {
    grayscale: {
      [key: string]: string;
    };
    accent: {
      blue: string;
      navy: string;
      red: string;
    };
    text: {
      strong: string;
      bold: string;
      default: string;
      weak: string;
      white: {
        default: string;
        weak: string;
      };
      brand: string;
      danger: string;
    };
    surface: {
      default: string;
      alt: string;
      brand: string;
      danger: string;
    };
    border: {
      default: string;
    };
  };
  objectStyles: {
    radius: {
      s: string;
      m: string;
      l: string;
    };
    dropShadow: {
      normal: string;
      up: string;
      floating: string;
    };
  };
};
