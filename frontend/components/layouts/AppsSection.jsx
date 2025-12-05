import styled from "styled-components";
import AppImage from "../Images/AppImage";
import Paragraph from "../typography/Paragraph";

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;



const AppsSection = ({ images, description }) => (
  <SectionWrapper>
    <AppImage images={images} />
    <Paragraph>{description}</Paragraph>
  </SectionWrapper>
);

export default AppsSection;