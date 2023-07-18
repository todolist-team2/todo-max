import { styled } from "styled-components";
import TTheme from "../../../../types/TTheme";
import Buttons from "../../../common/Buttons";

const ColumnControl = styled(({ className, handlePlusButtonClick }: { className?: string; handlePlusButtonClick: () => void }) => {
  return (
    <ul className={className}>
      {[
        { name: "Plus", handleClickAction: handlePlusButtonClick },
        { name: "Close", handleClickAction: () => console.log("칼럼 삭제") },
      ].map(({ name, handleClickAction }, index) => {
        return (
          <li key={index}>
            <Buttons  
              $Flexible=""
              $Type="Ghost"
              $ElementPattern="Icon Only"
              $States="Enable"
              icon={name}
              onClick={handleClickAction}
            />
          </li>
        );
      })}
    </ul>
  );
})<{ theme: TTheme }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  button {
    background-color: transparent;
    display: block;
    border: 0;
    margin: 0;
    padding: 0;
  }
`;

export default ColumnControl;
