import React from "react";
import { MemoryRouter } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import { AuthProvider } from "../store/AuthContex";

describe("<SignUpPage/>", () => {
  // Перевірка рендерингу основних елементів
  it("Має відображати заголовок та форму реєстрації", () => {
    // MemoryRouter та AuthProvider необхідні для коректного рендерингу компонента
    cy.mount(
      <AuthProvider>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </AuthProvider>
    );

    // Перевіряємо заголовок сторінки
    cy.contains("sign up").should("be.visible");

    // Перевіряємо кнопку відправки форми (текст має відповідати режиму реєстрації)
    cy.contains("button", "Зареєструвати").should("be.visible");
  });

  // Перевірка конфігурації форми
  it("Має відображати поле імені (специфіка сторінки реєстрації)", () => {
    cy.mount(
      <AuthProvider>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </AuthProvider>
    );

    // Перевіряємо наявність поля 'name', яке є тільки у формі реєстрації
    cy.get('input[name="name"]').should("be.visible");
  });
});