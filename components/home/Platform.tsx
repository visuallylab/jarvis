import styled from 'styled-components';
import Section from '@/components/Section';
import Title from '../Title';
import { getRelativePath } from '@/utils';
import { useRef, useEffect, useState } from 'react';

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
  height: 100%;
  transform: translate3d(-50%, 0, 0);
`;

const PhoneImg = styled.img<{ x: number }>`
  position: absolute;
  bottom: 0;
  left: ${p => (p.x ? `${p.x - 50}px` : '15%')};
  height: 50%;
  transform: translateX(-50%);
`;
const TabImg = styled.img<{ x: number }>`
  position: absolute;
  bottom: 0;
  height: 70%;
  left: ${p => (p.x ? `${p.x}px` : '80%')};
  transform: translateX(-50%);
`;

const Platform = () => {
  const desktopRef = useRef<HTMLImageElement | null>(null);
  const [position, setPosition] = useState({
    phoneX: 0,
    tabX: 0,
  });

  useEffect(() => {
    const handlePosition = () => {
      if (desktopRef.current) {
        setPosition({
          phoneX: desktopRef.current.getBoundingClientRect().left,
          tabX: desktopRef.current.getBoundingClientRect().right,
        });
      }
    };
    handlePosition();
    window.addEventListener('resize', handlePosition);
    return () => {
      window.removeEventListener('resize', handlePosition);
    };
  }, []);

  return (
    <Section alignItems="center" justifyContent="center" fullscreen={true}>
      <Wrapper>
        <StyledTitle>
          跨平台、全適應裝置應用
          <br />
          讓您的產品隨心所欲地發布
        </StyledTitle>
        <ImageWrapper>
          <DesktopImg
            ref={desktopRef}
            src={getRelativePath('/static/images/desktop.png')}
          />
          <PhoneImg
            x={position.phoneX}
            src={getRelativePath('/static/images/phone.png')}
          />
          <TabImg
            x={position.tabX}
            src={getRelativePath('/static/images/tab.png')}
          />
        </ImageWrapper>
      </Wrapper>
    </Section>
  );
};

export default Platform;
