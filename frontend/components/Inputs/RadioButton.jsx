import React from "react";
import styled from "styled-components";

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;

  &::before {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid #000;
    border-radius: 50%;
    background: white;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  ${HiddenRadio}:checked + &::before {
    background: #000;
    box-shadow: inset 0 0 0 4px white;
  }

  ${HiddenRadio}:focus-visible + &::before {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`;

const RadioButton = ({ label, name, value, checked, onChange }) => {
  return (
    <StyledLabel>
      <HiddenRadio
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </StyledLabel>
  );
};

export default RadioButton;