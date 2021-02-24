import styled from '@emotion/styled';

export const Inner = styled.input<{ isShowError?: boolean }>`
  border: 1px solid
    ${({ isShowError }) => (isShowError ? 'red' : 'rgba(0, 0, 0, 0.1)')};
  padding: 14px 23px;
  background-color: #fff;
  color: #000;
  opacity: 1;
  border-radius: 10px;
  outline: none;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  ::placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
    opacity: 0.5;
  }
`;

export const Wrapper = styled.div<{ width?: string }>`
  position: relative;
  margin-bottom: 21px;
  ${Inner} {
    width: ${({ width }) => (width ? width : '218px')};
  }
`;

export const Error = styled.small`
  position: absolute;
  bottom: -16px;
  left: 0;
  color: red;
  font-size: 10px;
`;
