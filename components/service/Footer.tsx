import Section from '../Section';
import Title from '../Title';
import SubTitle from '../SubTitle';
import styled from 'styled-components';
import ContactUsButton from '../ContactUsButton';

const StyledSubTitle = styled(SubTitle)`
  font-family: PingFangTC;
  font-size: 24px;
  font-weight: normal;
`;

const Ul = styled.ul`
  margin-top: 49px;
`;

const Li = styled.li`
  font-family: PingFangTC;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.51px;
  color: #ffffff;
  padding: 0;
`;

const Icon = styled.img``;

const P = styled.p``;

const Img = styled.img``;

export default () => (
  <Section fullscreen={true}>
    <Title>我們期許自己打造的是更貼近人心的產品</Title>
    <StyledSubTitle>
      我們的技術將用來傳遞更多溫暖、更多價值，打造人性化的科技產品。
    </StyledSubTitle>
    <Ul>
      <Li>
        <Icon />
        <P>台北市基隆路一段186號3樓之6</P>
      </Li>
      <Li>
        <Icon />
        <P>contact@visuallylab.com</P>
      </Li>
      <Li>
        <Icon />
        <P>Visually lab</P>
      </Li>
    </Ul>
    <ContactUsButton />
    <Img src="/static/images/bg-ball-stream.svg" />
  </Section>
);
