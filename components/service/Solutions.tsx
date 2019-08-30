import Section from '../Section';
import styled from 'styled-components';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Description from '../Description';
import ContactUsButton from '../ContactUsButton';

const BackgroundImg = styled.img`
  width: 100%;
  object-fit: contain;
  opacity: 0.4;
`;

const ContentWrapper = styled.div`
  position: absolute;
  left: 76px;
  top: 133px;
  text-align: left;
`;

const StyledTitle = styled(Title)`
  font-family: PingFangTC;
  font-size: 48px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 2.4px;
  color: #ffffff;
`;

const StyledDescription = styled(Description)`
  max-width: 500px;
`;

export default () => (
  <Section fullscreen={true}>
    <BackgroundImg srcSet="/static/images/fake-demo-jarvis.png 1x, /static/images/fake-demo-jarvis@2x.png 2x, /static/images/fake-demo-jarvis@3x.png 3x" />
    <ContentWrapper>
      <SubTitle>語音智能助理</SubTitle>
      <StyledTitle>語音解決方案：Hey! Jarvis!</StyledTitle>
      <StyledDescription>
        透過語音掌控你的所有動作與決策看板，不再需要動手指。一切皆在幾句話之間完成所有操作。
      </StyledDescription>
      <ContactUsButton />
    </ContentWrapper>
  </Section>
);
