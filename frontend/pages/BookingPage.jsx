import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import TitleTexts from "../components/TitleTexts";
import BookingForm from "../forms/BookingForm";
import FormSection from "../components/layouts/FormSection";
import UnauthorizedMessage from "../components/typography/UnauthorizedMessage";
import { useAuth } from "../store/AuthContex";

function BookingPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/login", { state: { prev: "/booking" } });
  };

  if (loading) return <div>Завантаження...</div>;

  return (
    <>
      <Menu currentPage="booking" />
      <TitleTexts text="booking" />

      {!user ? (
        <UnauthorizedMessage>
          <h3>Запис на зйомку</h3>
          <p>
            будь ласка, <a onClick={handleRedirect}>увійдіть до акаунту</a>,
            дякую
          </p>
        </UnauthorizedMessage>
      ) : (
        <FormSection>
          <BookingForm />
        </FormSection>
      )}
    </>
  );
}

export default BookingPage;
