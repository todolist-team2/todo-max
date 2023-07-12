export function UserActionLog({
  url,
  id,
  text,
}: {
  url: string;
  id: string;
  text: string;
}) {
  return (
    <article>
      <h4 className="blind">사용자 활동기록</h4>
      <figure>
        <img src={url} alt="" />
        <figcaption className="blind">아바타</figcaption>
      </figure>
      <dl>
        <dt className="blind">사용자 이름</dt>
        <dd>{`@${id}`}</dd>

        <dt className="blind">정보</dt>
        <dd>{text}</dd>

        <dt className="blind">시간</dt>
        <dd>
          <time>1 시간</time> 전
        </dd>
      </dl>
    </article>
  );
}
