import { styled } from "styled-components";
import TTheme from "../../../../types/TTheme";
import Buttons from "../../../common/Buttons";

const ColumnControl = styled(({ className }: { className?: string }) => {
  return (
    <ul className={className}>
      {["Plus", "Close"].map((IconName, index) => {
        return (
          <li key={index}>
            <Buttons
              $Flexible=""
              $Type="Ghost"
              $ElementPattern="Icon Only"
              $States="Enable"
              icon={IconName}
              onClick={() => console.log("컬럼버튼")}
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
