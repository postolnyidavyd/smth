import React from "react";
import FormSection from "./FormSection";

describe("<FormSection/>", () => {
    // Перевірка базових стилів (Desktop)
    it("Має застосовувати базові стилі на великих екранах (> 768px)", () => {
        // viewport - встановлюємо ширину екрану 1024px
        cy.viewport(1024, 768);

        cy.mount(<FormSection>Content</FormSection>);

       // Перевіряєм падінги та відступи
        cy.get("section").should("have.css", "padding", "64px 32px");
        cy.get("section").should("have.css", "gap", "32px");
    });

    // Перевірка стилів для планшетів
    it("Має змінювати відступи на планшетах (<= 768px)", () => {
        // Встановлюємо ширину екрану рівно 768px
        cy.viewport(768, 1024);

        cy.mount(<FormSection>Content</FormSection>);

        // Перевіряєм, що падінгти та відступи змінилися відповідно до медіа-запиту
        cy.get("section").should("have.css", "padding", "48px 24px");
        cy.get("section").should("have.css", "gap", "24px");
    });

    // Перевірка стилів для мобільних
    it("Має змінювати відступи на мобільних телефонах (<= 480px)", () => {
        // Встановлюємо ширину екрану 375px
        cy.viewport(375, 667);

        cy.mount(<FormSection>Content</FormSection>);

        // Перевіряємо padding: 2rem 1rem -> 32px 16px
        cy.get("section").should("have.css", "padding", "32px 16px");
        // Перевіряємо gap: 1.25rem -> 20px
        cy.get("section").should("have.css", "gap", "20px");
    });
});