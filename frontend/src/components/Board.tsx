import { styled } from "styled-components";
import { TTheme } from "../types/theme";
import CloseDanger from "/close-danger.svg";
import Close from "/close.svg";
import Edit from "/edit.svg";
import Plus from "/plus.svg";
import Card from "./Card";

type data = {
  title: string;
  text: string;
};

const dummy = [
  {
    name: "해야할 일",
    data: [
      {
        title: "Github 공부하기",
        text: "add, commit, push",
      },
    ],
  },
  {
    name: "하고 있는 일",
    data: [
      {
        title: "Github 공부하기",
        text: "add, commit, push",
      },
    ],
  },
  {
    name: "완료한 일",
    data: [
      {
        title: "Github 공부하기",
        text: "add, commit, push",
      },
    ],
  },
];

function Board({ handleDeleteButtonClick }: { handleDeleteButtonClick: (content: string, callback: () => void) => void }) {
  return (
    <BoardStyledUl>
      {dummy.map((item, index) => {
        const changeItem = (newData: data[]) => {
          console.log(item.data, newData);
          item.data = newData;
        };

        return (
          <li key={index}>
            <Column {...item} handleDeleteButtonClick={handleDeleteButtonClick} changeItem={changeItem} />
          </li>
        );
      })}
    </BoardStyledUl>
  );
}

const BoardStyledUl = styled.ul`
  display: flex;
  overflow: auto;
  box-sizing: border-box;
  gap: 24px;
  padding: 4px;
  &::-webkit-scrollbar {
    height: 0;
  }
`;

function Column({
  name,
  data,
  handleDeleteButtonClick,
  changeItem,
}: {
  name: string;
  data: data[];
  handleDeleteButtonClick: (content: string, callback: () => void) => void;
  changeItem: (newData: data[]) => void;
}) {
  return (
    <ColumnStyledArticle>
      <ColumnTitleStyledDiv>
        <h3 data-badge={data.length}>{name}</h3>
        <ColumnControl />
      </ColumnTitleStyledDiv>
      <ColumnStyledUl>
        {data.map((d, index, data) => {
          const deleteCurrCard = () => {
            const newData = data.filter((item) => item !== d);
            console.log(newData)
            changeItem(newData);
          };

          return (
            <li key={index}>
              <Card
              {...d} 
              handleDeleteButtonClick={() => handleDeleteButtonClick("선택한 카드를 삭제할까요?", deleteCurrCard)} />
            </li>
          );
        })}
      </ColumnStyledUl>
    </ColumnStyledArticle>
  );
}

const ColumnStyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function ColumnControl() {
  return (
    <ColumnControlStyledUl>
      {[
        { icon: Plus, alt: "추가" },
        { icon: Close, alt: "삭제" },
      ].map(ColumnControlBtn)}
    </ColumnControlStyledUl>
  );
}

function ColumnControlBtn({ icon, alt }: { icon: string; alt: string }, index: number) {
  return (
    <ColumnControlBtnStyledLi key={index}>
      <button>
        <img className={alt === "추가" ? "add" : "del"} src={icon} alt={alt} />
      </button>
    </ColumnControlBtnStyledLi>
  );
}

const ColumnControlBtnStyledLi = styled.li`
  & button {
    display: block;
    background-color: transparent;
    border: 0;
    padding: 0;
    & img {
      display: block;

      &.add {
        padding: 4px;
      }

      &.del {
        padding: 5px;
      }
    }
  }
`;

const ColumnControlStyledUl = styled.ul`
  display: inline-flex;
  gap: 8px;
`;

const ColumnStyledArticle = styled.li<{ theme: TTheme }>`
  min-width: 300px;
`;

const ColumnTitleStyledDiv = styled.div<{ theme: TTheme }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 16px;
  box-sizing: border-box;
  h3 {
    font: ${(props) => props.theme.font.display.bold16};
    display: flex;
    align-items: center;
    &::after {
      content: attr(data-badge);
      margin-left: 8px;
      height: 24px;
      min-width: 24px;
      padding: 4px;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      font: ${(props) => props.theme.font.display.medium12};
      color: ${(props) => props.theme.color.text.weak};
      border: 1px solid ${(props) => props.theme.color.border.default};
    }
  }
`;

export default Board;
