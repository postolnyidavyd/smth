import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import TitleTexts from "../components/TitleTexts";
import UnauthorizedMessage from "../components/typography/UnauthorizedMessage";
import { useAuth } from "../store/AuthContex";
import UserPhotosGallery from "../components/layouts/UserPhotosGallery"
import Heading from "../components/typography/Heading"

function UserPage() {
  const { user, loading } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/login", { state: { prev: "/booking" } });
  };

  const handleClick = () => {
    logout();
  }

  if (loading) return <div>Завантаження...</div>;

  return (
    <>
      <Menu currentPage="userpage" />
      <TitleTexts text={user?.userName || "beauty"} />

      {!user ? (
        <UnauthorizedMessage>
          <Heading>Акаунт</Heading>
          <p>
            будь ласка, <a onClick={handleRedirect}>увійдіть до акаунту</a>,
            дякую
          </p>
        </UnauthorizedMessage>
      ) : (
        <>
            <UserPhotosGallery></UserPhotosGallery>
            <button onClick={handleClick}>
                вийти
            </button>
        </>
      )}
    </>
  );
}

export default UserPage;
