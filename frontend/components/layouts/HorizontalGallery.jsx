import React from "react";
import styled from "styled-components";

import { useFetchData } from "../../hooks/useFetchData";

const GalleryWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  align-self: stretch;
  overflow-x: auto;
  padding: 1rem 0;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

export const GalleryImage = styled.img`
  width: 70vw;
  height: 70vw;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #000;
  scroll-snap-align: start;
  user-select: none;
  -webkit-user-drag: none;
`;


export const HorizontalGallery = ({ type, alt }) => {

  const { data, loading, error } = useFetchData("images");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const images = data.images[type];


  return (
    <GalleryWrapper>
      {images.map((imgName, index) => (
        <GalleryImage
          key={index}
          src={`http://localhost:3000/${images[index]}`}
          alt={alt}
        />
      ))}
    </GalleryWrapper>
  );
};


