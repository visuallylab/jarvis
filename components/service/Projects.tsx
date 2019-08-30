import Section from '../Section';
import styled from 'styled-components';
import SubTitle from '../SubTitle';

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 208px;
`;
const Icon = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 38px;
`;

const StyledSubTitle = styled(SubTitle)`
  flex-basis: 100%;
  text-align: center;
  margin-top: 77px;
  margin-bottom: 27px;
`;

export default () => (
  <Section fullscreen={true}>
    <ContentWrapper>
      <StyledSubTitle style={{ flexBasis: '100%', textAlign: 'center' }}>
        社會影響力專案
      </StyledSubTitle>
      <Row>
        <Icon srcSet="/static/images/tainan-stat.png 1x, /static/images/tainan-stat@2x.png 2x, /static/images/tainan-stat@3x.png 3x" />
        <Icon srcSet="/static/images/taiwan-stat.png 1x, /static/images/taiwan-stat@2x.png 2x, /static/images/taiwan-stat@3x.png 3x" />
        <Icon srcSet="/static/images/minedia.png 1x, /static/images/minedia@2x.png 2x, /static/images/minedia@3x.png 3x" />
        <Icon srcSet="/static/images/instants.png 1x, /static/images/instants@2x.png 2x, /static/images/instants@3x.png 3x" />
      </Row>
    </ContentWrapper>
  </Section>
);
