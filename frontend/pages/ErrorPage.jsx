import { useNavigate } from "react-router-dom";
import styled from "styled-components";


import Heading from "../components/typography/Heading";
import Paragraph from "../components/typography/Paragraph";
import MainPageButton from "../components/Buttons/MainPageButton"

const Big404 = styled.h1`
  font-size: 8rem;
  font-weight: 800;
  margin: 0;
  line-height: 1;
  background: linear-gradient(120deg, #000 0%, #444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Message = styled(Heading)`
  font-size: 1.2rem;
  margin: 0;
`;

function ErrorPage() {
    const navigate = useNavigate();
    const goHome = () => navigate("/");
  return (
    <>

      <Big404>404</Big404>

      <Message>Ой, такої сторінки немає</Message>

      <MainPageButton onClick={goHome} text="на головну"/>
    </>
  );
}

export default ErrorPage;
