import { css, styled } from "styled-components";
import TTheme from "../../types/TTheme";
import ActionHistoryItem from "./ActionHistoryItem";
import Buttons from "../common/Buttons";
import { useEffect, useState } from "react";
import { useSetStateStore } from "../../hooks/useSetStateStore";
import updateActions from "../../utils/updateActions";
import deleteActions from "../../utils/deleteActions";

export type TAction = {
  nickname: string;
  imageUrl: string;
  actionName: string;
  cardName: string;
  originCategoryName?: string;
  targetCategoryName?: string;
  createdAt: string;
};

const ActionHistoryList = styled(
  ({
    className,
    toggleHistory,
  }: {
    className?: string;
    toggleHistory: () => void;
  }) => {
    const [actions, setActions] = useState<TAction[]>([]);

    useEffect(() => {
      useSetStateStore.register<TAction[]>("actions", actions, setActions);
      updateActions();
    }, []);

    return (
      <article className={className}>
        <div className="title">
          <h3>사용자 활동 기록</h3>
          <Buttons
            $Flexible="Fixed"
            $Type="Ghost"
            $ElementPattern="Icon + Text"
            $States="Enable"
            icon="CloseSmall"
            text="닫기"
            onClick={() => toggleHistory()}
          />
        </div>
        <div className="list">
          {actions.length ? (
            <>
              <ul>
                {actions.map((action) => (
                  <li key={action.createdAt}>
                    <ActionHistoryItem {...action} />
                  </li>
                ))}
              </ul>
              <div className="control">
                <Buttons
                  $Flexible=""
                  $Type="Ghost"
                  $ElementPattern="Text Only"
                  $States="Enable"
                  text="기록 전체 삭제"
                  type="button"
                  onClick={() => {
                    deleteActions();
                  }}
                />
              </div>
            </>
          ) : (
            <p className="no-activity-message">사용자 활동 기록이 없습니다.</p>
          )}
        </div>
      </article>
    );
  }
)<{ theme: TTheme }>`
  min-width: 348px;
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
        button {
          font: ${font.display.bold14};
          color: ${color.text.default};
        }
      }
      .list {
        box-sizing: border-box;
      }
      .control {
        text-align: right;
        button {
          color: ${color.text.danger};
          font: ${font.display.bold14};
        }
      }
      .no-activity-message {
        font: ${font.display.medium14};
        padding: 16px;
        text-align: center;
        color: ${color.text.default};
      }
    `;
  }}
`;

export default ActionHistoryList;
