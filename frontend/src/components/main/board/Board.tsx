import { styled } from "styled-components";
import Column from "./column/Column";
import { useState } from "react";
import TCard from "../../../types/TCard";
import TColumn from "../../../types/TColumn";
import { TTheme } from "../../../types/TTheme";

const Board = styled(({ className }: { className?: string }) => {
  const [columns, setColumns] = useState<TColumn[]>(dummy);

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

const dummy: TColumn[] = [
  {
    name: "해야할 일",
    cards: [
      {
        title: "Github 공부하기",
        text: "add, commit, push",
      },
    ],
  },
  {
    name: "하고 있는 일",
    cards: [
      {
        title: "Github 공부하기",
        text: "add, commit, push",
      },
    ],
  },
  {
    name: "완료한 일",
    cards: [
      {
        title: "Github 공부하기",
        text: "add, commit, push",
      },
    ],
  },
];

export default Board;
