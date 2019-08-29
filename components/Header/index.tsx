import { SFC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Button from '@/components/Button';
import { media } from '@/utils/theme';
import { Router } from '@/i18n';

import LogoTitle from './LogoTitle';

const Container = styled.header`
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

const Header: SFC = () => (
  <Container>
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
);

export default Header;
