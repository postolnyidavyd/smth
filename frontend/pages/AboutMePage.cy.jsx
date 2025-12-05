import React from "react";
import { MemoryRouter } from "react-router-dom";
import AboutMePage from "./AboutMePage";

describe("<AboutMePage/>", () => {
  // Перевірка стану завантаження
  it("Має відображати стан завантаження поки запит виконується", () => {
    // intercept - перехоплюємо запит на отримання картинок і додаємо затримку
    // Це дозволяє нам 'спіймати' момент, коли loading === true
    cy.intercept("GET", "**/images", {
      delay: 1000,
      body: {}
    }).as("getImagesDelayed");

    // MemoryRouter потрібен для компонента Menu
    cy.mount(
      <MemoryRouter>
        <AboutMePage />
      </MemoryRouter>
    );

    // Перевіряємо, що текст "Loading..." відображається
    cy.contains("Loading...").should("be.visible");
  });

  // Перевірка обробки помилок
  it("Має відображати повідомлення про помилку, якщо сервер не відповідає", () => {
    // intercept - імітуємо помилку сервера (status 500)
    cy.intercept("GET", "**/images", {
      statusCode: 500,
      body: { message: "Server Error" }
    }).as("getImagesError");

    cy.mount(
      <MemoryRouter>
        <AboutMePage />
      </MemoryRouter>
    );

    // wait - чекаємо завершення (невдалого) запиту
    cy.wait("@getImagesError");

    // Перевіряємо текст помилки
    cy.contains("Error").should("be.visible");
  });

  // Перевірка успішного відображення контенту
  it("Має рендерити всі секції сторінки з отриманими даними", () => {
    // Створюємо мокові дані, які очікує компонент
    // Структура має відповідати: data.images.about.big / small
    const mockData = {
      images: {
        about: {
          big: "big-kseniia.jpg",
          small: ["small1.jpg", "small2.jpg"]
        }
      }
    };

    // intercept - повертаємо успішні дані
    cy.intercept("GET", "**/images", {
      statusCode: 200,
      body: mockData
    }).as("getImagesSuccess");

    cy.mount(
      <MemoryRouter>
        <AboutMePage />
      </MemoryRouter>
    );

    // wait - чекаємо завантаження даних
    cy.wait("@getImagesSuccess");

    //Перевіряємо меню
    cy.contains("☰").should("be.visible");

    //Перевіряємо Заголовок
    cy.contains("about me").should("be.visible");

    //Перевіряємо Галерею (PhotoGallery)
    // Перевіряємо, що компонент додав префікс http://localhost:3000/ до src
    cy.get("img[alt='Ксюша']")
      .first()
      .should("have.attr", "src", "http://localhost:3000/big-kseniia.jpg");

    // Перевіряємо Текст
    cy.contains("kseniia").should("be.visible");
    cy.contains("у сфері фотографії більше року").should("be.visible");

    // Перевіряємо Секцію програм (AppsSection)
    // Перевіряємо опис, який передається пропсом
    cy.contains("кожне фото ретушується").should("be.visible");

    // Перевіряємо, що картинки програм (Photoshop, Lightroom) теж завантажились
    cy.get("img[alt='Photoshop']").should("exist");
  });
});