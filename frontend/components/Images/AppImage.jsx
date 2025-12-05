import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledImage = styled.img`
  width: 12vw;
  height: 12vw;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid #000; 
`;

const AppImage = ({ images }) => (
  <Wrapper>
    {images.map((image, index) => (
      <StyledImage
        key={index}
        src={image.src}
        alt={image.alt}
      />
    ))}
  </Wrapper>
);

export default AppImage;