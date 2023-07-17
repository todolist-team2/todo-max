import { useState } from "react";
import { styled } from "styled-components";
import TCard from "../../../../types/TCard";
import TTheme from "../../../../types/TTheme";
import ColumnTitle from "./ColumnTitle";
import Card from "./card/Card";
import CardForm from "./card/CardForm";

const Column = styled(
  ({
    className,
    categoryId,
    categoryName,
    cards,
    deleteCard,
  }: {
    className?: string;
    categoryId: number;
    categoryName: string;
    cards: TCard[];
    deleteCard: (card: TCard) => void;
  }) => {
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    const openAddForm = () => {
      setIsAddFormOpen((i) => !i);
    };

    const closeAddForm = () => {
      setIsAddFormOpen(false);
    };

    return (
      <article className={className}>
        <ColumnTitle title={categoryName} count={cards.length} />
        <ul className="card-list">
          {isAddFormOpen && (
            <li>
              <CardForm mode="add" handleCancelButtonClick={closeAddForm} handleSubmitButtonClick={() => console.log("d")} />
            </li>
          )}
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
