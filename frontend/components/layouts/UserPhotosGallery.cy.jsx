import React from "react";
import UserPhotosGallery from "./UserPhotosGallery";

describe("<UserPhotosGallery/>", () => {
    // Перевірка стану завантаження
    it("Має відображати текст завантаження під час запиту", () => {
        // intercept - перехоплюємо запит та додаємо затримку, щоб побачити лоадер
        cy.intercept("GET", "**/user-photos", {
            delay: 1000,
            body: { photos: [] }
        }).as("loadingRequest");

        cy.mount(<UserPhotosGallery />);

        // Перевіряємо, що текст завантаження видимий
        cy.contains("Завантажую ваші фото...").should("be.visible");
    });

    // Перевірка порожнього стану
    it("Має відображати повідомлення, якщо список фото порожній", () => {
        // intercept - повертаємо пустий масив фото
        cy.intercept("GET", "**/user-photos", {
            body: { photos: [] }
        }).as("emptyRequest");

        cy.mount(<UserPhotosGallery />);

        // wait - чекаємо завершення запиту
        cy.wait("@emptyRequest");

        // Перевіряємо текст для порожнього стану
        cy.contains("У вас ще немає фото").should("be.visible");
    });

    // Перевірка успішного рендерингу фото
    it("Має рендерити отримані фото", () => {
        const mockPhotos = [
            { filename: "photo1.jpg", url: "http://example.com/1.jpg" },
            { filename: "photo2.jpg", url: "http://example.com/2.jpg" }
        ];

        // intercept - повертаємо масив з тестовими фото
        cy.intercept("GET", "**/user-photos", {
            body: { photos: mockPhotos }
        }).as("photosRequest");

        cy.mount(<UserPhotosGallery />);

        // wait - чекаємо на дані
        cy.wait("@photosRequest");

        // Перевіряємо кількість зображень у гріду
        cy.get("img").should("have.length", 2);

        // Перевіряємо src першого зображення
        cy.get("img").first().should("have.attr", "src", "http://example.com/1.jpg");
    });

    // Перевірка відправки токена авторизації
    it("Має відправляти Authorization хедер з токеном з localStorage", () => {
        const testToken = "abc-123-token";

        // Встановлюємо токен у localStorage перед маунтом
        window.localStorage.setItem("token", testToken);

        // intercept - перехоплюємо запит і перевіряємо заголовки
        cy.intercept("GET", "**/user-photos", (req) => {
            // expect - перевіряємо, що заголовок Authorization правильний
            expect(req.headers.authorization).to.equal(`Bearer ${testToken}`);
            req.reply({ body: { photos: [] } });
        }).as("authRequest");

        cy.mount(<UserPhotosGallery />);

        // wait - чекаємо, щоб переконатися, що запит пішов
        cy.wait("@authRequest");
    });

    // Перевірка адаптивного гріда
    it("Має використовувати Grid для розміщення фото", () => {
        // Мокуємо дані
        cy.intercept("GET", "**/user-photos", {
            body: { photos: [{ filename: "1", url: "1.jpg" }] }
        });

        cy.mount(<UserPhotosGallery />);

        // Перевіряємо, що контейнер має display: grid
        cy.get("img").parent().should("have.css", "display", "grid");
    });
});