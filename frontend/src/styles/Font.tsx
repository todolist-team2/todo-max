import styled, { css } from "styled-components";

function fontType($type: string) {
  switch ($type) {
    case "bold":
      return 700;
    case "medium":
      return 500;
    default:
  }
}

function fontSize($size: string) {
  switch ($size) {
    case "L":
      return 1.714;
    case "M":
      return 1.15;
    case "R":
      return 1;
    case "S":
      return 0.85;
  }
}

export const Font = styled.span<{ $type: string; $size: string }>`
  ${({ $type, $size }) => css`
    font: pretendard ${fontType($type)} ${fontSize($size)}rem};
  `}
`;
