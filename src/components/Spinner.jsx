import styled, { keyframes } from 'styled-components';
import theme from '../styles/theme';

const Spinner = () => {
  return <StContainer />;
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StContainer = styled.div`
  position: relative;
  margin: 100px auto;
  width: 150px;
  height: 150px;
  border: 4px solid var(--color-gray7);
  border-radius: 50%;
  border-top-color: var(--color-primary);
  animation: ${spin} 1s ease-in-out infinite;

  @media ${theme.device.tablet} {
    width: 100px;
    height: 100px;
    border-width: 2px;
  }
`;

export default Spinner;
