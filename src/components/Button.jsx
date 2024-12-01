import styled from 'styled-components';

const Button = ({ size = 'small', color = 'primary', fill = false, label, handleClick }) => {
  return (
    <Container type="button" $size={size} $color={color} $fill={fill} onClick={handleClick}>
      {label}
    </Container>
  );
};

const Container = styled.button`
  ${({ $size, $color, $fill }) => {
    let minWidth;
    let padding;
    let fontSize;

    switch ($size) {
      case 'big':
        minWidth = '180px';
        padding = '15px 30px 13px';
        fontSize = '15px';
        break;
      case 'small':
        minWidth = '80px';
        padding = '8px 20px 7px';
        fontSize = '13px';
        break;
      default:
        minWidth = '80px';
        padding = '8px 20px 7px';
        fontSize = '13px';
    }

    return `
    min-width: ${minWidth};
    padding: ${padding};
    background-color: ${$fill ? `var(--color-${$color})` : 'var(--color-white)'};
    border: 1px solid var(--color-${$color});
    color: ${$fill ? 'var(--color-white)' : `var(--color-${$color})`};
    font-size: ${fontSize};
    border-radius: 50px;
  `;
  }}
`;

export default Button;
