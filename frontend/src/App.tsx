import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Logo from "./components/Logo";
import Modal from "./components/Modal";
import Board from "./components/Board";
import UserActionLogList from "./components/UserActionLogList";
import CommonStyle from "./styles/CommonStyle";
import Header from "./components/landmark/Header";
import Main from "./components/landmark/Main";
import Aside from "./components/landmark/landmark";
import { theme } from "./theme";
import HistoryBtn from "./components/HistoryBtn";
import { TTheme } from "./types/theme";

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
    <ThemeProvider theme={theme}>
      <AppStyledDiv>
        <CommonStyle />
        <Header>
          <Logo />
          <HistoryBtn {...{ toggleActiveUserLog }} />
        </Header>
        <Container>
          <Main>
            <Board />
          </Main>
          {/* <Aside>
            <UserActionLogList />
          </Aside> */}
        </Container>
        <Modal message={message} action={dummyAction} />
      </AppStyledDiv>{" "}
    </ThemeProvider>
  );
}

const AppStyledDiv = styled.div<{ theme: TTheme }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.color.surface.alt};
`;

const Container = styled.div`
  display: flex;
  padding: calc(2.29rem - 4px) calc(5.8rem - 4px);
`;
