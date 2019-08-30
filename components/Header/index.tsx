import { SFC, useMemo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Button from '@/components/Button';
import { media } from '@/utils/theme';

import LogoTitle from './LogoTitle';
import useWindowScroll from '@/hooks/useWindowScroll';

const Container = styled.header<{ hideUp: boolean }>`
  will-change: transform;
  position: fixed;
  z-index: ${p => p.theme.z.high};
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  padding: 5px 4%;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 0.5px #979797;
  background-color: ${p => p.theme.backgroundColor};
  transition: all 0.3s ease-in;
  transform: ${p => (p.hideUp ? 'translateY(-100%)' : 'none')};

  ${media('desktop')} {
    height: 54px;
  }
  ${media('largeDesktop')} {
    height: 60px;
  }
`;

const RightWrapper = styled.ul`
  display: flex;
  align-items: center;
`;

const Section = styled.li`
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${p => p.theme.colors.primary};
  letter-spacing: 0.51px;
  &:hover {
    font-weight: 400;
  }
`;

const Header: SFC = () => {
  const { y, oldY } = useWindowScroll();
  const MemoHeader = useMemo(
    () => (
      <Container hideUp={y > 0 && y > oldY}>
        <LogoTitle />
        <RightWrapper>
          <Link href="/service">
            <Section>智慧商業決策方案</Section>
          </Link>
          <Link href="/demo">
            <Button>體驗</Button>
          </Link>
        </RightWrapper>
      </Container>
    ),
    [y > 0 && y > oldY],
  );

  return MemoHeader;
};

export default Header;
