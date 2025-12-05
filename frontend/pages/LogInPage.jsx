import TitleTexts from "../components/TitleTexts";
import AuthContainer from "../components/layouts/FormSection";
import AuthForm from "../forms/AuthForm";

function LogInPage() {
  return (
    <>
      <TitleTexts text="log in" />
      <AuthContainer>
        <AuthForm type="login" />
      </AuthContainer>
    </>
  );
}

export default LogInPage;