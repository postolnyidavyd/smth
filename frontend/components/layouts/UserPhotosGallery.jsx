import { useState, useEffect } from 'react';
import { GalleryImage } from './HorizontalGallery';
import styled from 'styled-components';

import Paragraph from '../typography/Paragraph';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LoadingText = styled.p`
  text-align: center;
  padding: 40px 0;
`;



export default function UserPhotosGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPhotos = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/user-photos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPhotos(data.photos || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  if (loading) return <LoadingText>Завантажую ваші фото...</LoadingText>;

  if (photos.length === 0) {
    return (
        <Paragraph>У вас ще немає фото</Paragraph>
    );
  }

  return (
    <Container>
      <Grid>
        {photos.map(photo => (
          <GalleryImage
            key={photo.filename}
            src={photo.url}
            alt="фото"
          />
        ))}
      </Grid>
    </Container>
  );
}