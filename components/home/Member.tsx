import styled from 'styled-components';
import { FC } from 'react';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2%;

  &:first-child {
    top: -3rem;
  }

  &:nth-child(3n) {
    top: -3rem;
  }

  &:nth-child(3n - 1) {
    top: 2rem;
  }
`;

const Avatar = styled.div<{ src: string }>`
  width: 13.5rem;
  height: 13.5rem;
  border-radius: 50%;
  background: ${p => p.theme.colors.grey} url(${p => p.src}) no-repeat
    center/cover;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  white-space: pre-wrap;
  font-size: ${p => p.theme.fontSize.bigger};
  font-weight: 500;
  letter-spacing: 0.61px;
`;

const Name = styled.p`
  font-size: ${p => p.theme.fontSize.bigger};
  font-weight: 500;
  letter-spacing: 0.61px;
  margin: 1rem 0 0.75rem;
`;

const JobDes = styled.p`
  font-size: ${p => p.theme.fontSize.bigger};
  text-align: center;
  letter-spacing: 0.61px;
  line-height: normal;
`;

export type TMember = {
  title: string;
  name: string;
  avatar: string;
  jobDescription: string;
};

type TProps = {
  item: TMember;
};

const Member: FC<TProps> = ({ item }) => {
  return (
    <Wrapper>
      <Avatar src="https://unsplash.it/500/500?search=face" />
      <Title>{item.title}</Title>
      <Name>{item.name}</Name>
      <JobDes>{item.jobDescription}</JobDes>
    </Wrapper>
  );
};

export default Member;
