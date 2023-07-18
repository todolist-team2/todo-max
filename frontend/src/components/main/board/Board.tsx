import { useEffect, useState } from "react";
import { styled } from "styled-components";
import TColumn from "../../../types/TColumn";
import TTheme from "../../../types/TTheme";
import fetchData from "../../../utils/fetch";
import Column from "./column/Column";

const Board = styled(({ className }: { className?: string }) => {
  const [columns, setColumns] = useState<TColumn[]>([]);
  const [activeCardFormIdentifier, setActiveCardFormIdentifier] = useState<{ cardId: number; categoryId: number }>({ cardId: 0, categoryId: 0 });

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

  return (
    <ul className={className}>
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
