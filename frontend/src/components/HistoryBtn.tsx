import { styled } from "styled-components";
import Log from "/log.svg";

export default function HistoryBtn({ toggleActiveUserLog }: { toggleActiveUserLog: () => void }) {
  return (
    <HistoryBtnStyledButton onClick={() => toggleActiveUserLog()}>
      <img src={Log} alt="기록" />
    </HistoryBtnStyledButton>
  );
}

const HistoryBtnStyledButton = styled.button`
  background-color: transparent;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  & img {
    padding: 4px;
  }
`