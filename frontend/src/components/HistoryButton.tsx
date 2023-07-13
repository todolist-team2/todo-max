import Log from "/log.svg";

export default function HistoryButton({ toggleActiveUserLog }: { toggleActiveUserLog: () => void }) {
  return (
    <button onClick={() => toggleActiveUserLog()}>
      <img src={Log} alt="로고" />
    </button>
  );
}
