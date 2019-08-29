import styled from 'styled-components';

type TButtonProps = {
  outline?: boolean;
};

export default styled.button<TButtonProps>`
  min-width: 7rem;
  padding: 0.5em;
  border-radius: 30px;
  background-color: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  font-weight: 400;
  letter-spacing: 0.51px;
  transition: 0.05s;
  white-space: nowrap;
  pointer-events: auto;

  :hover {
    opacity: 0.95;
    cursor: pointer;
  }

  :active {
    transform: scale(1.05);
  }
`;
