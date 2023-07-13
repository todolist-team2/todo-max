import { styled } from "styled-components";
import { TTheme } from "../types/theme";
import Plus from "/plus.svg";
import Close from "/close.svg";
import Edit from "/edit.svg";
import { useState } from "react";

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

function Board() {
  return <BoardStyledUl>{dummy.map(Column)}</BoardStyledUl>;
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

function Column({ name, data }: { name: string; data: data[] }, index: number) {
  return (
    <ColumnStyledLi key={index}>
      <ColumnTitleStyledDiv>
        <h3 data-badge={data.length}>{name}</h3>
        <ColumnControl />
      </ColumnTitleStyledDiv>
      <ColumnStyledUl>
        {data.map((data, index) => (
          <li key={index}>
            <Card {...data} />
          </li>
        ))}
      </ColumnStyledUl>
    </ColumnStyledLi>
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

function ColumnControlBtn(
  { icon, alt }: { icon: string; alt: string },
  index: number
) {
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

const ColumnStyledLi = styled.li<{ theme: TTheme }>`
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

function Card({ title, text }: { title: string; text: string }) {
  return (
    <CardStyledArticle>
      <h4 className="blind">카드</h4>
      <div className="inner">
        <h4>{title}</h4>
        <pre>{text}</pre>
        <p>author by web</p>
      </div>
      <ul>
        <li>
          <button>
            <img className="del" src={Close} alt="삭제" />
          </button>
        </li>
        <li>
          <button>
            <img className="edit" src={Edit} alt="수정" />
          </button>
        </li>
      </ul>
    </CardStyledArticle>
  );
}

const CardStyledArticle = styled.article<{ theme: TTheme }>`
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.surface.default};
  box-shadow: 0px 1px 4px rgba(110, 128, 145, 0.24);
  display: flex;
  align-items: flex-start;
  gap: 16px;

  h4 {
    font: ${(props) => props.theme.font.display.bold14};
    color: ${(props) => props.theme.color.text.strong};
    margin-bottom: 8px;
  }

  pre {
    font: ${(props) => props.theme.font.display.medium14};
    color: ${(props) => props.theme.color.text.default};
    margin-bottom: 16px;
  }

  p {
    font: ${(props) => props.theme.font.display.medium12};
    color: ${(props) => props.theme.color.text.weak};
  }

  .inner {
    flex-grow: 1;
  }

  ul {
    flex-shrink: 0;
    button {
      display: block;
      background-color: transparent;
      border: 0;
      padding: 0;
      img {
        &.del {
          padding: 5px;
        }
        &.edit {
          padding: 4px;
        }
      }
    }
  }
`;

const CardStyledLi = styled.li<{ theme: TTheme }>`
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.surface.default};
  box-shadow: 0px 1px 4px rgba(110, 128, 145, 0.24);
  display: flex;
  align-items: flex-start;
  gap: 16px;

  h4 {
    font: ${(props) => props.theme.font.display.bold14};
    color: ${(props) => props.theme.color.text.strong};
    margin-bottom: 8px;
  }

  pre {
    font: ${(props) => props.theme.font.display.medium14};
    color: ${(props) => props.theme.color.text.default};
    margin-bottom: 16px;
  }

  p {
    font: ${(props) => props.theme.font.display.medium12};
    color: ${(props) => props.theme.color.text.weak};
  }

  .inner {
    flex-grow: 1;
  }

  ul {
    flex-shrink: 0;
    button {
      display: block;
      background-color: transparent;
      border: 0;
      padding: 0;
      img {
        &.del {
          padding: 5px;
        }
        &.edit {
          padding: 4px;
        }
      }
    }
  }
`;

export default Board;
