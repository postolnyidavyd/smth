import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import { AuthContext } from "../store/AuthContex";

describe("<UserPage/>", () => {
    // Допоміжна обгортка для надання контексту
    const MountWithAuth = ({ children, user = null, loading = false, logoutSpy = cy.stub() }) => (
        <AuthContext.Provider value={{ user, loading, logout: logoutSpy }}>
            <MemoryRouter initialEntries={["/userpage"]}>
                <Routes>
                    <Route path="/userpage" element={children} />
                    <Route path="/login" element={<h1>Login Page</h1>} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    // Перевірка стану завантаження
    it("Має відображати індикатор завантаження", () => {
        cy.mount(
            <MountWithAuth loading={true}>
                <UserPage />
            </MountWithAuth>
        );

        // Перевіряємо текст
        cy.contains("Завантаження...").should("be.visible");
    });

    // Перевірка для неавторизованого користувача
    it("Має відображати дефолтний заголовок та прохання увійти (для гостей)", () => {
        cy.mount(
            <MountWithAuth user={null}>
                <UserPage />
            </MountWithAuth>
        );

        // Перевіряємо заголовок
        cy.contains("beauty").should("be.visible");

        // Перевіряємо наявність повідомлення про заборону
        cy.contains("Акаунт").should("be.visible");
        cy.contains("увійдіть до акаунту").should("be.visible");

        // Перевіряємо редірект на логін
        cy.contains("a", "увійдіть до акаунту").click();
        cy.contains("Login Page").should("be.visible");
    });

    // Перевірка для авторизованого користувача
    it("Має відображати ім'я користувача, галерею та кнопку виходу", () => {
        const testUser = { userName: "Oksana", email: "oksana@test.com" };
        const logoutSpy = cy.stub().as("logoutSpy");

        // Оскільки на сторінці є UserPhotosGallery, яка робить запит,
        // ми повинні його перехопити, щоб не було помилок в консолі
        cy.intercept("GET", "**/user-photos", { body: { photos: [] } });

        cy.mount(
            <MountWithAuth user={testUser} logoutSpy={logoutSpy}>
                <UserPage />
            </MountWithAuth>
        );

        // Перевіряємо, що в заголовку відображається ім'я юзера
        cy.contains(testUser.userName).should("be.visible");

        // Перевіряємо, що з'явилася галерея (або її заглушка, якщо фото немає)
        // Текст "У вас ще немає фото" з'являється, коли UserPhotosGallery отримує порожній масив
        cy.contains("У вас ще немає фото").should("be.visible");

        // Перевіряємо наявність кнопки виходу
        cy.contains("button", "вийти").should("be.visible");
    });

    // Перевірка виходу
    it("Має викликати функцію logout при кліку на кнопку 'вийти'", () => {
        const testUser = { userName: "User" };
        const logoutSpy = cy.stub().as("logoutSpy");

        // Мокуємо запит галереї
        cy.intercept("GET", "**/user-photos", { body: { photos: [] } });

        cy.mount(
            <MountWithAuth user={testUser} logoutSpy={logoutSpy}>
                <UserPage />
            </MountWithAuth>
        );

        // Клікаємо на кнопку виходу
        cy.contains("button", "вийти").click();

        // Перевіряємо, що функція logout з контексту була викликана
        cy.get("@logoutSpy").should("have.been.called");
    });
});