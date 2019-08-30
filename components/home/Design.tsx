import styled from 'styled-components';
import Section from '@/components/Section';
import ContactUsButton from '@/components/ContactUsButton';
import { getRelativePath } from '@/utils';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Description from '../Description';

const Wrapper = styled.div<{ src: string }>`
  position: relative;
  width: 92%;
  height: 90%;
  background: url(${p => p.src}) no-repeat center/cover;
  color: white;
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const InfoWrapper = styled.div`
  will-change: transform;
  position: absolute;
  width: 50%;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
`;

const Design = () => {
  return (
    <Section justifyContent="center" alignItems="center" fullscreen={true}>
      <Wrapper src={getRelativePath('/static/images/bg-design.jpg')}>
        <Mask />
        <InfoWrapper>
          <SubTitle>資訊脈絡設計</SubTitle>
          <Title>
            規劃資訊脈絡圖，
            <br />
            幫助您精準呈現訊息。
          </Title>
          <Description>
            討論前期，我們將會與您一起思考，確定策略與目標客群。然後以此基礎來規劃、構思產品的資訊脈絡圖，清楚了解每一項設計與產品的邏輯脈絡。精準呈現所有必要資訊。
          </Description>
          <ContactUsButton />
        </InfoWrapper>
      </Wrapper>
    </Section>
  );
};

export default Design;
