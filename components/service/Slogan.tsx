import Section from '../Section';
import styled from 'styled-components';
import Title from '../Title';
import ContactUsButton from '../ContactUsButton';

const StyledTitle = styled(Title)`
  background-image: linear-gradient(to right, #2b670f, #ffcc00);
  font-family: PingFangTC;
  max-width: 973px;
  font-size: 48px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 2.4px;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 131px;
`;

export default () => (
  <Section fullscreen={true}>
    <StyledTitle>
      我們擅長把您的資料轉化成精準的視覺呈現，客製化您的情境圖表。並且開發「智慧商業決策系統」一鍵管理內部數據流，幫助傳統企業節省成本超過50%！
    </StyledTitle>
    <ContactUsButton />
  </Section>
);
