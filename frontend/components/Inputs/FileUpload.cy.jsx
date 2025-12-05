import React from "react";
import FileUpload from "./FileUpload";

describe("<FileUpload/>", () => {
    // Перевірка рендерингу лейбла та тексту кнопки
    it("Має відображати переданий лейбл та текст кнопки", () => {
        const labelText = "Завантажити документи";

        // Монтуємо компоненту
        cy.mount(<FileUpload label={labelText} />);

        // Перевіряємо, що лейбл відображається коректно
        cy.contains(labelText).should("be.visible");

        // Перевіряємо текст на псевдо-кнопці
        cy.contains("Вибрати файли").should("be.visible");
    });

    // Перевірка функціоналу завантаження файлу
    it("Має викликати onChange при виборі файлу", () => {
        // Створюємо шпигуна для події onChange
        const onChangeSpy = cy.stub().as("onChangeSpy");

        // Монтуємо компоненту
        cy.mount(<FileUpload label="Upload" onChange={onChangeSpy} />);

        // selectFile - спеціальна команда Cypress для імітації вибору файлу
        // { force: true } потрібен, бо input має стиль display: none
        cy.get('input[type="file"]').selectFile(
            { contents: Cypress.Buffer.from("file content"), fileName: "test.png" },
            { force: true }
        );

        // Перевіряємо, що функція onChange була викликана
        cy.get("@onChangeSpy").should("have.been.called");
    });

    // Перевірка атрибутів інпута (типи файлів та multiple)
    it("Має мати правильні налаштування атрибутів (accept, multiple)", () => {
        cy.mount(<FileUpload label="Attr Test" />);

        // Перевіряємо прихований інпут на наявність правильних атрибутів
        cy.get('input[type="file"]')
            .should("have.attr", "accept", ".jpg,.jpeg,.png,.pdf,.doc,.docx")
            .and("have.attr", "multiple");
    });

    // Перевірка стилів кнопки та ховер ефекту
    it("Має мати чорний фон та змінювати його при наведенні", () => {
        cy.mount(<FileUpload label="Style Test" />);

        // Знаходимо елемент, який виглядає як кнопка
        cy.contains("Вибрати файли").should(
            "have.css",
            "background-color",
            "rgb(0, 0, 0)"
        );

        // Емулюємо наведення миші на кнопку
        cy.contains("Вибрати файли").realHover();

        // Перевіряємо зміну кольору фону
        cy.contains("Вибрати файли").should(
            "have.css",
            "background-color",
            "rgb(51, 51, 51)"
        );
    });
});