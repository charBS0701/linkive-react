import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  width: 450px;
  flex-direction: column;
  margin-bottom: 16px;
  label {
    font-weight: bold;
    margin-bottom: 8px;
  }
  input {
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    outline: none;
  }
`;


const InputField = (props) => {
    const { placeholder, type, name, value, onChange } = props;
  return (
    <InputWrapper>
      <input
        style={{
            fontSize: "25px",
            padding: "3% 10%"
        }}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default InputField;
