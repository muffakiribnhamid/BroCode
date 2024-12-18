import React from 'react';
import styled from 'styled-components';

const Button = ({ children, onClick, variant = 'primary', className }) => {
  return (
    <StyledButton onClick={onClick} variant={variant} className={className}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  background-color: ${props => props.variant === 'primary' ? '#ffd700' : props.variant === 'danger' ? '#ff4444' : '#ffffff'};
  color: #000000;
  border: 3px solid #000000;
  box-shadow: 5px 5px 0px #000000;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
  min-width: 120px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 3px 3px 0px #000000;
    background-color: ${props => props.variant === 'primary' ? '#ffc800' : props.variant === 'danger' ? '#ff3333' : '#f0f0f0'};
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: 1px 1px 0px #000000;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: 5px 5px 0px #000000;
    }
  }
`;

export default Button;
