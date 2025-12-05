import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { MenuContainer, BurgerButton, MenuButton } from "./styles/Menu.styled";

function Menu({ currentPage }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <BurgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</BurgerButton>

      {isMenuOpen && (
        <MenuContainer>
          {/*Рекомендую використати NavLinks компонент, він працює як Link і автоматично має логіку для показування активного статусу*/}
          <MenuButton
            onClick={() => navigate("/")}
            isActive={currentPage === "/"}
          >
            головна
          </MenuButton>
          <MenuButton
            onClick={() => navigate("/portfolio")}
            isActive={currentPage === "portfolio"}
          >
            портфоліо
          </MenuButton>
          <MenuButton
            onClick={() => navigate("/about")}
            isActive={currentPage === "about"}
          >
            про мене
          </MenuButton>
          <MenuButton
            onClick={() => navigate("/booking")}
            isActive={currentPage === "booking"}
          >
            запис
          </MenuButton>
          <MenuButton
            onClick={() => navigate("/userpage")}
            isActive={currentPage === "userpage"}
          >
            акаунт
          </MenuButton>
        </MenuContainer>
      )}
    </>
  );
}

export default Menu;
