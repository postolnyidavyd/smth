import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 80%;
`;

const Button = styled.button`
  margin-top: 20px;
`;

export default function Modal({ title, message = "Виникла помилка", onConfirm }) {
  return (
    <Backdrop>
      <ModalBox>
        <h3>{title}</h3>
        <p>{message}</p>
        <Button onClick={onConfirm}>OK</Button>
      </ModalBox>
    </Backdrop>
  );
}