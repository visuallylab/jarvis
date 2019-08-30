import Section from '../Section';
import styled from 'styled-components';
import Title from '../Title';

const StyledTitle = styled(Title)`
  background-image: linear-gradient(to right, #2b670f, #ffcc00);
  line-height: normal;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0px;
  font-family: PingFangTC;
  font-size: 80px;
`;
const P = styled.p`
  max-width: 588px;
  font-family: PingFangTC;
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.51px;
  text-align: center;
  color: #ffffff;
  margin-top: 24px;
`;

const Img = styled.img`
  max-width: 548px;
  height: 454px;
  object-fit: contain;
  margin-top: 46px;
  margin-bottom: 257px;
`;

export default () => (
  <Section>
    <StyledTitle style={{ marginTop: '114px' }}>體驗</StyledTitle>
    <StyledTitle>數據流動的極致美好</StyledTitle>
    <P>
      結合人工智慧與大數據分析，協助企業打造流動式的數據解決方案，精準呈現必要資訊，快速做出決策。
    </P>
    <Img srcSet="/static/images/service-intro.png 1x, /static/images/service-intro@2x.png 2x, /static/images/service-intro@3x.png 3x" />
  </Section>
);
