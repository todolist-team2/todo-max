import { useState } from "react";
import { styled } from "styled-components";
import TTheme from "../../../../../types/TTheme";

function CardForm({
  variant = "default",
  mode,
  handleCancelButtonClick,
  handleSubmitButtonClick,
}: {
  variant?: "default" | "drag" | "place";
  mode: "add" | "edit";
  handleCancelButtonClick: () => void;
  handleSubmitButtonClick: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isSubmitBtnClickable = title.length !== 0 && content.length !== 0;

  return (
    <StyledCard variant={variant}>
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
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <ul className="buttons">
        <li>
          <button onClick={handleCancelButtonClick}>취소</button>
        </li>
        <li>
          <button disabled={!isSubmitBtnClickable}>{mode === "add" ? "등록" : "저장"}</button>
        </li>
      </ul>
    </StyledCard>
  );
}

const StyledCard = styled.article<{ theme: TTheme; variant: "default" | "drag" | "place" }>`
  width: 300px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.surface.default};
  box-shadow: ${(props) => (props.variant === "drag" ? props.theme.boxShadow.floating : props.theme.boxShadow.normal)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  opacity: ${(props) => (props.variant === "place" ? 0.3 : 1)};
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

  .buttons {
    width: 100%;
    display: flex;
    gap: 8px;
  }
`;

export default CardForm;
