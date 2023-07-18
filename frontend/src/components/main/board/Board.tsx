import { styled } from "styled-components";
import Column from "./column/Column";
import { useState, useEffect } from "react";
import TCard from "../../../types/TCard";
import TColumn from "../../../types/TColumn";
import TTheme from "../../../types/TTheme";

const Board = styled(({ className }: { className?: string }) => {
  const [columns, setColumns] = useState<TColumn[]>([]);

  useEffect(() => {
    (async function fetchAllData() {
      const res = await fetch("/api/cards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      setColumns(result);
    })();
  }, []);

  function deleteCardFromColumn(columnIndex: number) {
    return (card: TCard) => {
      setColumns((columns) => {
        const newColumns = [...columns];
        const cards = newColumns[columnIndex].cards;
        newColumns[columnIndex].cards = cards.filter((_card) => _card !== card);
        return newColumns;
      });
    };
  }

  const fetchUpdatedColumn = async (categoryId: number) => {
    const updatedColumn = await fetchColumn(categoryId);

    setColumns((columns) => {
      return columns.map((column) => {
        return column.categoryId === categoryId? updatedColumn : column;
      });
    });
  };

  const fetchColumn = async (categoryId: number) => {
    const res = await fetch("/api/cards?" + new URLSearchParams({ categoryId: categoryId.toString() }).toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result: TColumn = await res.json();
    return result;
  };

  return (
    <ul className={className}>
      {columns.map((column, index) => {
        const deleteCard = deleteCardFromColumn(index);
        return (
          <li key={index}>
            <Column {...{ ...column, deleteCard }} />
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
