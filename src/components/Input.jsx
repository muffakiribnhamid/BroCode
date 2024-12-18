import React from 'react';
import styled from 'styled-components';

export function Input({ placeholder, value = '', onChange, type, name, className }) {
  return (
    <StyledInput
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      name={name}
      className={`${className} w-full`}
      onChange={onChange}
    />
  );
}

const StyledInput = styled.input`
  background-color: #ffffff;
  border: 3px solid #000000;
  box-shadow: 5px 5px 0px #000000;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 10px 0;
  width: 300px;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;

  &:focus {
    transform: translate(2px, 2px);
    box-shadow: 3px 3px 0px #000000;
  }

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 3px 3px 0px #000000;
  }

  &::placeholder {
    color: #666666;
    font-weight: 400;
  }
`;