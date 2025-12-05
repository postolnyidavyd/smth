import React from "react";
import { MemoryRouter } from "react-router-dom";
import PortfolioPage from "./PortfolioPage";

describe("<PortfolioPage/>", () => {
    // Перевірка рендерингу сторінки та інтеграції компонентів
    it("Має відображати заголовок, меню та три секції галереї з картинками", () => {
        // Створюємо мокові дані для всіх категорій, що використовуються на сторінці
        const mockData = {
            images: {
                view: ["view1.jpg"],
                studio: ["studio1.jpg"],
                outdoor: ["outdoor1.jpg"]
            }
        };

        // intercept - перехоплюємо запит, який роблять дочірні компоненти HorizontalGallery
        cy.intercept("GET", "**/images", {
            statusCode: 200,
            body: mockData
        }).as("getImages");

        // MemoryRouter необхідний для компонента Menu
        cy.mount(
            <MemoryRouter>
                <PortfolioPage />
            </MemoryRouter>
        );

        // wait - чекаємо завантаження даних
        cy.wait("@getImages");

        // Перевіряємо заголовок сторінки
        cy.contains("Portfolio").should("be.visible");

        // Перевіряємо наявність меню
        cy.contains("☰").should("be.visible");

        // Перевіряємо, що картинки для галереї "view" завантажились
        cy.get("img[alt='красивий краєвид']").should("be.visible");

        // Перевіряємо картинки для "studio" та "outdoor"
        // Оскільки у них однаковий alt 'красива людина', їх має бути мінімум 2
        cy.get("img[alt='красива людина']").should("have.length.at.least", 2);
    });
});