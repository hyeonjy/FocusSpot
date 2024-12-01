import styled from 'styled-components';

const InputText = ({ inputType, inputName, placeholderText, handleChange }) => {
  return <Container type={inputType} name={inputName} placeholder={placeholderText} onChange={handleChange} />;
};

const Container = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border-bottom: 1px solid var(--color-gray5);

  &::placeholder {
    color: var(--color-gray4);
  }
`;

export default InputText;
