import styled from "styled-components";
import { forwardRef } from "react";

const Wrapper = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.p`
  margin: 0 0 0.8rem 0;
  font-weight: 500;
  color: #333;
  font-size: 0.95rem;
`;

const HiddenInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

const FakeButton = styled.label`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #000;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s ease;

  &:hover {
    background: #333;
  }
`;


const FileUpload = forwardRef(({ label, onChange, fileName }, ref) => {
  const handleFileChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <div>
        <FakeButton>
          Вибрати файли
          <HiddenInput 
            ref={ref}
            onChange={handleFileChange} 
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" 
            multiple 
          />
        </FakeButton>
      </div>
    </Wrapper>
  );
});

export default FileUpload;