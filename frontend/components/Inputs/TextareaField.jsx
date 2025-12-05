import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.p`
  margin: 0 0 0.8rem 0;
  font-weight: 500;
  color: #333;
  font-size: 0.95rem;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-family: inherit;
  resize: vertical;
  min-height: 140px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

const TextareaField = ({ label, placeholder, ...props }) => (
  <Wrapper>
    <Label>{label}</Label>
    <StyledTextarea placeholder={placeholder} {...props} />
  </Wrapper>
);

export default TextareaField;