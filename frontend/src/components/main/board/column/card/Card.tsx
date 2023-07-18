import { css, styled } from "styled-components";
import { FormEvent, useState } from "react";
import Buttons from "../../../../common/Buttons";
import { useAlert } from "../../../../../hooks/useAlert";
import { TTheme } from "../../../../../types/TTheme";

const Card = styled(
  ({
    className,
    title,
    text,
    onDelete,
  }: {
    className?: string;
    title: string;
    text: string;
    onDelete: () => void;
  }) => {
    const [mode, setMode] = useState<"default" | "Add/Edit" | "Drag" | "Place">(
      "default"
    );

    function editFormSubmitHandler(event: FormEvent<HTMLFormElement>): void {
      event.preventDefault();
      console.log(event.target);
    }

    return (
      <article className={className} data-mode={mode}>
        <h4 className="blind">카드</h4>
        {mode !== "Add/Edit" && (
          <div className="container">
            <div className="inner">
              <h4>{title}</h4>
              <pre>{text}</pre>
              <p>author by web</p>
            </div>
            <menu className="control">
              <li>
                <Buttons
                  $Flexible=""
                  $Type="Ghost"
                  $ElementPattern="Icon Only"
                  $States="Enable"
                  icon="Close"
                  onClick={() =>
                    useAlert.use("선택한 카드를 삭제할까요?", onDelete)
                  }
                />
              </li>
              <li>
                <Buttons
                  $Flexible=""
                  $Type="Ghost"
                  $ElementPattern="Icon Only"
                  $States="Enable"
                  icon="Edit"
                  onClick={() => setMode("Add/Edit")}
                />
              </li>
            </menu>
          </div>
        )}
        {mode === "Add/Edit" && (
          <form onSubmit={editFormSubmitHandler}>
            <fieldset>
              <input type="text" name="title" defaultValue={title} />
            </fieldset>
            <fieldset>
              <input type="text" name="body" defaultValue={text} />
            </fieldset>
            <menu className="edit-menu">
              <li className="cancel">
                <Buttons
                  $Flexible=""
                  $Type="Contained"
                  $ElementPattern="Text Only"
                  $States="Enable"
                  text="취소"
                  type="button"
                  onClick={() => setMode("default")}
                />
              </li>
              <li className="register">
                <Buttons
                  $Flexible=""
                  $Type="Contained"
                  $ElementPattern="Text Only"
                  $States="Enable"
                  text="저장"
                  type="submit"
                />
              </li>
            </menu>
          </form>
        )}
      </article>
    );
  }
)<{ theme: TTheme }>`
  ${({ theme }) => {
    const { color, font } = theme;
    return css`
      padding: 16px;
      border-radius: 8px;
      background-color: ${color.surface.default};
      box-shadow: 0px 1px 4px rgba(110, 128, 145, 0.24);
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
        input[name="body"] {
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

export default Card;
