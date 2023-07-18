import { css, styled } from "styled-components";
import { IconRouter } from "./Icon";
import { TTheme } from "../types/TTheme";
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
