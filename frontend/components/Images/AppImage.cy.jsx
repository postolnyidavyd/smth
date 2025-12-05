import React from "react";
import AppImage from "./AppImage";

// describe - це група тестів, яка описує компонент або функціональність
describe("<AppImage/>", () => {
    // Перевірка рендерингу правильної кількості зображень
    it("Має рендерити список зображень на основі переданого масиву", () => {
        // Створюємо мокові дані для зображень
        const mockImages = [
            { src: "image1.jpg", alt: "Опис 1" },
            { src: "image2.jpg", alt: "Опис 2" },
            { src: "image3.jpg", alt: "Опис 3" },
        ];

        // Монтуємо компоненту з масивом даних
        cy.mount(<AppImage images={mockImages} />);

        // Перевіряємо, що відрендерилося рівно 3 теги img
        cy.get("img").should("have.length", 3);
    });

    // Перевірка атрибутів (src та alt)
    it("Має мати коректні атрибути src та alt", () => {
        const mockImages = [{ src: "test.jpg", alt: "Тестове зображення" }];

        cy.mount(<AppImage images={mockImages} />);

        // Перевіряємо атрибути першого зображення
        cy.get("img")
            .first()
            .should("have.attr", "src", "test.jpg")
            .and("have.attr", "alt", "Тестове зображення");
    });

    // Перевірка стилів зображення
    it("Має мати задані стилі (рамка, заокруглення)", () => {
        const mockImages = [{ src: "style.jpg", alt: "Style Test" }];

        cy.mount(<AppImage images={mockImages} />);

        // Перевіряємо CSS властивості зображення
        // Перевіряємо border-radius, object-fit та border-color
        cy.get("img")
            .should("have.css", "border-radius", "10px")
            .and("have.css", "object-fit", "cover")
            .and("have.css", "border-color", "rgb(0, 0, 0)");
    });

    // Перевірка стилів обгортки
    it("Має використовувати Flexbox для розташування", () => {
        const mockImages = [{ src: "layout.jpg", alt: "Layout" }];

        cy.mount(<AppImage images={mockImages} />);

        // Знаходимо батьківський елемент зображення (Wrapper) і перевіряємо його стиль
        cy.get("img").parent().should("have.css", "display", "flex");
    });
});