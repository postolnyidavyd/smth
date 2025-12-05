import styled from "styled-components";
import { Link } from "react-router-dom";

const SwitchText = styled.p`
  margin-top: 3rem;
  color: #555;
  font-size: 0.95rem;

  strong {
    color: #000;
    text-decoration: underline;
    cursor: pointer;
    font-weight: 600;
  }
`;

const AuthSwitchLink = ({ question, actionText, to }) => (
  <SwitchText>
    {question}{" "}
    <Link to={to}>
      <strong>{actionText}</strong>
    </Link>
  </SwitchText>
);

export default AuthSwitchLink;