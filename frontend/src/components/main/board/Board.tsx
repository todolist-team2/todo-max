import { useEffect, useState } from "react";
import { styled } from "styled-components";
import TColumn from "../../../types/TColumn";
import TTheme from "../../../types/TTheme";
import fetchData from "../../../utils/fetch";
import Column from "./column/Column";

const Board = styled(({ className }: { className?: string }) => {
  const [columns, setColumns] = useState<TColumn[]>([]);

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

  return (
    <ul className={className}>
      {columns.map((column) => {
        return (
          <li key={column.categoryId}>
            <Column {...{ ...column, onCardChanged: updateColumns }} />
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
