import React from "react";
import { styled } from "styled-components";

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
  background-color: rgb(150, 150, 150);
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const Dialog = styled.dialog`
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
