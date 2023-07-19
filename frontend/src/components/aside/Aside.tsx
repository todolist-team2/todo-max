import { useState } from "react";
import { styled } from "styled-components";
import ActionHistoryList from "./ActionHistoryList";

const Aside = styled(({ className, isHistoryOpen, toggleHistory }: { className?: string, isHistoryOpen: boolean, toggleHistory: () => void }) => {
  const [history, setHistory] = useState([
    {
      id: 1,
      userName: "UserName",
      body: "opopopo",
      timeStamp: "1시간",
    },
  ]);

  return (
    <aside className={`${className!} ${isHistoryOpen ? "active" : ""}`}>
      <h2 className="blind">별도</h2>
      <ActionHistoryList {...{ history, toggleHistory }} />
    </aside>
  );
})`
  flex-shrink: 0;
  width: 0;
  box-sizing: border-box;
  transition-property: width;
  transition-duration: 300ms;
  box-sizing: border-box;
  overflow: hidden;
  &.active {
    width: 390px;
    gap: 24px;
  }
`;

export default Aside;
