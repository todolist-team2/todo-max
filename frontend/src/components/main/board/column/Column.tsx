import { useState } from "react";
import { styled } from "styled-components";
import TCard from "../../../../types/TCard";
import TTheme from "../../../../types/TTheme";
import fetchData from "../../../../utils/fetch";
import ColumnTitle from "./ColumnTitle";
import Card from "./card/Card";
import CardForm from "./card/CardForm";

const Column = styled(
  ({
    className,
    categoryId,
    categoryName,
    cards,
    onCardChanged,
  }: {
    className?: string;
    categoryId: number;
    categoryName: string;
    cards: TCard[];
    onCardChanged: () => Promise<void>;
  }) => {
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [cardIdUnderEdit, setCardIdUnderEdit] = useState(0);

    const toggleAddForm = () => {
      setIsAddFormOpen((i) => !i);
    };

    const closeAddForm = () => {
      setIsAddFormOpen(false);
    };

    const addCard = async ({ title, content }: { title: string; content: string }) => {
      await fetchData(
        `/api/cards?categoryId=${categoryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        },
        () => {
          closeAddForm();
          onCardChanged();
        }
      );
    };

    const deleteCard = async (cardId: number) => {
      await fetchData(
        `/api/cards/${cardId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
        () => {
          onCardChanged();
        }
      );
    };

    const editCard = async ({ title, content }: { title: string; content: string }, cardId: number) => {
      await fetchData(
        `/api/cards/${cardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        },
        () => {
          onCardChanged();
        }
      );
    };

    return (
      <article className={className}>
        <ColumnTitle title={categoryName} count={cards.length} handlePlusButtonClick={toggleAddForm} />
        <ul className="card-list">
          {isAddFormOpen && (
            <li>
              <CardForm mode="add" handleCancelButtonClick={closeAddForm} handleSubmitButtonClick={addCard} />
            </li>
          )}
          {cards.map((card) => (
            <li key={card.id}>
              {cardIdUnderEdit === card.id ? (
                <CardForm mode="edit" originalContent={card} handleCancelButtonClick={closeAddForm} handleSubmitButtonClick={editCard} />
              ) : (
                <Card {...card} onDelete={() => deleteCard(card.id)} />
              )}
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
