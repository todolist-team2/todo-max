import { styled } from "styled-components";
import Board from "./board/Board";

const Main = styled(({ className }: { className?: string }) => {
  return (
    <main className={className}>
      <h2 className="blind">메인</h2>
      <Board />
    </main>
  );
})`
  overflow: hidden;
`;

export default Main;
