/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import TCard from "../../../types/TCard";
import TColumn from "../../../types/TColumn";
import TTheme from "../../../types/TTheme";
import fetchData from "../../../utils/fetch";
import Column from "./column/Column";

export const DragContext = createContext({
  draggingCardData: {} as TCard | undefined,
  handleDraggingCardDataUpdate: (cardData: TCard) => {},
  draggingCardPosition: undefined as { x: number; y: number } | undefined,
  handleDraggingCardPositionUpdate: (position: { x: number; y: number }) => {},
  isDragging: false,
  startDragging: () => {},
  allCardRects: [] as { id: number; rect: DOMRect }[],
  addCardRect: (id: number, rect: DOMRect) => {},
  draggingDestinationData: { categoryId: 0, index: -1, isBefore: false } as { categoryId: number; index: number; isBefore: boolean },
  addColumnRect: (id: number, rect: DOMRect) => {},
});

const Board = styled(({ className }: { className?: string }) => {
  const [columns, setColumns] = useState<TColumn[]>([]);
  const [activeCardFormIdentifier, setActiveCardFormIdentifier] = useState<{ cardId: number; categoryId: number }>({ cardId: 0, categoryId: 0 });
  const [draggingCardData, setDraggingCardData] = useState<TCard | undefined>();
  const [draggingCardPosition, setDraggingCardPosition] = useState<{ x: number; y: number } | undefined>();
  const [draggingDestinationData, setDraggingDestinationData] = useState<{ categoryId: number; index: number; isBefore: boolean }>({
    categoryId: 0,
    index: -1,
    isBefore: false,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [allCardRects, setAllCardRects] = useState<{ id: number; rect: DOMRect }[]>([]);
  const [allColumnRects, setAllColumnRects] = useState<{ id: number; rect: DOMRect }[]>([]);

  useEffect(() => {
    updateColumns();
  }, []);

  const updateColumns = async () => {
    await fetchData<TColumn[]>(
      "/api/cards",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      setColumns
    );
  };

  const toggleAddForm = (categoryId: number) => {
    setActiveCardFormIdentifier((c) => {
      return c.categoryId === categoryId ? { cardId: 0, categoryId: 0 } : { cardId: 0, categoryId: categoryId };
    });
  };

  const openEditForm = (cardId: number, categoryId: number) => {
    setActiveCardFormIdentifier({ cardId, categoryId });
  };

  const closeCardForm = () => {
    setActiveCardFormIdentifier({ cardId: 0, categoryId: 0 });
  };

  const handleDraggingCardDataUpdate = (cardData: TCard) => {
    setDraggingCardData(cardData);
  };

  const handleDraggingCardPositionUpdate = (position: { x: number; y: number }) => {
    for (const cardRect of allCardRects) {
      if (
        cardRect.rect.left < position.x &&
        cardRect.rect.right > position.x &&
        cardRect.rect.top < position.y &&
        cardRect.rect.bottom > position.y
      ) {
        const middleOfHeight = cardRect.rect.top + cardRect.rect.height / 2;
        const isBefore = position.y <= middleOfHeight;
        const column = columns.find((column) => column.cards.some((card) => card.id === cardRect.id));
        const index = column?.cards.findIndex((card) => card.id === cardRect.id) ?? 0;

        setDraggingDestinationData({ categoryId: column?.categoryId ?? 0, index, isBefore });
        return;
      }
    }

    for (const columnRect of allColumnRects) {
      if (
        columnRect.rect.left < position.x &&
        columnRect.rect.right > position.x &&
        columnRect.rect.top < position.y &&
        columnRect.rect.bottom > position.y
      ) {
        setDraggingDestinationData({ categoryId: columnRect.id, index: -1, isBefore: false });
        return;
      }
    }
  };

  const startDragging = () => {
    setIsDragging(true);
  };

  const addCardRect = (id: number, rect: DOMRect) => {
    setAllCardRects((c) => {
      const index = c.findIndex((cardRect) => cardRect.id === id);
      if (index === -1) {
        return [...c, { id, rect }];
      }
      return c;
    });
  };

  const addColumnRect = (id: number, rect: DOMRect) => {
    setAllColumnRects((c) => {
      const index = c.findIndex((columnRect) => columnRect.id === id);
      if (index === -1) {
        return [...c, { id, rect }];
      }
      return c;
    });
  };

  return (
    <DragContext.Provider
      value={{
        draggingCardData,
        handleDraggingCardDataUpdate,
        draggingCardPosition,
        handleDraggingCardPositionUpdate,
        isDragging,
        startDragging,
        allCardRects,
        addCardRect,
        draggingDestinationData,
        addColumnRect,
      }}
    >
      <ul className={className}>
        {columns.map((column) => {
          return (
            <li key={column.categoryId}>
              <Column {...{ ...column, onCardChanged: updateColumns, activeCardFormIdentifier, toggleAddForm, openEditForm, closeCardForm }} />
            </li>
          );
        })}
      </ul>
    </DragContext.Provider>
  );
})<{ theme: TTheme }>`
  display: flex;
  overflow: auto;
  box-sizing: border-box;
  gap: 24px;
  padding: 4px;
  &::-webkit-scrollbar {
    height: 0;
  }
`;

export default Board;
