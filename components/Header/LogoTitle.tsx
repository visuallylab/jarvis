import styled from 'styled-components';
import { FC } from 'react';
import { getRelativePath } from '@/utils';
import { Router } from '@/i18n';

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
`;

const Logo = styled.img`
  height: 95%;
`;

const Title = styled.p<{ mode: 'light' | 'dark' }>`
  margin-left: 0.8rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: ${p =>
    p.mode === 'light' ? p.theme.colors.primary : p.theme.colors.white};
  font-size: ${p => p.theme.fontSize.big};
`;

type TProps = {
  title?: string;
  mode: 'light' | 'dark';
};

const LogoTitle: FC<TProps> = ({ title = 'VISUALLYLAB', mode }) => {
  return (
    <Wrapper onClick={() => Router.push('/')}>
      <Logo
        src={getRelativePath(
          `/static/logo${mode === 'light' ? '' : '-white'}.svg`,
        )}
      />
      <Title mode={mode}>{title}</Title>
    </Wrapper>
  );
};
export default LogoTitle;
