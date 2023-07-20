import { styled } from "styled-components";
import ActionHistoryList from "./ActionHistoryList";
import TTheme from "../../types/TTheme";

const Aside = styled(
  ({
    className,
    isHistoryOpen,
    toggleHistory,
  }: {
    className?: string;
    isHistoryOpen: boolean;
    toggleHistory: () => void;
  }) => {
    return (
      <aside className={`${className!} ${isHistoryOpen ? "active" : ""}`}>
        <h2 className="blind">별도</h2>
        <ActionHistoryList {...{ toggleHistory }} />
      </aside>
    );
  }
)<{ theme: TTheme }>`
  flex-shrink: 0;
  width: 0;
  box-sizing: border-box;
  transition-property: width;
  transition-duration: 300ms;
  box-sizing: border-box;
  overflow: hidden;
  &.active {
    width: 372px;
    gap: 24px;
  }
`;

export default Aside;
