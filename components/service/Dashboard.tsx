import Section from '../Section';
import styled from 'styled-components';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Description from '../Description';
import ContactUsButton from '../ContactUsButton';

const BackgroundImg = styled.img`
  max-width: 100%;
  object-fit: contain;
  opacity: 0.4;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 76px;
  right: 133px;
  text-align: right;
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
  <Section style={{ position: 'relative' }}>
    <BackgroundImg srcSet="/static/images/dashboard.png 1x, /static/images/dashboard@2x.png 2x, /static/images/dashboard@3x.png 3x" />
    <ContentWrapper>
      <SubTitle>管理者的省時最愛</SubTitle>
      <StyledTitle>資料管理看板</StyledTitle>
      <StyledDescription>
        處理企業內部的數據，使之成為一個統一的看板，只呈現重要資訊，隨時監控、定時回報。
      </StyledDescription>
      <ContactUsButton />
    </ContentWrapper>
  </Section>
);
