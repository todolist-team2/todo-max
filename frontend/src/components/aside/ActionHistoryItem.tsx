import { css, styled } from "styled-components";
import TTheme from "../../types/TTheme";

export type TAction = {
  nickname: string;
  imageUrl: string;
  actionName: string;
  cardName: string;
  originCategoryName: string;
  targetCategoryName?: string;
  createdAt: string;
};

const ActionHistoryItem = styled(
  ({
    className,
    nickname,
    imageUrl,
    actionName,
    cardName,
    originCategoryName,
    targetCategoryName,
    createdAt,
  }: {
    className?: string;
    nickname: string;
    imageUrl: string;
    actionName: string;
    cardName: string;
    originCategoryName?: string;
    targetCategoryName?: string;
    createdAt: string;
  }) => {
    const content = () => {
      switch (actionName) {
        case "등록":
          return (
            <>
              <strong>{cardName}</strong>을(를)&nbsp;
              <strong>{originCategoryName}</strong>에서&nbsp; 
              <strong>{actionName}</strong>하였습니다.
            </>
          );
        case "수정":
          return (
            <>
              <strong>{cardName}</strong>을(를)&nbsp;
              <strong>{actionName}</strong>하였습니다.
            </>
          );
        case "삭제":
          return (
            <>
              <strong>{cardName}</strong>을(를)&nbsp;
              <strong>{actionName}</strong>하였습니다.
            </>
          );
        case "이동":
          return (
            <>
              <strong>{cardName}</strong>을(를)&nbsp;
              <strong>{originCategoryName}</strong>에서&nbsp;
              <strong>{targetCategoryName}</strong>으로&nbsp;
              <strong>{actionName}</strong>하였습니다.
            </>
          );
      }
    };

    return (
      <article className={className}>
        <h4 className="blind">사용자 활동 기록</h4>
        <figure className="image">
          <img src={imageUrl} alt={nickname} />
          <figcaption className="blind">사진</figcaption>
        </figure>
        <img src="" alt="" />
        <dl className="body">
          <dt className="blind">사용자 이름</dt>
          <dd className="user-name">{nickname}</dd>

          <dt className="blind">내용</dt>
          <dd className="body">{content()}</dd>

          <dt className="blind">시간 표기</dt>
          <dd className="time-stamp">
            <time>{timeDiff(createdAt)}</time>
          </dd>
        </dl>
      </article>
    );
  }
)<{ theme: TTheme }>`
  min-width: 348px;
  display: flex;
  align-items: flex-start;
  padding: 16px;
  box-sizing: border-box;
  ${({ theme }) => {
    const { font, color, border } = theme;

    return css`
      background-color: ${color.surface.default};
      .image {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: ${border.radius.circle};
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      > .body {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-left: 16px;
        .user-name {
          font: ${font.display.medium14};
          color: ${color.text.default};
        }
        .body {
          font: ${font.display.medium14};
          color: ${color.text.default};

          strong {
            font: ${font.display.bold14};
            color: ${color.text.bold};
          }
        }
        .time-stamp {
          font: ${font.display.medium12};
          color: ${color.text.weak};
        }
      }
    `;
  }}
`;

function timeDiff(inputTime: string) {
  const now = new Date();
  const diff = now.getTime() - new Date(inputTime).getTime();
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) {
    return `${seconds}초 전`;
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}분 전`;
  } else {
    return `${Math.floor(seconds / 3600)}시간 전`;
  }
}

export default ActionHistoryItem;
