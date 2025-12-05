import React from "react";
import OrderedList from "./OrderedList";

describe("<OrderedList/>", () => {
    // Перевірка рендерингу вкладених елементів
    it("Має рендерити передані дочірні елементи (children)", () => {
        cy.mount(
            <OrderedList>
                <li>Пункт 1</li>
                <li>Пункт 2</li>
            </OrderedList>
        );

        // Перевіряємо, що список створено
        cy.get("ol").should("exist");

        // Перевіряємо відображення контенту
        cy.contains("Пункт 1").should("be.visible");
        cy.get("li").should("have.length", 2);
    });

    // Перевірка стилів для десктопу
    it("Має мати відповідні стилі шрифту на великих екранах", () => {
        // viewport - задаємо ширину екрану
        cy.viewport(1024, 768);

        cy.mount(
            <OrderedList>
                <li>Text</li>
            </OrderedList>
        );

        // Перевіряємо font-size
        cy.get("ol").should("have.css", "font-size", "22.4px");

        // Перевіряємо
        cy.get("ol").should("have.css", "text-align", "left");
    });

    // Перевірка адаптивності
    it("Має зменшувати шрифт та відступи на мобільних пристроях", () => {
        // viewport - задаємо ширину екрану
        cy.viewport(375, 667);

        cy.mount(
            <OrderedList>
                <li>Mobile</li>
            </OrderedList>
        );

        // Перевіряємо змінений font-size
        cy.get("ol").should("have.css", "font-size", "16px");

        // Перевіряємо змінений padding-left
        cy.get("ol").should("have.css", "padding-left", "16px");
    });

    // Перевірка ширини контейнера
    it("Має обмежувати максимальну ширину списку", () => {
        cy.mount(
            <OrderedList>
                <li>Width Test</li>
            </OrderedList>
        );

        // Перевіряємо max-width
        cy.get("ol").should("have.css", "max-width", "700px");
    });
});