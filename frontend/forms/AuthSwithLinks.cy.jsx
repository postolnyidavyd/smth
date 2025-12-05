import React from "react";
import { MemoryRouter } from "react-router-dom";
import AuthSwitchLink from "./AuthSwithLinks";

describe("<AuthSwitchLink/>", () => {
    // Перевірка відображення тексту
    it("Має відображати передане питання та текст посилання", () => {
        const questionText = "Вже є акаунт?";
        const actionText = "Увійти";

        // MemoryRouter необхідний для коректної роботи компонента Link
        cy.mount(
            <MemoryRouter>
                <AuthSwitchLink
                    question={questionText}
                    actionText={actionText}
                    to="/login"
                />
            </MemoryRouter>
        );

        // Перевіряємо видимість обох частин тексту
        cy.contains(questionText).should("be.visible");
        cy.contains(actionText).should("be.visible");
    });

    // Перевірка навігаційного посилання
    it("Має формувати коректне посилання (href) для переходу", () => {
        const targetRoute = "/signup";

        cy.mount(
            <MemoryRouter>
                <AuthSwitchLink question="?" actionText="Go" to={targetRoute} />
            </MemoryRouter>
        );

        // Link рендериться в HTML як тег <a>. Перевіряємо його атрибут href
        cy.get("a").should("have.attr", "href", targetRoute);
    });

    // Перевірка стилів тексту та акцентного елемента
    it("Має мати сірий колір основного тексту та чорний для посилання", () => {
        cy.mount(
            <MemoryRouter>
                <AuthSwitchLink question="Main" actionText="Link" to="/" />
            </MemoryRouter>
        );

        // Перевіряємо колір основного тексту
        cy.contains("Main").should("have.css", "color", "rgb(85, 85, 85)");

        // Перевіряємо стилі елемента strong
        cy.get("strong")
            .should("have.css", "color", "rgb(0, 0, 0)")
            .and("have.css", "text-decoration-line", "underline") // або просто text-decoration
            .and("have.css", "cursor", "pointer")
            .and("have.css", "font-weight", "600");
    });
});