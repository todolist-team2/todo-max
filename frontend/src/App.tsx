import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Alert from "./components/Alert";
import Container from "./styles/Container";
import Aside from "./components/Aside";

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
