import Section from '../Section';
import styled from 'styled-components';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Description from '../Description';
import ContactUsButton from '../ContactUsButton';
import { useVideController } from '../../hooks/useVideController';

const Video = styled.video`
  max-width: 1326px;
  object-fit: contain;
  opacity: 0.6;
`;

const ContentWrapper = styled.div`
  position: absolute;
  max-width: 1326px;
  width: 100%;
  top: 0;
  padding-top: 104px;
  padding-left: 66px;
`;

const StyledTitle = styled(Title)`
  position: relative;
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

const Traffic: React.FC = () => {
  const { isPlaying, container, player } = useVideController();
  return (
    <Section
      ref={container}
      style={{ position: 'relative', marginBottom: '250px' }}
      fullscreen={true}
      focus={isPlaying}
    >
      <Video ref={player} src="/static/videos/traffic.mp4" muted={true} />
      <ContentWrapper>
        <SubTitle focus={isPlaying}>自動化系統處理與回報</SubTitle>
        <StyledTitle focus={isPlaying}>
          即時動態分析， 掌握最新狀況。
        </StyledTitle>
        <StyledDescription focus={isPlaying}>
          即時、動態式資料分析呈現，系統自動回報警示，協助企業在第一時間掌握情況。
        </StyledDescription>
        <ContactUsButton />
      </ContentWrapper>
    </Section>
  );
};

export default Traffic;
