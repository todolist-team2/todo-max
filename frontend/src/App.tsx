import { useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Board from "./components/Board";
import HistoryBtn from "./components/HistoryBtn";
import Logo from "./components/Logo";
import Modal from "./components/Modal";
import Header from "./components/landmark/Header";
import Main from "./components/landmark/Main";
import CommonStyle from "./styles/CommonStyle";
import { theme } from "./theme";
import { TTheme } from "./types/theme";

export default function App() {
  const [isUserLogOpened, setIsUserLogOpened] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const callbackTemp = useRef<() => void | undefined>();

  function clearMessage() {
    setMessage("");
  }

  function dummyAction() {
    clearMessage();
    if (callbackTemp.current) {
      callbackTemp.current();
    }
  }

  function openConfirmModal(content: string, callback: () => void) {
    setMessage(content);
    callbackTemp.current = callback;
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
            <Board handleDeleteButtonClick={openConfirmModal} />
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
