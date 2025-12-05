import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";

describe("<ErrorPage/>", () => {
  // Перевірка відображення контенту (404, текст, кнопка)
  it("Має відображати код помилки, повідомлення та кнопку повернення", () => {
    // MemoryRouter потрібен, бо компонент використовує useNavigate
    cy.mount(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    // Перевіряємо заголовок 404
    cy.contains("404").should("be.visible");

    // Перевіряємо текст повідомлення
    cy.contains("Ой, такої сторінки немає").should("be.visible");

    // Перевіряємо наявність кнопки
    cy.contains("button", "на головну").should("be.visible");
  });

  // Перевірка функціоналу навігації
  it("Має перенаправляти на головну сторінку при кліку на кнопку", () => {
    // Налаштовуємо роутер з двома маршрутами:
    // 1. /error - де ми зараз (ErrorPage)
    // 2. / - куди ми хочемо потрапити (тестовий заголовок Home Page)
    cy.mount(
      <MemoryRouter initialEntries={["/error"]}>
        <Routes>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/" element={<h1>Home Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    // Клікаємо на кнопку "на головну"
    cy.contains("button", "на головну").click();

    // Перевіряємо, що ми перейшли на головну (бачимо текст Home Page)
    cy.contains("Home Page").should("be.visible");
  });

  // Перевірка адаптивності стилів (font-size)
  it("Має змінювати розмір шрифту на мобільних пристроях", () => {
    // viewport - встановлюємо розмір мобільного екрану
    cy.viewport(375, 667);

    cy.mount(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    // Перевіряємо CSS властивість font-size
    cy.contains("404").should("have.css", "font-size", "96px");
  });
});