import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Button = styled.button<{ width?: string }>`
  outline: none;
  cursor: pointer;
  user-select: none;
  pointer-events: auto;
  width: ${({ width }) => width ? width : "218px"};
  height: 42px;
  transition: all 0.3s ease;
  position: relative;
  padding: 0 10px;
  border-radius: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #000;
  background-color: #fff;
  display: flex;
  border: 1px solid #000;
  justify-content: center;
  align-items: center;
  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    background-color: #C5C5C5;
    border: 1px solid #C5C5C5;
    color: #fff; 
  }
`;



