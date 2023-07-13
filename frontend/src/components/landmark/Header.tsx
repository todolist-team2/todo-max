import React from "react";
import styled from "styled-components"

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <Style>
      <h1 className="blind">헤더</h1>
      {children}
    </Style>
  );
}

const Style = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 5.8rem;
  margin: auto;
`