import styled from "styled-components";
import { TTheme } from "../types/theme";

const LogoStyledA = styled.a<{theme: TTheme}>`
  font: ${(props) => props.theme.font.display.bold24};
  text-decoration: none;
  color: ${(props) => props.theme.color.text.strong};
`;

export default function Logo() {
  return <LogoStyledA href="/">TODO LIST</LogoStyledA>;
}
