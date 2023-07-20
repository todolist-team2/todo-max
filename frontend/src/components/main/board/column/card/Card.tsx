import { useEffect, useRef, useState } from "react";
import { css, styled } from "styled-components";
import { useDragContext } from "../../../../../contexts/DragContext";
import { useAlert } from "../../../../../hooks/useAlert";
import TTheme from "../../../../../types/TTheme";
import Buttons from "../../../../common/Buttons";

type TMode = "Default" | "Add/Edit" | "Drag" | "Place";

const Card = styled(
  ({
    className,
    id,
    title,
    content,
    nickname,
    categoryId,
    onDelete,
    onEdit,
  }: {
    className?: string;
    id: number;
    title: string;
    content: string;
    nickname: string;
    categoryId: number;
    onDelete: () => Promise<void>;
    onEdit: () => void;
  }) => {
    const [mode, setMode] = useState<TMode>("Default");
    const cardRef = useRef<HTMLElement>(null);
    const { draggedCard, draggedCardStyle, setCoordinates, setIsDragging, setDraggedCard, setDragOffset } = useDragContext();

    useEffect(() => {
      if (cardRef.current) {
        setCoordinates((c) =>
          c.map((category) => {
            if (category.id === categoryId) {
              return {
                ...category,
                cards: category.cards.some((card) => card.id === id)
                  ? category.cards
                  : [
                      ...category.cards,
                      {
                        id,
                        mid: cardRef.current!.getBoundingClientRect().y + cardRef.current!.getBoundingClientRect().height / 2,
                      },
                    ],
              };
            }
            return category;
          })
        );
      }
    }, [cardRef, setCoordinates, categoryId, id]);

    const startDrag = (e: React.MouseEvent) => {
      if (mode === "Default") {
        e.preventDefault();
        setMode("Drag");
      }

      setIsDragging(true);
      setDraggedCard({
        categoryId,
        id,
        title,
        content,
        nickname,
        rect: cardRef.current!.getBoundingClientRect(),
      });
      setDragOffset({
        x: e.clientX - cardRef.current!.getBoundingClientRect().left,
        y: e.clientY - cardRef.current!.getBoundingClientRect().top,
      });
      setCoordinates((c) =>
        c.map((category) => {
          if (category.id === categoryId) {
            return {
              ...category,
              cards: category.cards.filter((card) => card.id !== id),
            };
          }
          return category;
        })
      );
    };

    return (
      <article className={className} data-mode={mode} style={draggedCard?.id === id ? draggedCardStyle : {}} ref={cardRef} onMouseDown={startDrag}>
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
          <form>
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
