import React from "react";
import Modal from "./Modal";

describe("<Modal/>", () => {
    // Перевірка рендерингу заголовка та повідомлення
    it("Має відображати переданий заголовок та повідомлення", () => {
        const testTitle = "Увага";
        const testMessage = "Дані не збережено";

        cy.mount(<Modal title={testTitle} message={testMessage} />);

        // Перевіряємо видимість заголовка та тексту
        cy.contains(testTitle).should("be.visible");
        cy.contains(testMessage).should("be.visible");
    });

    // Перевірка пропса за замовчуванням
    it("Має відображати дефолтне повідомлення, якщо проп message не переданий", () => {
        cy.mount(<Modal title="Error" />);

        // Перевіряємо текст за замовчуванням "Виникла помилка"
        cy.contains("Виникла помилка").should("be.visible");
    });

    // Перевірка взаємодії з кнопкою
    it("Має викликати onConfirm при кліку на кнопку OK", () => {
        // Створюємо шпигуна для функції
        const onConfirmSpy = cy.stub().as("onConfirmSpy");

        cy.mount(<Modal title="Test" onConfirm={onConfirmSpy} />);

        // click - клікаємо по кнопці
        cy.contains("button", "OK").click();

        // Перевіряємо, що функція була викликана
        cy.get("@onConfirmSpy").should("have.been.calledOnce");
    });

    // Перевірка стилів перекриття (Backdrop)
    it("Має перекривати екран фіксованим фоном", () => {
        cy.mount(<Modal title="Style Test" />);

        // Знаходимо кореневий елемент (Backdrop) через пошук батьківського елемента кнопки
        // Перевіряємо position: fixed та z-index
        cy.get("button").parent().parent()
            .should("have.css", "position", "fixed")
            .and("have.css", "z-index", "1000")
            .and("have.css", "background-color", "rgba(0, 0, 0, 0.5)");
    });
});