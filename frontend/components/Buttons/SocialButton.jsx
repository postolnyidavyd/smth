import React from "react";
import styled from "styled-components";

const StyledSocialButton = styled.button`
  width: auto;
  padding: 0.8rem 1.3rem;
  background: transparent;
  border-radius: 6rem;
  border: 1px solid #000;
  font-size: 1rem;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.3s ease;
  margin: 0.6rem;

  &:hover {
    background-color: #f5f5f5;
    opacity: 1;
  }
`;

const SocialButton = ({ provider }) => {
  return (
    <StyledSocialButton>
      Продовжити з {provider}
    </StyledSocialButton>
  );
};

export default SocialButton;