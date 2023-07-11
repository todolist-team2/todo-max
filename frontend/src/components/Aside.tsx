export default function Aside() {
  return (
    <aside>
      <h2 className="blind">별도</h2>
      <UserActionLogList />
    </aside>
  );
}

const logDummy = [
  {
    url: "",
    id: "멋진삼",
    text: "어버버버",
  },
  {
    url: "",
    id: "멋진삼",
    text: "어버버버",
  },
];

function UserActionLogList() {
  return (
    <article>
      <h3>사용자 활동기록 목록</h3>
      <ul>
        {logDummy.map((log, index) => (
          <li key={index}>
            <UserActionLog {...log} />
          </li>
        ))}
      </ul>
    </article>
  );
}

function UserActionLog({ url, id, text }: { url: string; id: string; text: string }) {
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
