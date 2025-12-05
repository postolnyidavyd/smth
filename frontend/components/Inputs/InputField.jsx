import React from "react";
import styled from "styled-components";

const FieldWrapper = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 500;
  color: #333;
  font-size: 0.95rem;
`;

const UnderlineInput = styled.input`
  width: 100%;
  padding: 8px 0;
  border: none;
  border-bottom: 2px solid #ccc;
  background: transparent;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  font-family: inherit;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-bottom-color: #000;
  }
`;

const InputField = ({ label, placeholder, ...props }) => {
  return (
    <FieldWrapper>
      {label && <Label>{label}</Label>}
      <UnderlineInput placeholder={placeholder || label} {...props} />
    </FieldWrapper>
  );
};

export default InputField;