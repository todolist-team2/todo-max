import { css, styled } from "styled-components";
import TTheme from "../../types/TTheme";

const ActionHistoryItem = styled(
  ({
    className,
    userName,
    body,
    timeStamp,
  }: {
    className?: string;
    userName: string;
    body: string;
    timeStamp: string;
  }) => {
    return (
      <article className={className}>
        <h4 className="blind">사용자 활동 기록</h4>
        <figure className="image">
          <img
            src="https://innostudio.de/fileuploader/images/default-avatar.png"
            alt={userName}
          />
          <figcaption className="blind">사진</figcaption>
        </figure>
        <img src="" alt="" />
        <dl className="body">
          <dt className="blind">사용자 이름</dt>
          <dd className="user-name">{userName}</dd>

          <dt className="blind">내용</dt>
          <dd className="body">{body}</dd>

          <dt className="blind">시간 표기</dt>
          <dd className="time-stamp">
            <time>{timeStamp}</time> 전
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
      .body {
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

export default ActionHistoryItem;
