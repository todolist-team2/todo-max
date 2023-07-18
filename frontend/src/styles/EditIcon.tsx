import { styled } from "styled-components";

export default function EditIcon() {
  return (
    <StyledIconWrapper>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 11.0837V14H2.91627L11.5173 5.39895L8.60106 2.48268L0 11.0837ZM13.7726 3.1437C13.8447 3.07175 13.9019 2.98629 13.9409 2.89222C13.9799 2.79814 14 2.69729 14 2.59544C14 2.49359 13.9799 2.39274 13.9409 2.29866C13.9019 2.20458 13.8447 2.11912 13.7726 2.04718L11.9528 0.227426C11.8809 0.155333 11.7954 0.0981367 11.7013 0.059112C11.6073 0.0200872 11.5064 0 11.4046 0C11.3027 0 11.2019 0.0200872 11.1078 0.059112C11.0137 0.0981367 10.9282 0.155333 10.8563 0.227426L9.43316 1.65057L12.3494 4.56684L13.7726 3.1437Z"
          fill="#A0A3BD"
        />
      </svg>
    </StyledIconWrapper>
  );
}

const StyledIconWrapper = styled.div`
  padding: 5px;
  svg {
    display: block;
  }
`;
