import styled from 'styled-components';


export const TextsContainer = styled.div`
  display: flex;
  padding-bottom: 50px;
  flex-direction: column;
  align-items: center;
  gap: -90px;

  /* Адаптація для телефонів */
  @media (max-width: 768px) {
    padding-bottom: 30px;
    gap: -40px;
  }

  /* Для дуже маленьких екранів */
  @media (max-width: 480px) {
    padding-bottom: 20px;
    gap: -30px;
  }
`;

export const OutlinedText = styled.p`
  text-align: center;
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: #000;
  color: transparent;
  font-size: 10rem;
  font-weight: 400;
  margin: -3rem;
  font-family: 'Bungee', sans-serif;
  opacity: ${props => props.opacity || 1};

  /* Адаптація для телефонів */
  @media (max-width: 768px) {
    font-size: 4rem;
    margin: -1rem;
    -webkit-text-stroke-width: 2px;
  }

  /* Для дуже маленьких екранів */
  @media (max-width: 480px) {
    font-size: 3rem;
    margin: -0.8rem;
    -webkit-text-stroke-width: 1.5px;
  }
`;

export const SolidText = styled.p`
  text-align: center;
  color: #000;
  font-size: 10rem;
  font-weight: 400;
  margin: -3rem;
  font-family: 'Bungee', sans-serif;

  @media (max-width: 768px) {
    font-size: 4rem;
    margin: -1rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
    margin: -0.8rem;
  }
`;