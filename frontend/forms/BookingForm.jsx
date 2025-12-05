import { useState, useRef } from "react";
import InputField from "../components/Inputs/InputField";
import TextareaField from "../components/Inputs/TextareaField";
import EnterButton from "../components/Buttons/EnterButton";
import ErrorMessage from "../components/typography/ErrorMessage";
import FileUpload from "../components/Inputs/FileUpload";

import Modal from "../components/Modal";
import { useFormPostData } from "../hooks/useFormPostData";

const BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [modalData, setModalData] = useState({
    title: "",
    message: "",
  });
  const { sendFormData, loading, error } = useFormPostData();

  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const instagram = useRef();
  const people = useRef();
  const location = useRef();
  const references = useRef();
  const wishes = useRef();

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = files ? Array.from(files) : [];
    setSelectedFiles(fileArray);
  };

  const showErrorModal = (title, message) => {
    setModalData({ title, message });
    setShowModal(true);
  };

  const hideErrorModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!name.current?.value.trim()) return;
    if (!email.current?.value.includes("@")) return;
    if (phone.current?.value.trim().length !== 9) return;
    if (!instagram.current?.value.trim()) return;

    const formData = new FormData();

    formData.append("name", name.current?.value.trim());
    formData.append("email", email.current?.value.trim());
    formData.append("phone", phone.current?.value.trim());
    formData.append("instagram", instagram.current?.value.trim());
    formData.append("people", people.current?.value);
    formData.append("location", location.current?.value);
    formData.append("wishes", wishes.current?.value.trim());

    const files = references.current?.files;
    const fileArray = files ? Array.from(files) : [];

    fileArray.forEach((file) => {
      formData.append(`files`, file);
    });

    console.log("Дані форми:", formData);
    try {
      showErrorModal("Відправляємо дані!", "Зачекайте, будь ласка...");
      const result = await sendFormData("/send-booking", formData);
      
      console.log("Успішно відправлено:", result);
      setShowModal(false);
      showErrorModal("Форму успішно відправлено!", "");
      setSelectedFiles([]);
      if (references.current) {
        references.current.value = "";
      }
    } catch (err) {
      console.error("Помилка відправки:", err);
      showErrorModal("Виникла помилка відправки!", err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
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

          <InputField
            label="телефон"
            name="phone"
            placeholder="XXXXXXXXX"
            ref={phone}
          />
          {submitted && phone.current?.value.trim().length !== 9 && (
            <ErrorMessage>Введіть номер телефону</ErrorMessage>
          )}
        </div>

        <div>
          <InputField
            label="instagram"
            name="instagram"
            placeholder="@красуня_123"
            ref={instagram}
          />
          {submitted && !instagram.current?.value.trim() && (
            <ErrorMessage>Введіть інстаграм</ErrorMessage>
          )}
        </div>

        <div>
          <InputField
            label="кількість людей"
            name="people"
            type="number"
            min="1"
            ref={people}
          />
          {submitted && !people.current?.value && (
            <ErrorMessage>Введіть кількість людей</ErrorMessage>
          )}
        </div>

        <div>
          <InputField
            label="локація"
            name="location"
            placeholder="студія-'Назва'/ надворі-адрес"
            ref={location}
          />
          {submitted && !location.current?.value.trim() && (
            <ErrorMessage>Введіть місце проведення зйомки</ErrorMessage>
          )}
        </div>

        <FileUpload
          label="референси"
          ref={references}
          onChange={handleFileChange}
        />

        {selectedFiles.length > 0 && (
          <div
            style={{ marginBottom: "2rem", fontSize: "0.9rem", color: "#666" }}
          >
            Обрано файлів: {selectedFiles.length}
            {selectedFiles.map((file, index) => (
              <div key={index}>- {file.name}</div>
            ))}
          </div>
        )}

        <TextareaField
          label="Додаткові побажання..."
          name="wishes"
          placeholder="Розкажіть детальніше про ідею зйомки..."
          ref={wishes}
        />

        <EnterButton text="записатись" type="submit" />
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

export default BookingForm;
