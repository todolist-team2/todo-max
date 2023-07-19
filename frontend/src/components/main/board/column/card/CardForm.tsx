import { ChangeEvent, useRef, useState } from "react";
import { styled } from "styled-components";
import TTheme from "../../../../../types/TTheme";
import Buttons from "../../../../common/Buttons";

const LIMIT_TEXT_LENGTH = 500;

type HandleSubmitButtonClickType<T> = T extends "edit"
  ? ({ title, content }: { title: string; content: string }, cardId: number) => Promise<void>
  : ({ title, content }: { title: string; content: string }) => Promise<void>;

function CardForm<T extends "edit" | "add">({
  mode,
  variant = "default",
  originalContent = { id: 0, title: "", content: "" },
  handleCancelButtonClick,
  handleSubmitButtonClick,
}: {
  mode: T;
  variant?: "default" | "drag" | "place";
  originalContent?: { id: number; title: string; content: string };
  handleCancelButtonClick: () => void;
  handleSubmitButtonClick: HandleSubmitButtonClickType<T>;
}) {
  const [title, setTitle] = useState(originalContent.title);
  const [content, setContent] = useState(originalContent.content);
  const contentAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeContentArea = () => {
    if (contentAreaRef.current) {
      contentAreaRef.current.style.height = "auto";
      contentAreaRef.current.style.height = `${contentAreaRef.current.scrollHeight}px`;
    }
  };

  const changeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    resizeContentArea();
  };

  const isSubmitBtnClickable = title.length !== 0 && content.length !== 0;

  return (
    <StyledCard $variant={variant}>
      <h4 className="blind">카드</h4>
      <div className="inner">
        <input type="text" value={title} placeholder="제목을 입력하세요" onChange={(e) => setTitle(e.target.value)} />
        <textarea
          name="content"
          id=""
          rows={1}
          maxLength={500}
          value={content}
          placeholder="내용을 입력하세요"
          ref={contentAreaRef}
          onChange={changeContent}
        ></textarea>
        <p className="text-counter">
          {content.length} / {LIMIT_TEXT_LENGTH}
        </p>
      </div>
      <ul className="buttons">
        <li className="cancel">
          <Buttons $Flexible="" $Type="Contained" $ElementPattern="Text Only" $States="Enable" text="취소" onClick={handleCancelButtonClick} />
        </li>
        <li className="submit">
          <Buttons
            $Flexible=""
            $Type="Contained"
            $ElementPattern="Text Only"
            $States={isSubmitBtnClickable ?  "Enable" :"Disabled"}
            text={mode === "add" ? "등록" : "저장"}
            onClick={() => {
              handleSubmitButtonClick({ title, content }, originalContent.id);
            }}
            disabled={!isSubmitBtnClickable}
          />
        </li>
      </ul>
    </StyledCard>
  );
}

const StyledCard = styled.article<{ theme: TTheme; $variant: "default" | "drag" | "place" }>`
  width: 300px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.surface.default};
  box-shadow: ${(props) => (props.$variant === "drag" ? props.theme.boxShadow.floating : props.theme.boxShadow.normal)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  opacity: ${(props) => (props.$variant === "place" ? 0.3 : 1)};
  margin-bottom: 10px;

  .inner {
    width: 240px;
  }

  input {
    width: 100%;
    margin-bottom: 8px;
    border: none;
    font: ${(props) => props.theme.font.display.bold14};
    color: ${(props) => props.theme.color.text.strong};

    &:focus {
      outline: 2px solid ${(props) => props.theme.color.grayscale[300]};
    }
  }

  textarea {
    width: 100%;
    resize: none;
    border: none;
    font: ${(props) => props.theme.font.display.medium14};
    color: ${(props) => props.theme.color.text.default};

    &:focus {
      outline: 2px solid ${(props) => props.theme.color.grayscale[300]};
    }
  }

  .text-counter {
    font: ${(props) => props.theme.font.display.medium12};
    color: ${(props) => props.theme.color.text.weak};
    text-align: right;
  }

  .buttons {
    width: 100%;
    display: flex;
    gap: 8px;

    li {
      width: 100%;
    }

    button {
      width: 100%;
    }

    .cancel button {
      color: ${(props) => props.theme.color.text.default};
      background-color: ${props => props.theme.color.surface.alt};
    }

    .submit button {
      color: ${(props) => props.theme.color.text.white.default};
      background-color: ${props => props.theme.color.surface.brand};
    }
  }
`;

export default CardForm;
