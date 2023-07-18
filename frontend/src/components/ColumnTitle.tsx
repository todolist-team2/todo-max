import { css, styled } from "styled-components";
import { TTheme } from "../types/TTheme";
import ColumnControl from "./ColumnControl";
import { Badge } from "./Badge";

const ColumnTitle = styled(
  ({
    className,
    title,
    count,
  }: {
    className?: string;
    title: string;
    count: number;
  }) => {
    return (
      <h3 className={className}>
        <span className="text-aria">
          <span className="title">{title}</span>
          <Badge $2DigitPlus={count > 99} digit={count} />
        </span>
        <ColumnControl />
      </h3>
    );
  }
)<{ theme: TTheme }>`
  width: 300px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .text-aria {
    display: inline-flex;
    gap: 8px;
    align-items: center;
  }

  ${({ theme }) => {
    const { font } = theme;
    return css`
      font: ${font.display.bold16};
    `;
  }}
`;

export default ColumnTitle;
