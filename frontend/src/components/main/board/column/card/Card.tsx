import { FormEvent, useCallback, useContext, useEffect, useRef, useState } from "react";
import { css, styled } from "styled-components";
import { useAlert } from "../../../../../hooks/useAlert";
import TTheme from "../../../../../types/TTheme";
import fetchData from "../../../../../utils/fetch";
import Buttons from "../../../../common/Buttons";
import { DragContext } from "../../Board";

type TMode = "Default" | "Add/Edit" | "Drag" | "Place";

const Card = styled(
  ({
    className,
    id,
    title,
    content,
    nickname,
    onDelete,
    onEdit,
    onCardChanged,
  }: {
    className?: string;
    id: number;
    title: string;
    content: string;
    nickname: string;
    onDelete: () => Promise<void>;
    onEdit: () => void;
    onCardChanged: () => Promise<void>;
  }) => {
    const [mode, setMode] = useState<TMode>("Default");
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [position, setPosition] = useState<{ x: number; y: number }>();
    const componentRef = useRef<HTMLElement>(null);
    const { handleDraggingCardDataUpdate, handleDraggingCardPositionUpdate, addCardRect, startDragging, draggingDestinationData, getDropData, initializeDragStates } =
      useContext(DragContext);

    function editFormSubmitHandler(event: FormEvent<HTMLFormElement>): void {
      event.preventDefault();
      console.log(event.target);
    }

    const handleMouseDown = (e: React.MouseEvent) => {
      const componentRect = componentRef.current!.getBoundingClientRect();
      const offsetX = e.clientX - componentRect.left;
      const offsetY = e.clientY - componentRect.top;

      setDragOffset({ x: offsetX, y: offsetY });
      setIsMouseDown(true);
    };

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
        handleDraggingCardPositionUpdate({
          x: e.clientX,
          y: e.clientY,
        });
        handleDraggingCardDataUpdate({ id, title, content, nickname });
        startDragging();
      },
      [dragOffset, handleDraggingCardPositionUpdate, handleDraggingCardDataUpdate, startDragging, id, title, content, nickname]
    );

    const handleMouseUp = () => {
      setIsMouseDown(false);
      const { fromPrevCardId, toCategoryId, toPrevCardId } = getDropData();
      moveCard(id, { fromPrevCardId, toCategoryId, toPrevCardId });
      initializeDragStates();
    };

    const moveCard = async (
      cardId: number,
      destinationData: {
        fromPrevCardId: number;
        toCategoryId: number;
        toPrevCardId: number;
      }
    ) => {
      console.log("destination", destinationData)
      try {
        await fetchData(
          `/api/cards/${cardId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(destinationData),
          },
          () => {
            onCardChanged();
          }
        );
      } catch (error) {
        console.error(error);
      }
    };

    const positionStyle: React.CSSProperties = position
      ? {
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: "100",
        }
      : {};

    useEffect(() => {
      if (!isMouseDown) {
        return;
      }

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, [isMouseDown, handleMouseMove]);

    useEffect(() => {
      if (componentRef.current) {
        addCardRect(id, componentRef.current.getBoundingClientRect());
      }
    }, []);

    return (
      <article
        className={className}
        data-mode={mode}
        ref={componentRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={positionStyle}
      >
        <h4 className="blind">카드</h4>
        {mode !== "Add/Edit" && (
          <div className="container">
            <div className="inner">
              <h4>{title}</h4>
              <pre>{content}</pre>
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
                  onClick={() => useAlert.use("선택한 카드를 삭제할까요?", onDelete)}
                />
              </li>
              <li>
                <Buttons $Flexible="" $Type="Ghost" $ElementPattern="Icon Only" $States="Enable" icon="Edit" onClick={onEdit} />
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
              <textarea name="body" defaultValue={content}></textarea>
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
                  onClick={() => setMode("Default")}
                />
              </li>
              <li className="register">
                <Buttons $Flexible="" $Type="Contained" $ElementPattern="Text Only" $States="Enable" text="저장" type="submit" />
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
      width: 300px;
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

export default Card;
