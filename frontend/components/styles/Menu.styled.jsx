import styled from 'styled-components';

export const MenuContainer = styled.div`
  display: inline-flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 1.9rem;

  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  background: rgba(217, 217, 217, 0.95);

  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  height: auto;

  overflow: auto;
  z-index: 1000;

  padding: 3rem 1rem;
  padding-top: 5rem;

  pointer-events: all;
`;

export const BurgerButton = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0.4rem;
  z-index: 1001;
  background: transparent;
  border: none;
  font-size: 2rem;
`;

export const MenuButton = styled.button`
  color: ${props => props.isActive ? '#000' : 'rgba(0, 0, 0, 0.50)'};
  text-align: left;
  font-family: "Gentium Plus", serif;
  font-size: 1.5rem;
  font-weight: 400;
  background: none;
  border: none;
  display: block;
  font-style: ${props => props.isActive ? 'italic' : 'normal'};
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;