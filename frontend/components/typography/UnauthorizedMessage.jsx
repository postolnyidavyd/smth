import styled from "styled-components";

const UnauthorizedMessage = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  max-width: 600px;
  margin: 0 auto;

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  a {
    color: #000;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default UnauthorizedMessage;