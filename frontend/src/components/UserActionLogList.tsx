import { UserActionLog } from "./UserActionLog";

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

export default UserActionLogList;