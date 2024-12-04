import styled from 'styled-components';

const InputText = ({ inputType, inputName, placeholderText, handleChange, value }) => {
  return <StContainer type={inputType} name={inputName} id={inputName} placeholder={placeholderText} onChange={handleChange} value={value} />;
};

const StContainer = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border-bottom: 1px solid var(--color-gray5);
  font-size: 15px;

  &::placeholder {
    color: var(--color-gray5);
  }
`;

export default InputText;
