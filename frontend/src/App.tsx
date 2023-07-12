import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import HistoryButton from "./components/HistoryButton";
import Logo from "./components/Logo";
import Modal from "./components/Modal";
import Container from "./styles/Container";
import Board from "./components/Board";
import UserActionLogList from "./components/UserActionLogList";
import CommonStyle from "./styles/CommonStyle";
import Header from "./components/landmark/Header";
import Main from "./components/landmark/Main";
import Aside from "./components/landmark/landmark";

export default function App() {
  const [isUserLogOpened, setIsUserLogOpened] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const theme = {
    font: {
      bold: {
        L: "700 1.7143rem",
        M: "700 1.143rem",
        R: "700 1rem",
        S: "700 0.86rem"
      },
      medium: {
        M: "700 1.143rem/1.57rem",
        R: "700 1rem",
        S: "700 0.86rem"
      }
    }
  };

  function clearMessage() {
    setMessage("");
  }

  function dummyAction() {
    clearMessage();
  }

  function toggleActiveUserLog() {
    setIsUserLogOpened((bool) => !bool);
  }

  const Style = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  `;

  return (
    <Style>
      <CommonStyle />
      <ThemeProvider theme={theme}>
        <Header>
          <Logo />
          <HistoryButton {...{ toggleActiveUserLog }} />
        </Header>
        <Container>
          <Main>
            <Board />
          </Main>
          <Aside>
            <UserActionLogList />
          </Aside>
        </Container>
        <Modal message={message} action={dummyAction} />
      </ThemeProvider>
    </Style>
  );
}
