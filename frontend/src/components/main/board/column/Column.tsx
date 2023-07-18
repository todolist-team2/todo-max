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

    const addCard = async ({ title, content }: { title: string; content: string }) => {
      const res = await fetch("/api/cards?" + new URLSearchParams({ categoryId: categoryId.toString() }).toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const result = await res.json();
      closeAddForm();
      // TODO: 카드 목록 불러오기
    };
  
    const removeCard = async (cardId: number) => {
      const res = await fetch("/api/cards/" + cardId.toString(), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      // TODO: 카드 목록 불러오기
    };

    const editCard = async ({ title, content }: { title: string; content: string }, cardId: number) => {
      console.log(cardId);
      const res = await fetch("/api/cards/" + cardId.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const result = await res.json();
      // TODO: 수정 중인 카드 id 변경
      // TODO: 카드 목록 불러오기
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
