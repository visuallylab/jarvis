import { FC } from 'react';
import styled from 'styled-components';
import Section from './Section';
import Title from './Title';
import SubTitle from './SubTitle';
import ContactUsButton from './ContactUsButton';
import { getRelativePath } from '@/utils';

const StyledSection = styled(Section)`
  color: ${p => p.theme.colors.white};
`;

const StyledSubTitle = styled(SubTitle)`
  color: ${p => p.theme.colors.white};
`;

const Ul = styled.ul`
  margin-top: 3rem;
`;

const Li = styled.li`
  font-size: ${p => p.theme.fontSize.bigger};
  font-weight: 400;
  letter-spacing: 0.51px;
  padding: 0;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  border: solid 1px white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 70%;
    height: 70%;
  }
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
`;

const Footer: FC = () => (
  <StyledSection
    fullscreen={true}
    as="footer"
    src={getRelativePath('/static/images/bg-footer.jpg')}
  >
    <Mask />
    <Title>我們期許自己打造的是更貼近人心的產品</Title>
    <StyledSubTitle>
      我們的技術將用來傳遞更多溫暖、更多價值，打造人性化的科技產品。
    </StyledSubTitle>
    <Ul>
      <Li>
        <IconWrapper>
          <img src={getRelativePath('/static/images/home.svg')} />
        </IconWrapper>
        <p>台北市基隆路一段186號3樓之6</p>
      </Li>
      <Li>
        <IconWrapper>
          <img src={getRelativePath('/static/images/mail.svg')} />
        </IconWrapper>
        <a href="contact@visuallylab.com">contact@visuallylab.com</a>
      </Li>
      <Li>
        <IconWrapper>
          <img src={getRelativePath('/static/images/fb.svg')} />
        </IconWrapper>
        <a href="https://www.facebook.com/visuallylab/" target="_blank">
          @visuallylab
        </a>
      </Li>
    </Ul>
    <ContactUsButton color="white" />
  </StyledSection>
);

export default Footer;
