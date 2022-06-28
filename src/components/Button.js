import styled from "styled-components";
import AppColors from "../config/colors";

const Button = styled.button`
  display: block;
  padding: 5px 15px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  color: #fff;
  background-color: ${AppColors.primary};
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  :active {
    background-color: ${AppColors.primary};
  }
`;
export default Button;
