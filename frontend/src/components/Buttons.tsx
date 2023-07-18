import { styled } from "styled-components";
import { IconRouter } from "./Icon";
import { TTheme } from "../types/TTheme";

const Buttons = styled(
  ({
    className,
    icon,
    text,
    value,
    type,
    onClick,
  }: {
    className?: string;
    icon?: string;
    text?: string;
    value?: string;
    type?: "button" | "reset" | "submit";
    onClick?: () => void;
  }) => {
    return (
      <button
        className={className}
        {...{
          value: value ? value : undefined,
          onClick: onClick ? () => onClick() : undefined,
          type: type ? type : undefined,
        }}>
        <span className="container">
          {icon && IconRouter(icon)}
          {text && <span className="text-label">{text}</span>}
        </span>
      </button>
    );
  }
)<{
  theme: TTheme;
  $Flexible: "Fixed" | "";
  $Type: "Contained" | "Ghost";
  $ElementPattern: "Icon Only" | "Text Only" | "Icon + Text";
  $States: "Enable" | "Hover" | "Disabled";
}>`
  padding: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  .container {
    display: block;
  }
  svg {
    display: block;
  }

  ${({ theme, $Flexible, $Type, $ElementPattern, $States }) => {
    const { font, border } = theme;
    let styleRules = `
      font: ${font.display.bold14};
      border-radius: ${border.radius.round8};
    `;

    switch ($Flexible) {
      case "Fixed":
        styleRules += `
          height: 32px;
          width: auto !important;
        `;
        break;
      case "":
        styleRules += ``;
        break;
    }

    switch ($Type) {
      case "Contained":
        styleRules += ``;
        break;
      case "Ghost":
        styleRules += `
          background: transparent !important;
        `;
        break;
    }

    switch ($ElementPattern) {
      case "Icon Only":
        styleRules += `
        `;
        break;
      case "Text Only":
        styleRules += `
          .text-label {
            padding: 0 4px;
          }
        `;
        break;
      case "Icon + Text":
        styleRules += `
          .text-label {
            padding: 0 4px;
          }
        `;
        break;
    }

    switch ($States) {
      case "Enable":
        styleRules += `
          opacity: 1;
        `;
        break;
      case "Hover":
        styleRules += `
          opacity: .8;
        `;
        break;
      case "Disabled":
        styleRules += `
          opacity: .3;
        `;
        break;
    }

    return styleRules;
  }}
`;

export default Buttons;
