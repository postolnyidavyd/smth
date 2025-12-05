import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import BookingPage from "./BookingPage";
import { AuthContext } from "../store/AuthContex";

describe("<BookingPage/>", () => {
  // Допоміжна обгортка для надання контексту авторизації та роутера
  const MountWithAuth = ({
    children,
    user = null,
    loading = false,
    login = cy.stub(), // Заглушка
    logout = cy.stub(), // Заглушка
  }) => (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      <MemoryRouter initialEntries={["/booking"]}>
        <Routes>
          <Route path="/booking" element={children} />
          <Route path="/login" element={<h1>Login Page</h1>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
// Перед кожним тестом блокуємо реальні запити, щоб тест не зависав на очікуванні сервера
    beforeEach(() => {
        cy.intercept("GET", "**", { body: {} }).as("blockNetwork");
        cy.intercept("POST", "**", { body: {} }).as("blockPost");
    });

  // Перевірка стану завантаження
  it("Має відображати індикатор завантаження, коли loading=true", () => {
    cy.mount(
      <MountWithAuth loading={true}>
        <BookingPage />
      </MountWithAuth>,
    );

    // Перевіряємо текст завантаження
    cy.contains("Завантаження...").should("be.visible");
  });

  // Перевірка для неавторизованого користувача
  it("Має приховувати форму та просити увійти, якщо користувач не авторизований", () => {
    cy.mount(
      <MountWithAuth user={null}>
        <BookingPage />
      </MountWithAuth>,
    );

    // Перевіряємо наявність заголовків
    cy.contains("booking").should("be.visible");

    // Перевіряємо повідомлення про необхідність входу
    cy.contains("Запис на зйомку").should("be.visible");
    cy.contains("увійдіть до акаунту").should("be.visible");

    // Перевіряємо, що форма відсутня
    cy.contains("button", "записатись").should("not.exist");
  });

  // Перевірка редіректу на логін
  it("Має перенаправляти на сторінку логіну при кліку на посилання", () => {
    cy.mount(
      <MountWithAuth user={null}>
        <BookingPage />
      </MountWithAuth>,
    );

    // click - клікаємо на текст "увійдіть до акаунту"
    cy.contains("a", "увійдіть до акаунту").click();

    // Перевіряємо, що ми перейшли на роут /login
    cy.contains("h1", "Login Page").should("be.visible");
  });

  // Перевірка для авторизованого користувача
  it("Має відображати форму бронювання, якщо користувач існує", () => {
    const testUser = { name: "Test User", email: "test@test.com" };

    cy.mount(
      <MountWithAuth user={testUser}>
        <BookingPage />
      </MountWithAuth>,
    );

    // Перевіряємо, що повідомлення про заборону зникло
    cy.contains("увійдіть до акаунту").should("not.exist");

    // Перевіряємо, що форма з'явилася (шукаємо кнопку або інпут)
    cy.contains("button", "записатись").should("be.visible");
    cy.get('input[name="name"]').should("exist");
  });
});
