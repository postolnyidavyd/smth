import React from "react";
import styled from "styled-components";

const StyledEnterButton = styled.button`
  width: auto;
  padding: 1.4rem 2rem;
  background: rgb(63, 58, 58);
  color: white;
  border: none;
  border-radius: 0.8rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;


  &:active {
    transform: translateY(1px);
  }
`;

const EnterButton = ({ text }) => {
  return <StyledEnterButton>{text}</StyledEnterButton>;
};

export default EnterButton;