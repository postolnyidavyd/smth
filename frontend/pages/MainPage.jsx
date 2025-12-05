import { useNavigate } from "react-router-dom";

import { useFetchData } from "../hooks/useFetchData";

import TitleTexts from "../components/TitleTexts";
import FilmFrame from "../components/Images/FilmFrame";
import Heading from "../components/typography/Heading";
import OrderedList from "../components/typography/OrderedList";
import Paragraph from "../components/typography/Paragraph";
import { ButtonContainer } from "../components/layouts/MainPageButtonsContainer";
import MainPageButton from "../components/Buttons/MainPageButton";

function MainPage() {
  const navigate = useNavigate();

  const { data, loading, error } = useFetchData("images");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <TitleTexts text="Photo me" />

      <div>
        <Heading>Привіт!</Heading>
        <Paragraph>
          Я тут, щоб зробити для тебе знімки, які передадуть не лише твою
          неймовірну красу, а й твою особистість
        </Paragraph>
      </div>

      <FilmFrame
        src={`http://localhost:3000/${data.images.main[1]}`}
        alt="Волейбол"
      />

      <ButtonContainer>
        <MainPageButton text="запис" onClick={() => navigate("/booking")} />
        <MainPageButton
          text="портфоліо"
          onClick={() => navigate("/portfolio")}
        />
        <MainPageButton text="про мене" onClick={() => navigate("/about")} />
        <MainPageButton text="акаунт" onClick={() => navigate("/userpage")} />
      </ButtonContainer>

      <FilmFrame
        src={`http://localhost:3000/${data.images.main[0]}`}
        alt="Камера"
      />

      <div>
        <Heading>Трохи про процес</Heading>
        <Paragraph>Якщо у тебе зйомка зі мною, то будь готова:</Paragraph>

        <OrderedList>
          <li>
            Підготовка також важлива. Потрібно підготувати референси, образ та
            місце (це дуже весело і я із задоволенням з цим допоможу)
          </li>
          <li>
            Підчас фотосесії: не переживай якщо не знаєш як поводитись перед
            камерою. По-перше, завжди є референси, та і я поряд готова
            допомогти. По-друге, я ввімкну музику і будемо разом танцювати
            (отримаєш кадри у русі) або ж просто спокійні пісні, які допоможуть
            тобі розслабитись.
          </li>
          <li>
            Після фотосесії ти отримаєш 40 відретушованих кадрів. Терміни: до 2
            тижнів.
          </li>
          <li>
            Я за креатив! Просто опиши мені ідею і я зроблю усе щоб втілити її у
            реальність
          </li>
        </OrderedList>
      </div>
    </>
  );
}

export default MainPage;
