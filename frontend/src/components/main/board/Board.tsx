/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useDragContext } from "../../../contexts/DragContext";
import TColumn from "../../../types/TColumn";
import TTheme from "../../../types/TTheme";
import fetchData from "../../../utils/fetch";
import Column from "./column/Column";

const Board = styled(({ className }: { className?: string }) => {
  const [columns, setColumns] = useState<TColumn[]>([]);
  const [activeCardFormIdentifier, setActiveCardFormIdentifier] = useState<{ cardId: number; categoryId: number }>({ cardId: 0, categoryId: 0 });
  const {
    coordinates,
    isDragging,
    draggedCard,
    dragPosition,
    setCoordinates,
    setIsDragging,
    setDraggedCard,
    setDragPosition,
    setDragOffset,
    getCardCenter,
  } = useDragContext();

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

  const onCardDrag = (e: React.MouseEvent) => {
    if (!isDragging) {
      return;
    }

    // 카드의 중앙 좌표를 구한다.
    const cardCenter = getCardCenter(e.clientX, e.clientY);

    // 모든 카테고리의 범위 배열을 구한다.
    const columnEdges = [
      coordinates[0].left,
      ...coordinates.map((category) => category.left + (category.right - category.left) / 2),
      coordinates[coordinates.length - 1].right,
    ];

    // 카드의 중앙 좌표가 어느 카테고리에 속하는지 구한다.
    const columnRanges = columnEdges.map((edge, index) => {
      return {
        left: edge,
        right: columnEdges[index + 1] + (columnEdges[index + 2] - columnEdges[index + 1]) / 2,
      };
    });

    const dragOverCategoryIndex = columnRanges.findIndex((range) => range.left <= cardCenter.x && cardCenter.x < range.right)!;

    // 속한 카테고리의 카드들의 범위 배열을 구한다.

    if (dragOverCategoryIndex === -1) {
      return;
    }

    const cardEdges = [
      coordinates[dragOverCategoryIndex].top,
      ...coordinates[dragOverCategoryIndex].cards.map((card) => card.mid),
      coordinates[dragOverCategoryIndex].bottom,
    ];

    const cardRanges = [] as { top: number; bottom: number }[];

    for (const [index, edge] of cardEdges.entries()) {
      if (index === cardEdges.length - 1) {
        break;
      }
      cardRanges.push({ top: edge, bottom: cardEdges[index + 1] });
    }

    // 범위 배열에서 카드의 중앙 좌표 값이 속하는 인덱스를 구한다.

    const dragOverCardIndex =
      cardCenter.y < cardRanges[0].top
        ? 0
        : cardCenter.y >= cardRanges[cardRanges.length - 1].bottom
        ? cardRanges.length - 1
        : cardRanges.findIndex((range) => range.top <= cardCenter.y && cardCenter.y < range.bottom);

    setDragPosition({
      x: e.clientX,
      y: e.clientY,
      categoryId: coordinates[dragOverCategoryIndex].id,
      index: dragOverCardIndex,
    });
  };

  const onCardDragEnd = () => {
    if (isDragging && draggedCard && dragPosition) {
      const cardMoveData = calculateCardMoveData(dragPosition.categoryId, dragPosition.index, draggedCard.id);
      requestCardMove(cardMoveData, initializeDragStates);
    }
  };

  const calculateCardMoveData = (categoryId: number, finalIndex: number, initialId: number) => {
    const initialCategory = columns.find((category) => category.categoryId === draggedCard!.categoryId)!;
    const finalCategory = columns.find((category) => category.categoryId === dragPosition!.categoryId)!;

    const initialIndex = initialCategory.cards.findIndex((card) => card.id === initialId);

    const fromPrevCardId = initialIndex !== 0 ? initialCategory.cards[initialIndex - 1].id : 0;
    const toPrevCardId = finalIndex !== 0 ? finalCategory.cards[finalIndex - 1].id : 0;

    return {
      fromPrevCardId,
      toPrevCardId,
      toCategoryId: categoryId,
    };
  };

  const requestCardMove = async (cardMoveData: { fromPrevCardId: number; toPrevCardId: number; toCategoryId: number }, onRequestSent: () => void) => {
    await fetchData(
      `/api/cards/${draggedCard!.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardMoveData),
      },
      onRequestSent
    );
  };

  const initializeDragStates = () => {
    setCoordinates((c) => {
      return c.map((category) => {
        if (category.id === draggedCard!.categoryId) {
          const originalIndex = columns.find((column) => column.categoryId === category.id)!.cards.findIndex((card) => card.id === draggedCard!.id);

          return {
            ...category,
            cards: [...category.cards.slice(0, originalIndex), { id: draggedCard!.id, mid: dragPosition!.y }, ...category.cards.slice(originalIndex)],
          };
        }
        return category;
      });
    });
    setDraggedCard(null);
    setDragPosition(null);
    setDragOffset(null);
    setIsDragging(false);
    updateColumns();
  };

  return (
    <ul className={className} onMouseMove={onCardDrag} onMouseUp={onCardDragEnd}>
      {columns.map((column) => {
        return (
          <li key={column.categoryId}>
            <Column {...{ ...column, onCardChanged: updateColumns, activeCardFormIdentifier, toggleAddForm, openEditForm, closeCardForm }} />
          </li>
        );
      })}
    </ul>
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
