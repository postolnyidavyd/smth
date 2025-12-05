import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";

describe("<MainPage/>", () => {
    // Перевірка стану завантаження
    it("Має відображати індикатор завантаження", () => {
        // intercept - перехоплюємо запит зображень із затримкою
        cy.intercept("GET", "**/images", {
            delay: 1000,
            body: {}
        }).as("getImagesLoading");

        // MemoryRouter потрібен для хука useNavigate
        cy.mount(
            <MemoryRouter>
                <MainPage />
            </MemoryRouter>
        );

        // Перевіряємо текст завантаження
        cy.contains("Loading...").should("be.visible");
    });

    // Перевірка стану помилки
    it("Має відображати помилку, якщо дані не завантажились", () => {
        // intercept - імітуємо помилку сервера
        cy.intercept("GET", "**/images", {
            statusCode: 500,
            body: { message: "Server Error" }
        }).as("getImagesError");

        cy.mount(
            <MemoryRouter>
                <MainPage />
            </MemoryRouter>
        );

        // wait - чекаємо завершення запиту
        cy.wait("@getImagesError");

        // Перевіряємо повідомлення про помилку
        cy.contains("Error").should("be.visible");
    });

    // Перевірка рендерингу контенту та зображень
    it("Має рендерити текст, список та отримані зображення", () => {
        // Мокові дані для тесту
        const mockData = {
            images: {
                main: ["camera.jpg", "volleyball.jpg"]
            }
        };

        // intercept - повертаємо успішні дані
        cy.intercept("GET", "**/images", {
            statusCode: 200,
            body: mockData
        }).as("getImagesSuccess");

        cy.mount(
            <MemoryRouter>
                <MainPage />
            </MemoryRouter>
        );

        // wait - чекаємо завантаження
        cy.wait("@getImagesSuccess");

        // Перевіряємо заголовки та текст
        cy.contains("Photo me").should("be.visible");
        cy.contains("Привіт!").should("be.visible");
        cy.contains("Трохи про процес").should("be.visible");

        // Перевіряємо список (OrderedList)
        cy.get("ol").should("exist");
        cy.contains("Підготовка також важлива").should("be.visible");

        // Перевіряємо, що зображення (FilmFrame) мають правильні src
        // Компонент бере data.images.main[1] для першого і main[0] для другого
        cy.get("img[alt='Волейбол']").should("have.attr", "src", "http://localhost:3000/volleyball.jpg");
        cy.get("img[alt='Камера']").should("have.attr", "src", "http://localhost:3000/camera.jpg");
    });

    // Перевірка навігації кнопок
    it("Має переходити на відповідні сторінки при кліку на кнопки", () => {
        // intercept - щоб не чекати помилок завантаження
        cy.intercept("GET", "**/images", { body: { images: { main: ["1.jpg", "2.jpg"] } } });

        // Налаштовуємо роутер з тестовими маршрутами для перевірки переходів
        cy.mount(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/booking" element={<h1>Booking Page</h1>} />
                    <Route path="/portfolio" element={<h1>Portfolio Page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        // Клікаємо на кнопку "запис"
        cy.contains("button", "запис").click();

        // Перевіряємо, що перейшли на сторінку бронювання
        cy.contains("Booking Page").should("be.visible");
    });
});