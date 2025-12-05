import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/Inputs/InputField";
import EnterButton from "../components/Buttons/EnterButton";
import SocialButton from "../components/Buttons/SocialButton";
import ErrorMessage from "../components/typography/ErrorMessage";
import AuthSwitchLink from "./AuthSwithLinks";

import { usePostData } from "../hooks/usePostData";

import Modal from "../components/Modal";
import { useAuth } from "../store/AuthContex"

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { login } = useAuth();
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
  });
  const { sendData, loading, error } = usePostData();

  const name = useRef();
  const email = useRef();
  const password = useRef();

  const isLoginPage = type === "login";

  const showErrorModal = (title, message) => {
    setModalData({ title, message });
    setShowModal(true);
  };

  const hideErrorModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    const userName = name?.current?.value || "";
    const userEmail = email.current.value;
    const userPassword = password.current.value;

    if (!isLoginPage && !userName.trim()) return;
    if (!userEmail.includes("@")) return;
    if (userPassword.length < 8) return;

    try {
      if (isLoginPage) {
        const result = await sendData("/login", {
          email: userEmail,
          password: userPassword,
        });
        console.log("Вхід успішний:", result);
        login(result.token, result.user);
        navigate("/", { state: { prev: "/login" } });
      } else {
        const result = await sendData("/register", {
          userName: userName,
          email: userEmail,
          password: userPassword,
        });

        console.log("Реєстрація успішна:", result);
        login(result.token, result.user);
        navigate("/", { state: { prev: "/signup" } });
      }
    } catch (err) {
      console.error("Помилка авторизації:", err);
      if (
        err.message.includes("Невірний email або пароль") ||
        err.message.includes("401")
      ) {
        showErrorModal(
          "Помилка входу",
          `Перевірте правильність email та паролю`
        );
      } else if (err.message.includes("Користувач з таким email вже існує")) {
        showErrorModal(
          "Акаунт вже існує",
          "Користувач з таким email вже зареєстрований. Спробуйте увійти в систему."
        );
      } else if (
        err.message.includes("Користувача не знайдено") ||
        err.message.includes("401")
      ) {
        showErrorModal(
          "Акаунт не знайдено",
          `Користувача не знайдено. Перевірте email або зареєструйтесь.`
        );
      } else {
        showErrorModal("Помилка авторизації", err.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {!isLoginPage && (
          <div>
            <InputField
              label="імʼя"
              name="name"
              placeholder="красуня"
              ref={name}
            />
            {submitted && !name.current?.value.trim() && (
              <ErrorMessage>Введіть ім'я</ErrorMessage>
            )}
          </div>
        )}

        <div>
          <InputField
            label="email"
            name="email"
            type="email"
            placeholder="твій@email.com"
            ref={email}
          />
          {submitted && !email.current?.value.includes("@") && (
            <ErrorMessage>Введіть коректний email</ErrorMessage>
          )}
        </div>

        <div>
          <InputField
            label="пароль"
            name="password"
            type="password"
            placeholder="**********"
            ref={password}
          />
          {submitted && password.current?.value.length < 8 && (
            <ErrorMessage>Пароль має бути мінімум 8 символів</ErrorMessage>
          )}
        </div>
        {error && !showModal && <ErrorMessage>{error}</ErrorMessage>}

        <EnterButton
          text={isLoginPage ? "Увійти" : "Зареєструвати"}
          type="submit"
        />

        <SocialButton provider="Google" />
        <SocialButton provider="Apple" />

        <AuthSwitchLink
          question={isLoginPage ? "не маєш акаунту?" : "вже маєш акаунт?"}
          actionText={isLoginPage ? "Sign up" : "Log In"}
          to={isLoginPage ? "/signup" : "/login"}
        />
      </form>
      {showModal && (
        <Modal
          title={modalData.title}
          message={modalData.message}
          onConfirm={hideErrorModal}
        />
      )}
    </>
  );
};

export default AuthForm;
