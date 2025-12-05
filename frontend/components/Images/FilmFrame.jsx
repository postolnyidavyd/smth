import React from "react";
import styled from "styled-components";

const Frame = styled.div`
  position: relative;
  background: #181818;
  border-radius: 1.2rem;
  overflow: hidden;
  margin: 1rem 0;

  & img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 7;
    object-fit: cover;
    border-radius: 1.2rem;
  }
`;

const FilmFrame = ({ src, alt = "Filmroll image" }) => {
  return (
    <Frame>
      <img src={src} alt={alt} />
    </Frame>
  );
};

export default FilmFrame;