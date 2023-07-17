import { styled } from "styled-components";
import { useState } from "react";
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

  return (
    <StyledCard variant={variant}>
      <h4 className="blind">카드</h4>
      <div className="inner">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea name="content" id="" maxLength={500} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <div>
          <button onClick={handleCancelButtonClick}>취소</button>
          <button>{mode === "add" ? "등록" : "저장"}</button>
        </div>
      </div>
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
  align-items: flex-start;
  gap: 16px;
  opacity: ${(props) => (props.variant === "place" ? 0.3 : 1)};
  margin-bottom: 10px;

  .inner {
    flex-grow: 1;
  }

  textarea {
    resize: none;
  }

  ul {
    flex-shrink: 0;
    button {
      display: block;
      background-color: transparent;
      border: 0;
      padding: 0;
      cursor: pointer;
    }
  }
`;

export default CardForm;
