import React from "react";
import TextareaField from "./TextareaField";

describe("<TextareaField/>", () => {
    // Перевірка рендерингу лейбла та плейсхолдера
    it("Має коректно відображати лейбл та плейсхолдер", () => {
        const testLabel = "Опис проекту";
        const testPlaceholder = "Розкажіть детальніше...";

        cy.mount(<TextareaField label={testLabel} placeholder={testPlaceholder} />);

        // Перевіряємо, що текст лейбла видимий
        cy.contains(testLabel).should("be.visible");

        // Перевіряємо, що textarea має правильний атрибут placeholder
        cy.get("textarea").should("have.attr", "placeholder", testPlaceholder);
    });

    // Перевірка введення тексту
    it("Має дозволяти введення багаторядкового тексту", () => {
        const longText = "Рядок 1\nРядок 2\nРядок 3";

        cy.mount(<TextareaField label="Коментар" />);

        // type - вводимо текст у поле
        cy.get("textarea").type(longText);

        // have.value - перевіряємо, що значення поля відповідає введеному тексту
        cy.get("textarea").should("have.value", longText);
    });

    // Перевірка специфічних стилів (розмір та resize)
    it("Має мати мінімальну висоту та дозвіл на вертикальну зміну розміру", () => {
        cy.mount(<TextareaField label="Resize Test" />);

        // Перевіряємо CSS властивості min-height та resize
        cy.get("textarea")
            .should("have.css", "min-height", "140px")
            .and("have.css", "resize", "vertical");
    });

    // Перевірка зміни стилів при фокусі
    it("Має змінювати колір рамки при фокусі", () => {
        cy.mount(<TextareaField label="Focus Test" />);

        // Перевіряємо початковий колір рамки (border-color: #ccc)
        cy.get("textarea").should(
            "have.css",
            "border-color",
            "rgb(204, 204, 204)"
        );

        // focus - встановлюємо фокус на елемент
        cy.get("textarea").focus();

        // Перевіряємо, що колір рамки змінився на чорний (border-color: #000)
        cy.get("textarea").should(
            "have.css",
            "border-color",
            "rgb(0, 0, 0)"
        );
    });
});