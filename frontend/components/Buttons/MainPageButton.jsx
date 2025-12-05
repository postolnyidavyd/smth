import React from "react";
import styled from "styled-components";

const MainButton = styled.button`
  display: flex;
  height: 4rem;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  width: 15rem;
  background: transparent;
  border-radius: 10px;
  border: 0.5px solid #000;
  font-size: 1.1rem;
  font-weight: 200;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }
`;

const ButtonMain = ({ text, onClick }) => {
  return <MainButton onClick={onClick}>{text}</MainButton>;
};

export default ButtonMain;