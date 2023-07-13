import { TTheme } from "./types/theme";

const fontFamily = '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif'

export const theme: TTheme = {
  font: {
    bold: {
      L: `700 1.7143rem ${fontFamily}`,
      M: `700 1.143rem ${fontFamily}`,
      R: `700 1rem ${fontFamily}`,
      S: `700 0.86rem ${fontFamily}`,
    },
    medium: {
      M: `700 1.143rem/1.57rem ${fontFamily}`,
      R: `700 1rem ${fontFamily}`,
      S: `700 0.86rem ${fontFamily}`,
    },
    display: {
      bold24: `700 1.7143rem ${fontFamily}`,
      bold16: `700 1.143rem ${fontFamily}`,
      bold14: `700 1rem700 1rem ${fontFamily}`,
      bold12: `700 0.86rem ${fontFamily}`,
      medium16: `500 1.143rem ${fontFamily}`,
      medium14: `500 1rem700 1rem ${fontFamily}`,
      medium12: `500 0.86rem ${fontFamily}`,
    },
    selected: {
      bold16: `700 1.143rem ${fontFamily}`,
      bold14: `700 1rem700 1rem ${fontFamily}`,
    },
    available: {
      medium16: `500 1.143rem ${fontFamily}`,
      medium14: `500 1rem700 1rem ${fontFamily}`,
    },
  },
  color: {
    grayscale: {
      50: "#FEFEFE",
      100: "#F7F7FC",
      200: "#EFF0F6",
      300: "#D9DBE9",
      400: "#BEC1D5",
      500: "#A0A3BD",
      600: "#6E7191",
      700: "#4E4B66",
      800: "#2A2A44",
      900: "#14142B",
    },
    accent: {
      blue: "#007AFF",
      navy: "#0025E6",
      red: "#FF3B30",
    },
    text: {
      strong: "#14142B",
      bold: "#4E4B66",
      default: "#6E7191",
      weak: "#A0A3BD",
      white: {
        default:"#FEFEFE",
        weak: "#F7F7FC"
      },
      brand: "#007AFF",
      danger: "#FF3B30",
    },
    surface: {
      default: "#FEFEFE",
      alt: "#F7F7FC",
      brand: "#007AFF",
      danger:"#FF3B30"
    },
    border: {   
      default: "#EFF0F6"
    }
  },
};