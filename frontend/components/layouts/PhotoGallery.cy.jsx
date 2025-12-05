import React from "react";
import { PhotoGallery } from "./PhotoGallery";

describe("<PhotoGallery/>", () => {
    // Перевірка відображення великого фото
    it("Має відображати велике фото з правильним src та alt", () => {
        const testBigSrc = "main-photo.jpg";

        // Монтуємо компоненту з пустим масивом маленьких фото
        cy.mount(<PhotoGallery bigSrc={testBigSrc} smallSrcs={[]} />);

        // Перевіряємо перше зображення (BigPhoto)
        cy.get("img").first()
            .should("have.attr", "src", testBigSrc)
            .and("have.attr", "alt", "Ксюша");
    });

    // Перевірка рендерингу списку маленьких фото
    it("Має рендерити правильну кількість маленьких фото", () => {
        const testSmallSrcs = ["small1.jpg", "small2.jpg"];

        cy.mount(<PhotoGallery bigSrc="big.jpg" smallSrcs={testSmallSrcs} />);

        // Загалом має бути 3 зображення (1 велике + 2 маленьких)
        cy.get("img").should("have.length", 3);

        // Перевіряємо src першого маленького фото (індекс 1, бо 0 - це велике фото)
        cy.get("img").eq(1).should("have.attr", "src", testSmallSrcs[0]);
    });

    // Перевірка стилів макету
    it("Має мати правильну структуру Flexbox (колонка для головного, рядок для малих)", () => {
        cy.mount(<PhotoGallery bigSrc="big.jpg" smallSrcs={["s1.jpg", "s2.jpg"]} />);

        // Перевіряємо головний контейнер
        // Знаходимо його як батьківський елемент першого зображення
        cy.get("img").first().parent()
            .should("have.css", "display", "flex")
            .and("have.css", "flex-direction", "column");

        // Перевіряємо контейнер маленьких фото
        // Знаходимо його як батьківський елемент другого зображення
        cy.get("img").eq(1).parent()
            .should("have.css", "display", "flex")
            .and("have.css", "flex-direction", "row")
            .and("have.css", "justify-content", "space-between");
    });

    // Перевірка стилів самих зображень
    it("Має мати задані стилі для зображень (border-radius, object-fit)", () => {
        cy.mount(<PhotoGallery bigSrc="test.jpg" smallSrcs={[]} />);

        // Перевіряємо стилі великого фото
        cy.get("img").first()
            .should("have.css", "object-fit", "cover")
            .and("have.css", "border-radius", "10px");
    });
});