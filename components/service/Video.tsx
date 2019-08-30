import Section from '../Section';
import styled from 'styled-components';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Description from '../Description';
import ContactUsButton from '../ContactUsButton';

const Video = styled.video`
  max-width: 1326px;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 104px;
  left: 66px;
`;

const StyledTitle = styled(Title)`
  width: 400px;
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
  max-width: 486px;
`;

export default () => (
  <Section style={{ position: 'relative' }} fullscreen={true}>
    <Video />
    <ContentWrapper>
      <SubTitle>自動化系統處理與回報</SubTitle>
      <StyledTitle>即時動態分析， 掌握最新狀況。</StyledTitle>
      <StyledDescription>
        即時、動態式資料分析呈現，系統自動回報警示，協助企業在第一時間掌握情況。
      </StyledDescription>
      <ContactUsButton />
    </ContentWrapper>
  </Section>
);
