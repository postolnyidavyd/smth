import React from "react";
import RadioButton from "./RadioButton";

describe("<RadioButton/>", () => {
    // Перевірка відображення тексту лейбла
    it("Має відображати переданий текст лейбла", () => {
        const testLabel = "Вибір 1";

        cy.mount(<RadioButton label={testLabel} name="test-group" />);

        // Перевіряємо, що текст лейбла видимий
        cy.contains(testLabel).should("be.visible");
    });

    // Перевірка інтерактивності та зміни стану
    it("Має ставати checked при кліку на лейбл", () => {
        // Монтуємо компоненту (value обов'язкове для радіо кнопок)
        cy.mount(<RadioButton label="Click Me" value="opt1" name="group1" />);

        // click - клікаємо по лейблу (оскільки інпут прихований, ми взаємодіємо з обгорткою)
        cy.get("label").click();

        // be.checked - перевіряємо, що прихований радіо-інпут отримав статус checked
        cy.get('input[type="radio"]').should("be.checked");
    });

    // Перевірка виклику callback-функції
    it("Має викликати onChange при виборі", () => {
        const onChangeSpy = cy.stub().as("onChangeSpy");

        cy.mount(
            <RadioButton
                label="Select"
                value="val1"
                name="group1"
                onChange={onChangeSpy}
            />
        );

        // Клікаємо по лейблу
        cy.contains("Select").click();

        // Перевіряємо, що функція була викликана
        cy.get("@onChangeSpy").should("have.been.called");
    });

    // Перевірка початкового стану (якщо передано checked=true)
    it("Має бути вибраним за замовчуванням, якщо передано проп checked", () => {
        cy.mount(
            <RadioButton
                label="Checked Option"
                value="opt2"
                name="group1"
                checked={true}
                onChange={() => {}}
            />
        );

        // Перевіряємо, що інпут відразу має статус checked
        cy.get('input[type="radio"]').should("be.checked");
    });

    // Перевірка стилів курсору
    it("Має мати курсор pointer для кращого UX", () => {
        cy.mount(<RadioButton label="Style Test" name="g1" />);

        // have.css - перевіряємо стиль курсору на лейблі
        cy.get("label").should("have.css", "cursor", "pointer");
    });
});