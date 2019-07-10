import styled from 'styled-components';

const Button = styled.button`
  margin: 24px 12px 12px 24px;
  padding: 8px 24px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid #666;
  font-weight: 100;
  color: rgba(0, 217, 255, 0.8);
  letter-spacing: 1px;
  transition: 0.05s;

  :hover {
    transform: scale(1.2);
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }
  :active {
    color: whitesmoke;
    transform: scale(1.1);
  }
`;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 64px 64px 36px 24px;
  background-color: rgba(255, 255, 255, 0.05);
`;

const Info = styled.p<{ large?: boolean }>`
  color: rgba(0, 217, 255, 0.8);
  padding-left: 24px;
  margin: 8px 0;
  font-weight: 100;
  font-size: ${props => (props.large ? '48px' : '18px')};
`;

type TButton = {
  text: string;
  onClick: () => void;
};

type TProps = {
  title: string;
  infos: string[];
  buttonConfigs: TButton[];
};

const Panel: React.FC<TProps> = ({ title, infos, buttonConfigs }) => (
  <Container>
    <Info large={true}>{title}</Info>
    {infos.map(info => (
      <Info key={info}>{info}</Info>
    ))}
    {buttonConfigs.map(config => (
      <Button key={config.text} onClick={config.onClick}>
        {config.text}
      </Button>
    ))}
  </Container>
);

export default Panel;
