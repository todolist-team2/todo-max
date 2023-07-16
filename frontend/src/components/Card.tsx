import { styled } from "styled-components";
import CloseIcon from "../styles/CloseIcon";
import EditIcon from "../styles/EditIcon";
import { TTheme } from "../types/theme";

export default function Card({
  variant = "default",
  mode,
  title,
  text,
  handleDeleteButtonClick,
}: {
  variant?: "default" | "drag" | "place";
  mode?: "add" | "edit";
  title: string;
  text: string;
  handleDeleteButtonClick: () => void;
}) {
  return (
    <StyledCard variant={variant}>
      <h4 className="blind">카드</h4>
      <div className="inner">
        <h4>{title}</h4>
        <pre>{text}</pre>
        {mode ? (
          <div>
            <button>취소</button>
            <button>{mode === "add" ? "등록" : "저장"}</button>
          </div>
        ) : (
          <p>author by web</p>
        )}
      </div>
      {!mode && (
        <ul>
          <li>
            <button
              className="del"
              onClick={() => {
                handleDeleteButtonClick();
                console.log("삭제");
              }}
            >
              <CloseIcon />
            </button>
          </li>
          <li>
            <button
              className="edit"
              onClick={() => {
                console.log("수정");
              }}
            >
              <EditIcon />
            </button>
          </li>
        </ul>
      )}
    </StyledCard>
  );
}

const StyledCard = styled.article<{ theme: TTheme; variant: "default" | "drag" | "place" }>`
  width: 300px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.surface.default};
  box-shadow: ${(props) => (props.variant === "drag" ? props.theme.objectStyles.dropShadow.floating : props.theme.objectStyles.dropShadow.normal)};
  display: flex;
  align-items: flex-start;
  gap: 16px;
  opacity: ${(props) => (props.variant === "place" ? 0.3 : 1)};

  h4 {
    font: ${(props) => props.theme.font.display.bold14};
    color: ${(props) => props.theme.color.text.strong};
    margin-bottom: 8px;
  }

  pre {
    font: ${(props) => props.theme.font.display.medium14};
    color: ${(props) => props.theme.color.text.default};
    margin-bottom: 16px;
  }

  p {
    font: ${(props) => props.theme.font.display.medium12};
    color: ${(props) => props.theme.color.text.weak};
  }

  .inner {
    flex-grow: 1;
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
