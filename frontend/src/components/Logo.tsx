import React from 'react';
import styled from "styled-components"; 

const Style = styled.span`
  font-size: 24px;
  text-decoration: none;
  color: black;
`

export default function Logo() {
  return <a href="/">
    <Style>TODO LIST</Style>
  </a>
}