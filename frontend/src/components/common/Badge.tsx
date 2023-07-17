import { css, styled } from "styled-components";
import TTheme from "../../types/TTheme";

export const Badge = styled(({ className, digit }: { className?: string; digit: number }) => {
  return (
    <span className={className}>
      <span className="text-label">{digit}</span>
    </span>
  );
})<{ theme: TTheme; $2DigitPlus: boolean }>`
  height: 24px;
  padding: 4px;
  box-sizing: border-box;
  display: inline-flex;
  ${({ theme }) => {
    const { color, font, border } = theme;
    return css`
      border: 1px solid ${color.border.default};
      font: ${font.display.medium12};
      border-radius: ${border.radius.round8};
    `;
  }}

  .text-label {
    padding: 0 4px;
  }

  ${({ $2DigitPlus }) =>
    $2DigitPlus
      ? css`
          .text-label {
            display: none;
          }
          &::after {
            content: "99+";
          }
        `
      : css`
          .text-label {
            display: inline-block;
          }
        `}
`;
