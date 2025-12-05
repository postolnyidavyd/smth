import React from "react";
import FilmFrame from "./FilmFrame";

describe("<FilmFrame/>", () => {
    // Перевірка рендерингу зображення з переданими пропсами
    it("Має коректно відображати зображення з src та alt", () => {
        // Створюємо тестові дані
        const testSrc = "movie-scene.jpg";
        const testAlt = "Сцена з фільму";

        // Монтуємо компоненту
        cy.mount(<FilmFrame src={testSrc} alt={testAlt} />);

        // Перевіряємо, що зображення видиме
        cy.get("img").should("be.visible");

        // Перевіряємо атрибути src та alt
        cy.get("img")
            .should("have.attr", "src", testSrc)
            .and("have.attr", "alt", testAlt);
    });

    // Перевірка значення alt за замовчуванням
    it("Має використовувати текст alt за замовчуванням, якщо він не переданий", () => {
        // Монтуємо компоненту лише з src
        cy.mount(<FilmFrame src="default.jpg" />);

        // Перевіряємо, що alt має дефолтне значення Filmroll image
        cy.get("img").should("have.attr", "alt", "Filmroll image");
    });

    // Перевірка стилів обгортки
    it("Має мати темний фон обгортки", () => {
        cy.mount(<FilmFrame src="style-test.jpg" />);

        // Знаходимо батьківський елемент (Frame) через зображення
        cy.get("img").parent().should(
            "have.css",
            "background-color",
            "rgb(24, 24, 24)"
        );
    });

    // Перевірка специфічних стилів зображення
    it("Має мати правильне співвідношення сторін та object-fit", () => {
        cy.mount(<FilmFrame src="ratio.jpg" />);

        // Перевіряємо CSS властивості зображення
        // aspect-ratio: 16 / 7 та object-fit: cover
        cy.get("img")
            .should("have.css", "aspect-ratio", "16 / 7")
            .and("have.css", "object-fit", "cover");
    });
});