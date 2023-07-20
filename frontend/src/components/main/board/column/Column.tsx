import { useContext, useEffect, useRef } from "react";
import { styled } from "styled-components";
import TCard from "../../../../types/TCard";
import TTheme from "../../../../types/TTheme";
import fetchData from "../../../../utils/fetch";
import { DragContext } from "../Board";
import ColumnTitle from "./ColumnTitle";
import Card from "./card/Card";
import CardForm from "./card/CardForm";
import CardShadow from "./card/CardShadow";

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
    const componentRef = useRef<HTMLElement>(null);
    const { draggingCardData, isDragging, draggingDestinationData, addColumnRect } = useContext(DragContext);

    useEffect(() => {
      if (componentRef.current) {
        addColumnRect(categoryId, componentRef.current.getBoundingClientRect());
      }
    }, []);

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

    console.log("draggingDestinationData", draggingDestinationData.index);

    return (
      <article className={className} ref={componentRef}>
        <ColumnTitle title={categoryName} count={cards.length} handlePlusButtonClick={() => toggleAddForm(categoryId)} />
        <ul className="card-list">
          {isActiveAddForm && (
            <li>
              <CardForm mode="add" handleCancelButtonClick={closeCardForm} handleSubmitButtonClick={addCard} />
            </li>
          )}
          {cards.map((card, index, cards) => (
            <>
              {isDragging &&
                draggingCardData &&
                draggingDestinationData.categoryId === categoryId &&
                draggingDestinationData.index === index &&
                draggingDestinationData.isBefore && (
                  <li>
                    <CardShadow {...draggingCardData} />
                  </li>
                )}
              <li key={card.id}>
                {isActiveEditForm(card.id) ? (
                  <CardForm mode="edit" originalContent={card} handleCancelButtonClick={closeCardForm} handleSubmitButtonClick={editCard} />
                ) : (
                  <Card {...card} onDelete={() => deleteCard(card.id)} onEdit={() => openEditForm(card.id, categoryId)} />
                )}
              </li>
              {isDragging &&
                draggingCardData &&
                draggingDestinationData.categoryId === categoryId &&
                draggingDestinationData.index === index &&
                cards.length - 1 === index &&
                !draggingDestinationData.isBefore && (
                  <li>
                    <CardShadow {...draggingCardData} />
                  </li>
                )}
            </>
          ))}
          {isDragging && draggingCardData && draggingDestinationData.categoryId === categoryId && draggingDestinationData.index === -1 && (
            <li>
              <CardShadow {...draggingCardData} />
            </li>
          )}
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
