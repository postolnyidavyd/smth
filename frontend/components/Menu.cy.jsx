import React from "react";
import { MemoryRouter } from "react-router-dom";
import Menu from "./Menu";

describe("<Menu /> Component", () => {
  //Тест функціональності бургер-меню.
  it("Відображає бургер-кнопку та приховує навігацію при завантаженні", () => {
    cy.mount(
      <MemoryRouter>
        <Menu currentPage="/" />
      </MemoryRouter>
    );

    // Бургер-кнопка має бути видимою завжди
    cy.contains("☰").should("be.visible");

    // Пункти меню не повинні бути в DOM або мають бути невидимі
    cy.contains("портфоліо").should("not.exist");
  });

  it("Відкриває та закриває меню при кліку на бургер", () => {
    cy.mount(
      <MemoryRouter>
        <Menu currentPage="/" />
      </MemoryRouter>
    );

    // Відкриваємо меню
    cy.contains("☰").click();
    cy.contains("портфоліо").should("be.visible");

    // Закриваємо меню
    cy.contains("☰").click();
    cy.contains("портфоліо").should("not.exist");
  });


   //Тест візуального стану (Active State).
  it("Стилізує активний пункт меню (чорний колір, курсив)", () => {
    cy.mount(
      <MemoryRouter>
        <Menu currentPage="portfolio" />
      </MemoryRouter>
    );

    cy.contains("☰").click();

    // Очікуємо стилі для активного стану згідно з дизайном
    cy.contains("портфоліо")
      .should("have.css", "color", "rgb(0, 0, 0)") // #000
      .and("have.css", "font-style", "italic");
  });


   //Тест візуального стану (Inactive State).
  it("Стилізує неактивні пункти меню (напівпрозорість)", () => {
    cy.mount(
      <MemoryRouter>
        <Menu currentPage="about" />
      </MemoryRouter>
    );

    cy.contains("☰").click();

    // "Портфоліо" не активне, тому має бути прозорим
    cy.contains("портфоліо")
      .should("have.css", "color", "rgba(0, 0, 0, 0.5)")
      .and("have.css", "font-style", "normal");
  });

  it("Клікає на всі посилання для 100% покриття коду (Code Coverage)", () => {
    cy.mount(
      <MemoryRouter>
        <Menu currentPage="/" />
      </MemoryRouter>
    );

    // Відкриваємо меню
    cy.contains("☰").click();

    // Список всіх кнопок, на які треба натиснут
    const menuItems = [
      "головна",
      "портфоліо",
      "про мене",
      "запис",
      "акаунт"
    ];

    // 3. Проходимо циклом і клікаємо на кожну
    menuItems.forEach((item) => {
      cy.contains(item).click();
    });
  });
});