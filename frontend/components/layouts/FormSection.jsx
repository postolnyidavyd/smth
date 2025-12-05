import styled from "styled-components";

const FormSection = styled.section`
  padding: 4rem 2rem;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1rem;
    gap: 1.25rem;
  }
`;

export default FormSection;