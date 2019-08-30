import styled from 'styled-components';
import Section from '@/components/Section';
import ContactUsButton from '@/components/ContactUsButton';
import { getRelativePath } from '@/utils';
import theme from '@/themes/theme';
import Title from '../Title';
import Description from '../Description';
import { media } from '@/utils/theme';

const Wrapper = styled.div`
  position: relative;
  width: 92%;
  min-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div<{ src: string }>`
  margin-top: 3%;
  position: relative;
  background: url(${p => p.src}) center no-repeat/contain;
  width: 400px;
  height: 400px;
  ${media('largeDesktop')} {
    width: 470px;
    height: 470px;
  }
`;

const StyledTitle = styled(Title)`
  will-change: transform;
  white-space: nowrap;
  position: absolute;
  color: ${p => p.theme.colors.white};
  left: 50%;
  transform: translateX(-50%);
  top: 90px;
  ${media('largeDesktop')} {
    top: 104px;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Team = () => {
  return (
    <Section justifyContent="center" alignItems="center" fullscreen={true}>
      <Wrapper>
        <TitleWrapper src={getRelativePath('/static/images/logo-team.svg')}>
          <StyledTitle>專業團隊</StyledTitle>
        </TitleWrapper>
        <InfoWrapper>123 123 132</InfoWrapper>
      </Wrapper>
    </Section>
  );
};

export default Team;
