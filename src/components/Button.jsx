import styled from 'styled-components';

const Button = ({ children, onClick }) => {
  return <Neubutton onClick={onClick}>{children}</Neubutton>;
};

const Neubutton = styled.button`
  background-color: #ffd700;
  color: #000;
  border: 3px solid #000;
  box-shadow: 5px 5px 0px #000;
  padding: 12px 24px;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    transform: translate(4px, 4px);
    box-shadow: 2px 2px 5px #000;
    transition: all 0.2s ease;
  }

  &:active {
    transform: translate(6px, 6px);
    box-shadow: none;
  }
`;

export default Button;
