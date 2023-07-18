import { createGlobalStyle } from "styled-components";
import { TTheme } from "../types/TTheme";

const CommonStyle = createGlobalStyle<{ theme: TTheme }>`
  body {
    position: relative;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.color.surface.alt};
  }
  .blind {
    width: 1px;
    height: 1px;
    margin: -1px;
    position: absolute;
    overflow: hidden;
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
`;

export default CommonStyle;
