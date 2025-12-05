import styled from "styled-components";

const Paragraph = styled.p`
  font-size: 2rem;
  font-weight: 300;
  color: #000;
  line-height: 1.5;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export default Paragraph;