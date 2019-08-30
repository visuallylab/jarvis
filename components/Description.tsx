import styled from 'styled-components';

export default styled.p<{
  focus?: boolean;
}>`
  font-size: ${p => p.theme.fontSize.big};
  letter-spacing: 1px;
  line-height: normal;
  transition: 1s 0.4s;
  transform: ${props =>
    props.focus === undefined || props.focus ? 'intial' : 'translateY(-30px)'};
  opacity: ${props => (props.focus === undefined || props.focus ? '1' : '0')};
`;
