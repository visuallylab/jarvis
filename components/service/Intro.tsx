import styled, { keyframes } from 'styled-components';
import Section from '../Section';
import { media } from '@/utils/theme';
import { getRelativePath } from '@/utils';

const Title = styled.h1`
  margin: 4rem 0 2rem;
  font-size: 5rem;
  letter-spacing: 4px;
  font-weight: bold;
  background-image: linear-gradient(to right, #2b670f, #ffcc00);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const Description = styled.p`
  font-weight: 500;
  letter-spacing: 0.51px;
  font-size: ${p => p.theme.fontSize.big};
  width: 70%;
  text-align: center;
  line-height: normal;
  ${media('desktop')} {
    width: 588px;
  }
`;

const rotateKeyFrames = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Img = styled.img`
  height: 45%;
  margin: 2rem 0;
  animation: ${rotateKeyFrames} 60s infinite linear;
`;

export default () => (
  <Section fullscreen={true}>
    <Title>
      體驗
      <br />
      數據流動的極致美好
    </Title>
    <Description>
      結合人工智慧與大數據分析，協助企業打造流動式的數據解決方案，精準呈現必要資訊，快速做出決策。
    </Description>
    <Img src={getRelativePath('/static/images/service-intro.svg')} />
  </Section>
);
