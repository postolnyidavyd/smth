import React from "react";
import { HorizontalGallery } from "./HorizontalGallery";

describe("<HorizontalGallery/>", () => {
  // Перевірка стану завантаження
  it("Має відображати текст завантаження, поки дані отримуються", () => {
    // intercept - перехоплюємо будь-який GET запит і додаємо затримку
    // Це змусить хук useFetchData залишатися в стані loading
    cy.intercept("GET", "**/images", {
      delay: 1000,
      body: {}
    }).as("loadingRequest");

    cy.mount(<HorizontalGallery type="test" alt="loading" />);

    // Перевіряємо наявність тексту "Loading..."
    cy.contains("Loading...").should("be.visible");
  });

  // Перевірка стану помилки
  it("Має відображати помилку, якщо запит не вдався", () => {
    // intercept - імітуємо помилку сервера (status 500)
    cy.intercept("GET", "**/images", {
      statusCode: 500,
      body: "Internal Server Error"
    }).as("errorRequest");

    cy.mount(<HorizontalGallery type="test" alt="error" />);
    // wait - чекаємо, поки хук спробує завантажити дані і отримає помилку
    cy.wait("@errorRequest");
    // Перевіряємо, що відображається повідомлення про помилку
    cy.contains("Error").should("be.visible");
  });

  // Перевірка успішного рендерингу зображень
  it("Має рендерити список зображень, коли дані отримані успішно", () => {
    const testType = "nature";
    const testImages = ["img1.jpg", "img2.jpg", "img3.jpg"];
    const testAlt = "Природа";

    // intercept - повертаємо успішну відповідь з моковими даними
    cy.intercept("GET", "**", {
      body: {
        images: {
          [testType]: testImages
        }
      }
    }).as("successRequest");

    cy.mount(<HorizontalGallery type={testType} alt={testAlt} />);

    // wait - явно чекаємо завершення перехопленого запиту перед перевірками
    cy.wait("@successRequest");

    // Перевіряємо кількість відрендерених зображень
    cy.get("img").should("have.length", 3);

    // Перевіряємо src та alt першого зображення
    cy.get("img")
      .first()
      .should("have.attr", "src", `http://localhost:3000/${testImages[0]}`)
      .and("have.attr", "alt", testAlt);
  });

  // Перевірка стилів галереї (горизонтальний скрол)
  it("Має мати стилі для горизонтального скролу", () => {
    // Мокуємо дані, щоб компонент просто відрендерився
    cy.intercept("GET", "**", {
      body: { images: { test: ["img1.jpg"] } }
    });

    cy.mount(<HorizontalGallery type="test" alt="scroll" />);

    // Знаходимо батьківський елемент зображення (Wrapper)
    // Перевіряємо overflow-x: auto
    cy.get("img").parent()
      .should("have.css", "overflow-x", "auto")
      .and("have.css", "display", "flex");
  });
});