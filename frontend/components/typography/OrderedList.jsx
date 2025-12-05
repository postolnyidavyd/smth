import styled from "styled-components";

const List = styled.ol`
  text-align: left;
  max-width: 700px;
  margin: 2rem auto;
  padding-left: 1.5rem;
  font-size: 1.4rem;
  font-weight: 250;
  line-height: 1.7;
  color: #000;

  li {
    margin-bottom: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding-left: 1rem;
  }
`;

const OrderedList = ({ children }) => <List>{children}</List>;
export default OrderedList;