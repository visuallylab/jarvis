import styled from 'styled-components';
export default styled.button`
  margin: 6px 3px 3px 6px;
  padding: 8px 24px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid #666;
  font-weight: 100;
  color: rgba(0, 217, 255, 0.8);
  letter-spacing: 1px;
  transition: 0.05s;
  pointer-events: auto;
  :focus {
    outline: 0;
  }

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
