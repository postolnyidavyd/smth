import React from "react";
import SocialButton from "./SocialButton";

// describe - це група тестів, яка описує компонент або функціональність
describe("<SocialButton/>", () => {
  // Перевірка коректного відображення тексту
  it("Має відображати правильний текст залежно від провайдера", () => {
    const providerName = "Google";

    // Монтуємо компоненту
    cy.mount(<SocialButton provider={providerName} />);

    // Перевіряємо, що елемент видимий
    cy.get("button").should("be.visible");

    // Перевіряємо, що текст кнопки правильний
    cy.get("button").should("contain", `Продовжити з ${providerName}`);
  });

  // Перевірка базових стилів
  it("Має мати прозорий фон та знижену прозорість за замовчуванням", () => {
    cy.mount(<SocialButton provider="Facebook" />);

    // Перевіряємо початкові стилі
    cy.get("button")
      .should("have.css", "background-color", "rgba(0, 0, 0, 0)")
      .and("have.css", "opacity", "0.8");
  });

  // Перевірка візуального ефекту при наведенні
  it("Має змінювати фон та прозорість при наведенні", () => {
    cy.mount(<SocialButton provider="Apple" />);

    // Емулюємо наведення миші
    cy.get("button").realHover();

    // Перевіряємо зміну стилів
    cy.get("button")
      .should("have.css", "background-color", "rgba(245, 245, 245)")
      .and("have.css", "opacity", "1");
  });
});