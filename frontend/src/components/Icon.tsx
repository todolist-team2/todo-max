import React from "react";

export function IconRouter(name: string) {
  switch (name) {
    case "Plus":
      return <Plus />;
    case "Close":
      return <Close />;
    case "CloseSmall":
      return <CloseSmall />;
    case "History":
      return <History />;
    case "Edit":
      return <Edit />;
  }
}

export const Plus: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z"
        fill="#6E7191"
      />
    </svg>
  );
};

export const Close: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <title>닫기</title>
      <path
        d="M7.2 18L6 16.8L10.8 12L6 7.2L7.2 6L12 10.8L16.8 6L18 7.2L13.2 12L18 16.8L16.8 18L12 13.2L7.2 18Z"
        fill="#6E7191"
      />
    </svg>
  );
};

export const CloseSmall: React.FC = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <title>닫기</title>
      <path
        d="M4.8 12L4 11.2L7.2 8L4 4.8L4.8 4L8 7.2L11.2 4L12 4.8L8.8 8L12 11.2L11.2 12L8 8.8L4.8 12Z"
        fill="#6E7191"
      />
    </svg>
  );
};

export const History: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <title>기록</title>
      <path
        d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
        fill="#6E7191"
      />
      <path
        d="M12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
        fill="#6E7191"
      />
    </svg>
  );
};

export const Edit: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <title>수정</title>
      <path
        d="M5 16.0837V19H7.91627L16.5173 10.3989L13.6011 7.48268L5 16.0837ZM18.7726 8.1437C18.8447 8.07175 18.9019 7.98629 18.9409 7.89222C18.9799 7.79814 19 7.69729 19 7.59544C19 7.49359 18.9799 7.39274 18.9409 7.29866C18.9019 7.20458 18.8447 7.11912 18.7726 7.04718L16.9528 5.22743C16.8809 5.15533 16.7954 5.09814 16.7013 5.05911C16.6073 5.02009 16.5064 5 16.4046 5C16.3027 5 16.2019 5.02009 16.1078 5.05911C16.0137 5.09814 15.9282 5.15533 15.8563 5.22743L14.4332 6.65057L17.3494 9.56684L18.7726 8.1437Z"
        fill="#6E7191"
      />
    </svg>
  );
};
