import React from "react";
import BookingForm from "./BookingForm";

describe("<BookingForm/>", () => {
    // Перевірка рендерингу всіх полів форми
    it("Має відображати всі необхідні поля вводу та кнопку", () => {
        cy.mount(<BookingForm />);

        // Перевіряємо наявність основних полів за атрибутом name
        cy.get('input[name="name"]').should("be.visible");
        cy.get('input[name="email"]').should("be.visible");
        cy.get('input[name="phone"]').should("be.visible");
        cy.get('input[name="instagram"]').should("be.visible");
        cy.get('input[name="people"]').should("be.visible");
        cy.get('input[name="location"]').should("be.visible");

        // Перевіряємо поле для файлів та textarea
        // input type="file" зазвичай прихований, тому перевіряємо його наявність в DOM
        cy.get('input[type="file"]').should("exist");
        cy.get('textarea[name="wishes"]').should("be.visible");

        // Перевіряємо кнопку
        cy.contains("button", "записатись").should("be.visible");
    });

    // Перевірка валідації полів
    it("Має показувати повідомлення про помилки при неправильному заповненні", () => {
        cy.mount(<BookingForm />);

        // Натискаємо кнопку відправки на порожній формі
        cy.contains("button", "записатись").click();

        // Перевіряємо повідомлення про помилки для обов'язкових полів
        cy.contains("Введіть ім'я").should("be.visible");
        cy.contains("Введіть коректний email").should("be.visible");
        cy.contains("Введіть номер телефону").should("be.visible"); // Перевірка довжини
        cy.contains("Введіть інстаграм").should("be.visible");

        // Перевірка валідації телефону (має бути рівно 9 цифр)
        cy.get('input[name="phone"]').type("123"); // Вводимо лише 3 цифри
        cy.contains("button", "записатись").click();
        cy.contains("Введіть номер телефону").should("be.visible");
    });

    // Перевірка роботи завантаження файлів
    it("Має відображати список обраних файлів", () => {
        cy.mount(<BookingForm />);

        // selectFile - імітує вибір файлів користувачем
        // force: true потрібен, бо стилізований інпут часто приховує нативний <input type="file">
        cy.get('input[type="file"]').selectFile(
            [
                { contents: Cypress.Buffer.from("file1"), fileName: "ref1.jpg" },
                { contents: Cypress.Buffer.from("file2"), fileName: "ref2.png" }
            ],
            { force: true }
        );

        // Перевіряємо, що з'явився блок зі списком файлів
        cy.contains("Обрано файлів: 2").should("be.visible");
        cy.contains("- ref1.jpg").should("be.visible");
        cy.contains("- ref2.png").should("be.visible");
    });

    // Перевірка успішної відправки форми (FormData)
    it("Має відправляти коректні дані (FormData) на сервер", () => {
        // intercept - перехоплюємо POST запит на ендпоінт відправки
        cy.intercept("POST", "**/send-booking", (req) => {
            req.reply({ statusCode: 200, body: { success: true } });
        }).as("submitForm");

        cy.mount(<BookingForm />);

        // Заповнюємо форму валідними даними
        cy.get('input[name="name"]').type("Марія");
        cy.get('input[name="email"]').type("maria@test.com");
        cy.get('input[name="phone"]').type("123456789");
        cy.get('input[name="instagram"]').type("@maria_photo");
        cy.get('input[name="people"]').type("2");
        cy.get('input[name="location"]').type("Студія");

        // ВИПРАВЛЕНО ТУТ: Додано Cypress.Buffer.from()
        cy.get('input[type="file"]').selectFile(
            {
                contents: Cypress.Buffer.from("test"), // <--- Важливо!
                fileName: "test.jpg"
            },
            { force: true }
        );

        // Відправляємо форму
        cy.contains("button", "записатись").click();

        // wait - чекаємо, поки запит піде
        cy.wait("@submitForm");

        // Перевіряємо, що після успіху з'явилося модальне вікно успіху
        cy.contains("Форму успішно відправлено!").should("be.visible");
    });

    // Перевірка обробки помилки сервера
    it("Має відображати модальне вікно з помилкою, якщо сервер відповів 500", () => {
        // intercept - імітуємо помилку сервера
        cy.intercept("POST", "**/send-booking", {
            statusCode: 500,
            body: { message: "Server Error" }
        }).as("submitError");

        cy.mount(<BookingForm />);

        // Заповнюємо мінімально необхідні поля для проходження клієнтської валідації
        cy.get('input[name="name"]').type("Test");
        cy.get('input[name="email"]').type("test@test.com");
        cy.get('input[name="phone"]').type("987654321");
        cy.get('input[name="instagram"]').type("inst");
        cy.get('input[name="people"]').type("1");
        cy.get('input[name="location"]').type("Loc");

        cy.contains("button", "записатись").click();

        // Чекаємо помилки
        cy.wait("@submitError");

        // Перевіряємо заголовок модального вікна помилки
        cy.contains("Виникла помилка відправки!").should("be.visible");
    });
});