import styled from 'styled-components';

export default styled.h3<{
  focus?: boolean;
}>`
  font-weight: 500;
  color: ${p => p.theme.colors.lightGrey};
  font-size: ${p => p.theme.fontSize.big};
  margin-top: 0;
  margin-bottom: 0.5rem;
  letter-spacing: 1.2px;
  transition: 1s 0.4s;
  transform: ${props =>
    props.focus === undefined || props.focus ? 'intial' : 'translateY(-30px)'};
  opacity: ${props => (props.focus === undefined || props.focus ? '1' : '0')};
`;
