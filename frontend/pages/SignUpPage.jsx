import TitleTexts from "../components/TitleTexts";
import AuthContainer from "../components/layouts/FormSection";
import AuthForm from "../forms/AuthForm";

function SignUpPage() {
  return (
    <>
      <TitleTexts text="sign up" />
      <AuthContainer>
        <AuthForm type="signup" />
      </AuthContainer>
    </>
  );
}

export default SignUpPage;