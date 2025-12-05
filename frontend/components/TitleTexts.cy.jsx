import React from "react";
import TitleTexts from "./TitleTexts";

// describe - це група тестів, яка описує компонент або функціональність
describe("<TitleTexts/>", () => {
  // Перевірка відображення тексту
  it("Має відображати переданий текст", () => {
    const testText = "ТЕСТОВИЙ ТЕКСТ";

    cy.mount(<TitleTexts text={testText} />);

    // Перевіряємо, що текст присутній на сторінці і видимий
    cy.contains(testText).should("be.visible");
  });

  // Перевірка ефекту повторення (згідно коду текст дублюється 5 разів)
  it("Має рендерити текст 5 разів для створення ефекту", () => {
    const testText = "REPEAT";

    cy.mount(<TitleTexts text={testText} />);

    // Знаходимо контейнер через текст і рахуємо кількість дочірніх елементів
    // have.length - перевіряємо, що всього 5 елементів з текстом
    cy.contains(testText).parent().children().should("have.length", 5);
  });

  // Перевірка градієнту прозорості
  it("Має застосовувати спадаючу прозорість до останніх елементів", () => {
    cy.mount(<TitleTexts text="Opacity Test" />);

    // last - беремо останній елемент зі списку
    // Перевіряємо CSS властивість opacity
    cy.contains("Opacity Test")
      .parent()
      .children()
      .last()
      .should("have.css", "opacity", "0.2");
  });
});
