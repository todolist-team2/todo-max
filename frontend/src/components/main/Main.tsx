import { styled } from "styled-components";
import Board from "./board/Board";
import DragProvider from "../../contexts/DragContext";

const Main = styled(({ className }: { className?: string }) => {
  return (
    <DragProvider>
      <main className={className}>
        <h2 className="blind">메인</h2>
        <Board />
      </main>
    </DragProvider>
  );
})`
  overflow: hidden;
`;

export default Main;
