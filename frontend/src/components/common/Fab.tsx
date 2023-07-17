import { css, styled } from "styled-components";
import TTheme from "../../types/TTheme";
import { IconRouter } from "./Icon";
export const Fab = styled(({ className }: { className: string }) => {
  return <button className={className}>{IconRouter("Plus")}</button>;
})<{ theme: TTheme }>`
  ${({ theme }) => {
    const { color } = theme;
    return css`
      background: ${color.accent.blue};
      border-radius: 50%;
    `;
  }}
`;
