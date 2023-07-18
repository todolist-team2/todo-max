import { styled } from "styled-components";
import TCard from "../types/TCard";
import { TTheme } from "../types/TTheme";

import Card from "./Card";
import ColumnTitle from "./ColumnTitle";

const Column = styled(
  ({
    className,
    name,
    cards,
    deleteCard,
  }: {
    className?: string;
    name: string;
    cards: TCard[];
    deleteCard: (card: TCard) => void;
  }) => {
    return (
      <article className={className}>
        <ColumnTitle title={name} count={cards.length} />
        <ul className="card-list">
          {cards.map((card, index) => (
            <li key={index}>
              <Card {...card} onDelete={() => deleteCard(card)} />
            </li>
          ))}
        </ul>
      </article>
    );
  }
)<{ theme: TTheme }>`
  min-width: 300px;

  .card-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export default Column;
