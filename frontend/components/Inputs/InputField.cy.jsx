import React from "react";
import InputField from "./InputField";

describe("<InputField/>", () => {
    // Перевірка рендерингу лейбла та плейсхолдера
    it("Має коректно відображати лейбл та плейсхолдер", () => {
        const testLabel = "Ваше ім'я";
        const testPlaceholder = "Введіть текст";

        cy.mount(<InputField label={testLabel} placeholder={testPlaceholder} />);

        // Перевіряємо, що лейбл видимий
        cy.contains(testLabel).should("be.visible");

        // Перевіряємо, що інпут має правильний плейсхолдер
        cy.get("input").should("have.attr", "placeholder", testPlaceholder);
    });

    // Перевірка логіки плейсхолдера за замовчуванням
    it("Має використовувати лейбл як плейсхолдер, якщо він не заданий окремо", () => {
        const testLabel = "Email";

        cy.mount(<InputField label={testLabel} />);

        // Перевіряємо, що плейсхолдер дорівнює тексту лейбла
        cy.get("input").should("have.attr", "placeholder", testLabel);
    });

    // Перевірка вводу тексту
    it("Має дозволяти вводити текст", () => {
        const typeText = "Hello World";

        cy.mount(<InputField label="Test" />);

        // type - вводимо текст в поле
        cy.get("input").type(typeText);

        // have.value - перевіряємо поточне значення інпуту
        cy.get("input").should("have.value", typeText);
    });

    // Перевірка стилів у стані фокусу
    it("Має змінювати колір нижньої межі при фокусі", () => {
        cy.mount(<InputField label="Focus Test" />);

        // Перевіряємо початковий колір border-bottom
        cy.get("input").should(
            "have.css",
            "border-bottom-color",
            "rgb(204, 204, 204)"
        );

        // focus - встановлюємо фокус на елемент
        cy.get("input").focus();

        // Перевіряємо зміну кольору border-bottom на чорний
        cy.get("input").should(
            "have.css",
            "border-bottom-color",
            "rgb(0, 0, 0)"
        );
    });
});