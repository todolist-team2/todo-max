import styled, { css } from "styled-components";
import { TTheme } from "../types/TTheme";
import Buttons from "./common/Buttons";

const Header = styled(({ className }: { className?: string }) => {
  return (
    <header className={className}>
      <h1 className="blind">헤더</h1>
      <a className="logo" href="/">
        TODO LIST
      </a>
      <Buttons
        $Flexible=""
        $Type="Ghost"
        $ElementPattern="Icon Only"
        $States="Enable"
        icon="History"
        onClick={() => console.log("기록 열기")}
      />
    </header>
  );
})<{ theme: TTheme }>`
  padding: 2.29rem 5.8rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => {
    const { font, color } = theme;
    return css`
      .logo {
        font: ${font.display.bold24};
        text-decoration: none;
        color: ${color.text.strong};
      }
    `;
  }}
`;

export default Header;
