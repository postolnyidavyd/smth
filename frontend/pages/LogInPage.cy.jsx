import React from "react";
import { MemoryRouter } from "react-router-dom";
import LogInPage from "./LogInPage";
import { AuthProvider } from "../store/AuthContex";

describe("<LogInPage/>", () => {
    // Перевірка рендерингу основних елементів сторінки
    it("Має відображати заголовок 'log in' та форму входу", () => {
        // MemoryRouter та AuthProvider необхідні, оскільки дочірній AuthForm використовує хуки навігації та контексту
        cy.mount(
            <AuthProvider>
                <MemoryRouter>
                    <LogInPage />
                </MemoryRouter>
            </AuthProvider>
        );

        // Перевіряємо заголовок сторінки (TitleTexts)
        cy.contains("log in").should("be.visible");

        // Перевіряємо наявність форми (поля email та кнопки входу)
        // Наявність кнопки "Увійти" підтверджує, що AuthForm отримав правильний type="login"
        cy.get('input[name="email"]').should("be.visible");
        cy.contains("button", "Увійти").should("be.visible");
    });

    // Перевірка правильності конфігурації форми
    it("Не має відображати поле імені (специфіка сторінки логіну)", () => {
        cy.mount(
            <AuthProvider>
                <MemoryRouter>
                    <LogInPage />
                </MemoryRouter>
            </AuthProvider>
        );

        // Перевіряємо, що поле 'name' відсутнє в DOM
        cy.get('input[name="name"]').should("not.exist");
    });
});