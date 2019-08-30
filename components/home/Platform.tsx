import styled from 'styled-components';
import Section from '@/components/Section';
import Title from '../Title';
import { getRelativePath } from '@/utils';

const Wrapper = styled.div`
  width: 92%;
  height: calc(100% - 10rem);
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled(Title)`
  margin-top: 1rem;
  text-align: center;
`;

const ImageWrapper = styled.div`
  height: 100%;
  position: relative;
`;

const DesktopImg = styled.img`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 60%;
  max-height: 100%;
  transform: translate3d(-50%, 0, 0);
`;

const PhoneImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 9%;
  width: 9.25rem;
`;
const TabImg = styled.img`
  position: absolute;
  bottom: 0;
  width: 17.8rem;
  right: 3%;
`;

const Platform = () => {
  return (
    <Section alignItems="center" justifyContent="center" fullscreen={true}>
      <Wrapper>
        <StyledTitle>
          跨平台、全適應裝置應用
          <br />
          讓您的產品隨心所欲地發布
        </StyledTitle>
        <ImageWrapper>
          <DesktopImg src={getRelativePath('/static/images/desktop.png')} />
          <PhoneImg src={getRelativePath('/static/images/phone.png')} />
          <TabImg src={getRelativePath('/static/images/tab.png')} />
        </ImageWrapper>
      </Wrapper>
    </Section>
  );
};

export default Platform;
