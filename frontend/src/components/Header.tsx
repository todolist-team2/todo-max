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
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  padding: 1.2rem 5.8rem;
`