import { ReactNode } from "react";
import { styled } from "styled-components";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <MainStyledMain>
      <h2 className="blind">메인</h2>
      {children}
    </MainStyledMain>
  );
}

const MainStyledMain = styled.main`
  overflow: hidden;
`;
