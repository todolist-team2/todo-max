import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useDragContext } from "../../../../contexts/DragContext";
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
    activeCardFormIdentifier,
    toggleAddForm,
    openEditForm,
    closeCardForm,
    onCardChanged,
  }: {
    className?: string;
    categoryId: number;
    categoryName: string;
    cards: TCard[];
    activeCardFormIdentifier: { cardId: number; categoryId: number };
    toggleAddForm: (categoryId: number) => void;
    openEditForm: (cardId: number, categoryId: number) => void;
    closeCardForm: () => void;
    onCardChanged: () => Promise<void>;
  }) => {
    const columnRef = useRef<HTMLElement>(null);
    const { isDragging, coordinates } = useDragContext();

    useEffect(() => {
      if (columnRef.current) {
        coordinates.current.push({
          id: categoryId,
          xMid: columnRef.current.getBoundingClientRect().x + columnRef.current.getBoundingClientRect().width / 2,
          top: columnRef.current.getBoundingClientRect().top,
          bottom: columnRef.current.getBoundingClientRect().bottom,
          cards: [] as { id: number; mid: number }[],
        });
      }
    }, [columnRef, categoryId, coordinates]);

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
          closeCardForm();
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
          closeCardForm();
          onCardChanged();
        }
      );
    };

    const isActiveAddForm = activeCardFormIdentifier.cardId === 0 && activeCardFormIdentifier.categoryId === categoryId;

    const isActiveEditForm = (cardId: number) => {
      return cardId === activeCardFormIdentifier.cardId && categoryId === activeCardFormIdentifier.categoryId;
    };

    return (
      <article className={className} ref={columnRef}>
        <ColumnTitle title={categoryName} count={cards.length} handlePlusButtonClick={() => toggleAddForm(categoryId)} />
        <ul className="card-list">
          {isActiveAddForm && (
            <li>
              <CardForm mode="add" handleCancelButtonClick={closeCardForm} handleSubmitButtonClick={addCard} />
            </li>
          )}
          {cards.map((card) => (
            <li key={card.id}>
              {isActiveEditForm(card.id) ? (
                <CardForm mode="edit" originalContent={card} handleCancelButtonClick={closeCardForm} handleSubmitButtonClick={editCard} />
              ) : (
                <Card {...card} categoryId={categoryId} onDelete={() => deleteCard(card.id)} onEdit={() => openEditForm(card.id, categoryId)} />
              )}
            </li>
          ))}
        </ul>
      </article>
    );
  }
)<{ theme: TTheme }>`
  min-width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .card-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export default Column;
