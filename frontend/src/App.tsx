import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/main/Main";
import Alert from "./components/common/Alert";
import Container from "./styles/Container";
import Aside from "./components/aside/Aside";

const App: React.FC = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  function toggleHistory() {
    setIsHistoryOpen((bool) => !bool);
  }

  return (
    <>
      <Header />
      <Container>
        <Main />
        {/* <Aside /> */}
      </Container>
      <Alert />
    </>
  );
};

export default App;
