import styled from 'styled-components';

export default styled.h2<{
  focus?: boolean;
}>`
  font-size: 3rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 1rem;
  letter-spacing: 2.4px;
  line-height: 1.3;
  transition: 1s;
  transform: ${props =>
    props.focus === undefined || props.focus ? 'intial' : 'translateY(-30px)'};
  opacity: ${props => (props.focus === undefined || props.focus ? '1' : '0')};
`;
