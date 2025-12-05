import styled from "styled-components";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.3rem;
`;

const BigPhoto = styled.img`
  width: 70vw;
  height: 70vw;
  object-fit: cover;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #000;
`;

const SmallPhoto = styled.img`
  width: 33vw;
  height: 33vw;
  object-fit: cover;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #000;
`;

const PhotosContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const PhotoGallery = ({ bigSrc, smallSrcs }) => {
  return (
    <ProfileContainer>
      <BigPhoto src={bigSrc} alt="Ксюша" />
      <PhotosContainer>
        {smallSrcs.map((src, index) => (
          <SmallPhoto key={index} src={src} alt="Ксюша" />
        ))}
      </PhotosContainer>
    </ProfileContainer>
  );
};