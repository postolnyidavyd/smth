import React from "react";
import EnterButton from "./EnterButton";
// describe - це група тестів, яка описує компонент або функціональність
describe("Компонента EnterButton (Кнопка Увійти)", () => {
  //Перевірка базового відображення та коректного тексту
  it("Має коректно відображати наданий текст", () => {
    const testText = "Увійти до системи";

    // Монтуємо компоненту, передаючи необхідний пропс
    cy.mount(<EnterButton text={testText} />);

    // перевіряємо що кнопка існує в DOM
    // get - отримуємо елемент за селектором
    //should - твердження для перевірки стану елемента, contain - перевіряє наявність тексту, exist - перевіряє існування елемента
    cy.get("button").should("exist");

    // Перевіряємо, що кнопка містить очікуваний текст

    cy.get("button").should("contain", testText);
  });
  // Коли текст порожній
  it('Має відображатися, навіть якщо пропс "text" порожній', () => {
    cy.mount(<EnterButton text="" />);

    cy.get("button").should("exist");

    // Перевіряємо, що кнопка не містить тексту
    // not.have.text - перевіряє що текст відсутній
    cy.get("button").should("not.have.text");
  });

  it("Має бути інтерактивною (не заблокованою)", () => {
    cy.mount(<EnterButton text="Кнопка" />);

    // Перевіряємо, що кнопка не має атрибута 'disabled'
    cy.get("button").should("not.be.disabled");

    // Перевіряємо, що елемент є видимим і доступним для кліку
    cy.get("button").should("be.visible");
  });

  //Перевірка візуального відгуку при натисканні active
  it("Має відображати візуальний відгук (активний стан) при натисканні", () => {
    cy.mount(<EnterButton text="Натиснути" />);

    // Імітуємо натискання кнопки
    // realMouseDown - команда з плагіна cypress-real-events для симуляції реального натискання кнопки миші
    cy.get("button").realMouseDown();

    // Перевіряємо, що кнопка має стиль трансформації при натисканні
    cy.get("button").should("have.css", "transform").and("not.equal", "none");

    // Імітуємо відпускання кнопки
    // realMouseUp - команда з плагіна cypress-real-events для симуляції реального відпускання кнопки миші
    cy.get("button").realMouseUp();

    // Перевіряємо, що стиль трансформації повернувся до початкового стану
    cy.get("button").should("have.css", "transform", "none");
  });
});
