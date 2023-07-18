import { css, styled } from "styled-components";
import { TTheme } from "../types/TTheme";
import Dim from "../styles/Dim";
import { useEffect, useState } from "react";
import { useAlert } from "../hooks/useAlert";
import { TAlertState } from "../types/TAlertState";
import Buttons from "./Buttons";

const Alert = styled(({ className }: { className?: string }) => {
  const [alertState, setAlertState] = useState<TAlertState | null>(null);

  useEffect(() => {
    useAlert.register(setAlertState);
  }, []);

  function closeHandler(e: React.SyntheticEvent<HTMLDialogElement, Event>) {
    const dialog = e.target as HTMLDialogElement;

    if (dialog.returnValue === "ok") {
      alertState!.action();
    }
    setAlertState(null);
  }

  return (
    <>
      {alertState && <Dim />}
      <dialog
        className={className}
        open={alertState !== null}
        onClose={closeHandler}>
        <p>{alertState?.message}</p>
        <form method="dialog">
          <menu>
            <li className="cancel">
              <Buttons
                $Flexible=""
                $Type="Contained"
                $ElementPattern="Text Only"
                $States="Enable"
                text="취소"
                value="cancel"
              />
            </li>
            <li className="ok">
              <Buttons
                $Flexible=""
                $Type="Contained"
                $ElementPattern="Text Only"
                $States="Enable"
                text="삭제"
                value="ok"
              />
            </li>
          </menu>
        </form>
      </dialog>
    </>
  );
})<{ theme: TTheme }>`
  width: 320px;
  border: none;
  padding: 24px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 2px 8px rgba(110, 128, 145, 0.16);
  form {
    display: block;
  }

  menu {
    display: flex;
    gap: 8px;

    li {
      flex: 1;
    }
  }
  button {
    width: 100%;
  }

  ${({ theme }) => {
    const { font, color, border, boxShadow } = theme;

    return css`
      box-shadow: ${boxShadow.up};
      border-radius: ${border.radius.round8};
      p {
        margin-bottom: 24px;
        font: ${font.display.medium16};
        color: ${color.text.default};
      }

      .cancel button {
        background-color: ${color.surface.alt};
        color: ${color.text.default};
      }

      .ok button {
        background-color: ${color.surface.danger};
        color: ${color.text.white.default};
      }
    `;
  }}
`;

export default Alert;
