import { styled } from "styled-components";
import { UserActionLogList } from "./actionHistory/UserActionLogList";

const Aside = styled(({ className }: { className?: string }) => {
  return (
    <aside className={className}>
      <h2 className="blind">별도</h2>
      <UserActionLogList />
    </aside>
  );
})`
  overflow: hidden;
`;

export default Aside;
