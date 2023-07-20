import { css, styled } from "styled-components";
import TTheme from "../../../../../types/TTheme";
import Buttons from "../../../../common/Buttons";

const CardShadow = styled(
  ({ className, id, title, content, nickname }: { className?: string; id: number; title: string; content: string; nickname: string }) => {
    const mode = "Place";

    return (
      <article className={className} data-mode={mode}>
        <h4 className="blind">카드</h4>
        <div className="container">
          <div className="inner">
            <h4>{title}</h4>
            <pre>{content}</pre>
            <p>author by web</p>
          </div>
          <menu className="control">
            <li>
              <Buttons $Flexible="" $Type="Ghost" $ElementPattern="Icon Only" $States="Enable" icon="Close" />
            </li>
            <li>
              <Buttons $Flexible="" $Type="Ghost" $ElementPattern="Icon Only" $States="Enable" icon="Edit" />
            </li>
          </menu>
        </div>
      </article>
    );
  }
)<{ theme: TTheme }>`
  ${({ theme }) => {
    const { color, font } = theme;
    return css`
      width: 300px;
      padding: 16px;
      border-radius: 8px;
      background-color: ${color.surface.default};
      box-shadow: 0px 1px 4px rgba(110, 128, 145, 0.24);
      opacity: 0.3;

      & > .container {
        display: flex;
        align-items: flex-start;
        gap: 16px;
      }

      h4 {
        font: ${font.display.bold14};
        color: ${color.text.strong};
        margin-bottom: 8px;
      }

      pre {
        font: ${font.display.medium14};
        color: ${color.text.default};
      }

      p {
        font: ${font.display.medium12};
        margin-top: 16px;
        color: ${color.text.weak};
      }

      form {
        input {
          background: transparent;
          border: 0;
          margin-top: -1px;
          margin-left: -2px;
        }
        input[name="title"] {
          font: ${font.display.bold14};
          color: ${color.text.strong};
          margin-bottom: 7px;
        }
        textarea[name="body"] {
          font: ${font.display.medium14};
          color: ${color.text.default};
          margin-bottom: 6px;
        }
      }

      .inner {
        flex-grow: 1;
      }

      .control {
        button {
          display: block;
          background-color: transparent;
          border: 0;
          padding: 0;
          cursor: pointer;
        }
      }
      .edit-menu {
        display: flex;
        gap: 8px;
        li {
          width: 100%;
          &.register button {
            color: ${color.text.default};
          }
          &.register button {
            background-color: ${color.surface.brand};
            color: ${color.text.white.default};
          }
        }
        button {
          width: 100%;
        }
      }
    `;
  }}
`;

export default CardShadow;
