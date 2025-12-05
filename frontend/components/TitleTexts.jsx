import { TextsContainer, OutlinedText } from './styles/TitleTexts.styled';

function TitleTexts({ text }) {   
    return (
        <TextsContainer>
            <OutlinedText>{text}</OutlinedText>
            <OutlinedText opacity={0.8}>{text}</OutlinedText>
            <OutlinedText opacity={0.6}>{text}</OutlinedText>
            <OutlinedText opacity={0.4}>{text}</OutlinedText>
            <OutlinedText opacity={0.2}>{text}</OutlinedText>
        </TextsContainer>
    )
}

export default TitleTexts