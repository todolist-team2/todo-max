import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import HistoryButton from "./components/HistoryButton";
import Logo from "./components/Logo";
import Modal from "./components/Modal";
import Board from "./components/Board";
import UserActionLogList from "./components/UserActionLogList";
import CommonStyle from "./styles/CommonStyle";
import Header from "./components/landmark/Header";
import Main from "./components/landmark/Main";
import Aside from "./components/landmark/landmark";
import { theme } from "./theme";

export default function App() {
  const [isUserLogOpened, setIsUserLogOpened] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  function clearMessage() {
    setMessage("");
  }

  function dummyAction() {
    clearMessage();
  }

  function toggleActiveUserLog() {
    setIsUserLogOpened((bool) => !bool);
  }

  return (
    <AppStyledDiv>
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
    </AppStyledDiv>
  );
}

const AppStyledDiv = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

const Container = styled.div`
  display: flex;
`;

