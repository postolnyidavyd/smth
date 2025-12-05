import React from "react";
import { MemoryRouter } from "react-router-dom";
import AuthForm from "./AuthForm";
// Імпортуємо саме Context об'єкт, щоб надати йому мокове значення
import { AuthContext } from "../store/AuthContex";

describe("<AuthForm/>", () => {
    // Допоміжна обгортка для надання контексту та роутера
    const MountWithContext = ({ children, loginSpy = cy.stub() }) => (
        <AuthContext.Provider value={{ login: loginSpy }}>
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </AuthContext.Provider>
    );

    // Перевірка рендерингу форми входу (Login)
    it("Має відображати поля для входу (без поля імені)", () => {
        cy.mount(
            <MountWithContext>
                <AuthForm type="login" />
            </MountWithContext>
        );

        // Перевіряємо, що поле імені відсутнє
        cy.get('input[name="name"]').should("not.exist");

        // Перевіряємо наявність полів email та паролю
        cy.get('input[name="email"]').should("be.visible");
        cy.get('input[name="password"]').should("be.visible");

        // Перевіряємо текст кнопки
        cy.contains("button", "Увійти").should("be.visible");
    });

    // Перевірка рендерингу форми реєстрації (Signup)
    it("Має відображати поле імені при реєстрації", () => {
        cy.mount(
            <MountWithContext>
                <AuthForm type="signup" />
            </MountWithContext>
        );

        // Перевіряємо, що поле імені відображається
        cy.get('input[name="name"]').should("be.visible");

        // Перевіряємо текст кнопки
        cy.contains("button", "Зареєструвати").should("be.visible");
    });

    // Перевірка валідації полів
    it("Має показувати помилки валідації при спробі відправки порожньої форми", () => {
        cy.mount(
            <MountWithContext>
                <AuthForm type="signup" />
            </MountWithContext>
        );

        // Натискаємо кнопку відправки без заповнення полів
        cy.contains("button", "Зареєструвати").click();

        // Перевіряємо відображення повідомлень про помилки
        cy.contains("Введіть ім'я").should("be.visible");
        cy.contains("Введіть коректний email").should("be.visible");
        cy.contains("Пароль має бути мінімум 8 символів").should("be.visible");
    });

    // Перевірка успішного входу
    it("Має відправляти дані на /login та викликати login() з контексту", () => {
        const loginSpy = cy.stub().as("loginSpy");
        const mockResponse = { token: "abc-token", user: { name: "TestUser" } };

        // intercept - перехоплюємо POST запит на логін
        cy.intercept("POST", "**/login", {
            statusCode: 200,
            body: mockResponse
        }).as("loginRequest");

        cy.mount(
            <MountWithContext loginSpy={loginSpy}>
                <AuthForm type="login" />
            </MountWithContext>
        );

        // Заповнюємо форму
        cy.get('input[name="email"]').type("user@test.com");
        cy.get('input[name="password"]').type("password123");
        cy.contains("button", "Увійти").click();

        // wait - чекаємо виконання запиту
        cy.wait("@loginRequest");

        // Перевіряємо, що функція login була викликана з даними від сервера
        cy.get("@loginSpy").should("have.been.calledWith", mockResponse.token, mockResponse.user);
    });

    // Перевірка обробки помилок (Модальне вікно)
    it("Має відкривати модальне вікно при помилці авторизації (401)", () => {
        // intercept - імітуємо помилку 401 від сервера
        cy.intercept("POST", "**/login", {
            statusCode: 401,
            body: { message: "Невірний email або пароль" }
        }).as("loginError");

        cy.mount(
            <MountWithContext>
                <AuthForm type="login" />
            </MountWithContext>
        );

        // Заповнюємо форму
        cy.get('input[name="email"]').type("wrong@test.com");
        cy.get('input[name="password"]').type("wrongpass");
        cy.contains("button", "Увійти").click();

        // wait - чекаємо відповіді помилкою
        cy.wait("@loginError");

        // Перевіряємо, що з'явилося модальне вікно з правильним заголовком
        cy.contains("Помилка входу").should("be.visible");

        // Закриваємо модальне вікно
        cy.contains("button", "OK").click();
        cy.contains("Помилка входу").should("not.exist");
    });

    // Перевірка успішної реєстрації
    it("Має відправляти дані на /register при реєстрації", () => {
        // intercept - перехоплюємо запит реєстрації
        cy.intercept("POST", "**/register", {
            statusCode: 200,
            body: { token: "token", user: {} }
        }).as("registerRequest");

        cy.mount(
            <MountWithContext>
                <AuthForm type="signup" />
            </MountWithContext>
        );

        // Заповнюємо поля
        cy.get('input[name="name"]').type("New User");
        cy.get('input[name="email"]').type("new@test.com");
        cy.get('input[name="password"]').type("password123");

        cy.contains("button", "Зареєструвати").click();

        // Перевіряємо, що в тілі запиту були правильні дані
        cy.wait("@registerRequest").its("request.body").should("deep.include", {
            userName: "New User",
            email: "new@test.com"
        });
    });
});