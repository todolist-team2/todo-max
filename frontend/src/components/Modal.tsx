import React from "react";
import { styled } from "styled-components";
import { TTheme } from "../types/theme";

export default function Modal({ message, action }: { message: string; action: () => void }) {

  function closeHandler(e: React.SyntheticEvent<HTMLDialogElement, Event>) {
    const dialog = e.target as HTMLDialogElement;

    console.log(dialog.returnValue);
    action();
  }

  return (
    <>
      {!!message && <Dim />}
      <Dialog open={!!message} onClose={closeHandler}>
        <p>{message}</p>
        <form method="dialog">
          <menu>
            <li>
              <button value="cancel">취소</button>
            </li>
            <li>
              <button value="ok">삭제</button>
            </li>
          </menu>
        </form>
      </Dialog>
    </>
  );
}

const Dim = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(20, 33, 43, 0.3);
`;

const Dialog = styled.dialog<{theme: TTheme}>`
  width: 320px;
  border: none;
  border-radius: 8px;
  padding: 24px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 2px 8px rgba(110, 128, 145, 0.16);

  p {
    margin-bottom: 24px;
    font: ${props => props.theme.font.display.medium16};
    color: ${props => props.theme.color.text.default};
  }
  form {
    display: block;
  }

  menu {
    display: flex;
    gap: 8px;

    li {
      flex: 1;
    }

    button {
      border: none;
      border-radius: 8px;
      width: 100%;
      padding: 8px 0;
      background-color: transparent;
      font: ${props => props.theme.font.display.bold14};

      &[value="cancel"] {
        color: ${props => props.theme.color.text.default};
        background-color: ${props => props.theme.color.surface.alt};
      }

      &[value="ok"] {
        color: ${props => props.theme.color.text.white.default};
        background-color: ${props => props.theme.color.surface.danger};
      }
    }
  }
`;
