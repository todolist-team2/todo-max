import { css, styled } from "styled-components";
import TTheme from "../../types/TTheme";
import ActionHistoryItem from "./ActionHistoryItem";
import Buttons from "../common/Buttons";

const ActionHistoryList = styled(
  ({
    className,
    history,
    toggleHistory,
  }: {
    className?: string;
    history: {
      id: number;
      userName: string;
      body: string;
      timeStamp: string;
    }[];
    toggleHistory: () => void;
  }) => {
    return (
      <article className={className}>
        <div className="container">
          <div className="title">
            <h3>사용자 활동 기록</h3>
            <Buttons
              $Flexible="Fixed"
              $Type="Ghost"
              $ElementPattern="Icon + Text"
              $States={"Enable"}
              icon="CloseSmall"
              text="닫기"
              onClick={() => toggleHistory()}
            />
          </div>
          <div className="list">
            {history.length ? (
              <ul>
                {history.map(({ id, userName, body, timeStamp }) => (
                  <li key={id}>
                    <ActionHistoryItem {...{ userName, body, timeStamp }} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>사용자 활동 기록이 없습니다.</p>
            )}
          </div>
        </div>
      </article>
    );
  }
)<{ theme: TTheme }>`
  padding: 8px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 8px;
  margin-left: 24px;
  ${({ theme }) => {
    const { font, color, border } = theme;
    return css`
      background-color: ${color.surface.default};
      border-radius: ${border.radius.round16};
      .title {
        min-width: 348px;
        padding: 8px;
        padding-left: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
        box-sizing: border-box;
        h3 {
          font: ${font.display.bold16};
        }
      }
      .list {
        box-sizing: border-box;
      }
    `;
  }}
`;

export default ActionHistoryList;
