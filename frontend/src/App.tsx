import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Aside from "./components/Aside";
import Header from "./components/Header";
import HistoryButton from "./components/HistoryButton";
import Logo from "./components/Logo";
import Main from "./components/Main";
import Modal from "./components/Modal";
import { Font } from "./styles/Font";

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

  const Style = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  `;
  return (
    <Style>
      <ResetStyle />
      <CommonStyle />
      <Header>
        <Logo />
        <HistoryButton {...{ toggleActiveUserLog }} />
      </Header>
      <Font $type="bold" $size="L">
        테스트용 스팬
      </Font>
      <Container>
        <Main />
        <Aside />
      </Container>
      <Modal message={message} action={dummyAction} />
    </Style>
  );
}

const Container = styled.div`
  display: flex;
`;

const ResetStyle = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

const CommonStyle = createGlobalStyle`
  .blind {
    width: 1px;
    height: 1px;
    margin: -1px;
    position: absolute;
    overflow: hidden;
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
  
  @font-face {
  font-family: "pretendard";
  font-weight: 900;
  src: url("fonts/Pretendard-Black.woff2") format("woff2");
  }

  @font-face {
    font-family: "pretendard";
    font-weight: 800;
    src: url("fonts/Pretendard-ExtraBold.woff2") format("woff2");
  }

  @font-face {
    font-family: "pretendard";
    font-weight: 700;
    src: url("fonts/Pretendard-Black.woff2") format("woff2");
  }

  @font-face {
    font-family: "pretendard";
    font-weight: 600;
    src: url("fonts/Pretendard-SemiBold.woff2") format("woff2");
  }

  @font-face {
    font-family: "pretendard";
    font-weight: 500;
    src: url("fonts/Pretendard-Medium.woff2") format("woff2");
  }

  @font-face {
    font-family: "pretendard";
    font-weight: 400;
    src: url("fonts/Pretendard-Regular.woff2") format("woff2");
  }

  @font-face {
    font-family: "pretendard";
    font-weight: 300;
    src: url("fonts/Pretendard-Thin.woff2") format("woff2");
  }

  @font-face {
    font-family: "pretendard";
    font-weight: 200;
    src: url("fonts/Pretendard-Light.woff2") format("woff2");
  }

  @font-face {
    font-family: "pretendard";
    font-weight: 100;
    src: url("fonts/Pretendard-ExtraLight.woff2") format("woff2");
  }
`;
