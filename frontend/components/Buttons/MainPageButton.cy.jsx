import React from "react";
import ButtonMain from "./MainPageButton.jsx";

// describe - це група тестів, яка описує компонент або функціональність
describe("<ButtonMain/>", () => {
    // Перевірка коректного відображення тексту в кнопці
    it("Має коректно відображати наданий текст", () => {
        const testText = "Детальніше";

        // Монтуємо компоненту з переданим текстом
        cy.mount(<ButtonMain text={testText} />);

        // get - отримуємо елемент кнопки
        // should('be.visible') - перевіряємо, що елемент видимий для користувача
        cy.get("button").should("be.visible");

        // contain - перевіряємо, що елемент містить очікуваний текст
        cy.get("button").should("contain", testText);
    });

    // Перевірка реакції на клік
    it("Має викликати функцію onClick при кліку", () => {
        // cy.stub() - створює функцію-шпигун яка слідкує за тим чи її викликали
        // as('clickHandler') - дає псевдонім цьому шпигуну
        const onClickSpy = cy.stub().as("clickHandler");

        // Монтуємо компоненту, передаючи шпигуна у пропс onClick
        cy.mount(<ButtonMain text="Клік" onClick={onClickSpy} />);

        // click - стандартна команда для імітації кліку лівою кнопкою миші
        cy.get("button").click();

        // get('@clickHandler') - звертаємось до нашого шпигуна через
        // have.been.calledOnce - стверджуємо, що функція спрацювала рівно один раз
        cy.get("@clickHandler").should("have.been.calledOnce");
    });

    // Перевірка базових стилів
    it("Має мати прозорий фон за замовчуванням", () => {
        cy.mount(<ButtonMain text="Стиль" />);

        // have.css - перевіряє значення CSS властивості
        cy.get("button").should(
            "have.css",
            "background-color",
            "rgba(0, 0, 0, 0)"
        );
    });

    // Перевірка візуального ефекту при наведенні миші
    it("Має змінювати колір фону на світло-сірий при наведенні", () => {
        cy.mount(<ButtonMain text="Hover Effect" />);

        // realHover - команда з плагіна, яка емулює справжній рух миші
        cy.get("button").realHover();

        // Перевіряємо, що фон змінився
        cy.get("button").should(
            "have.css",
            "background-color",
            "rgba(245, 245, 245)"
        );
    });
});