import React from "react";
import AppsSection from "./AppsSection";

describe("<AppsSection/>", () => {
  // Перевірка відображення опису
  it("Має коректно відображати переданий текст опису", () => {
    const descriptionText = "Це детальний опис функціоналу";
    const mockImages = [];

    cy.mount(<AppsSection description={descriptionText} images={mockImages} />);

    // Перевіряємо, що текст відображається
    cy.contains(descriptionText).should("be.visible");
  });

  // Перевірка інтеграції з AppImage (передача зображень)
  it("Має рендерити компонент AppImage з переданими зображеннями", () => {
    // Створюємо мокові дані зображень
    const mockImages = [
      { src: "app1.png", alt: "App 1" },
      { src: "app2.png", alt: "App 2" },
    ];

    cy.mount(<AppsSection images={mockImages} description="Test" />);

    // Перевіряємо, що зображення з'явилися в DOM
    cy.get("img").should("have.length", 2);
  });

  // Перевірка стилів обгортки
  it("Має розташовувати елементи вертикально (flex-column)", () => {
    cy.mount(<AppsSection images={[]} description="Layout Test" />);

    // Знаходимо батьківський елемент тексту і перевіряємо його стилі
    cy.contains("Layout Test")
      .parent()
      .should("have.css", "display", "flex")
      .and("have.css", "flex-direction", "column")
      .and("have.css", "gap", "6.4px");// 0.4rem = 6.4px
  });
});
