import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useEvent, useStore } from 'effector-react/ssr';
import { $alertKind, $alertLabel, alertClosed } from '../model';
import { Text } from '@/src/ui/atoms';

const CLOSABLE_TIME = 3000;

export const Alert = () => {
  const kind = useStore($alertKind);
  const label = useStore($alertLabel);
  const alertClosedEvent = useEvent(alertClosed);

  useEffect(() => {
    setTimeout(() => alertClosedEvent(), CLOSABLE_TIME);
  }, [kind, label]);

  if (!kind) {
    return null;
  }

  return (
    <Wrapper>
      <Content kind={kind}>
        <Text size={18}>{label}</Text>
        <Close onClick={() => alertClosedEvent()} />
      </Content>
    </Wrapper>
  );
};

export const Content = styled.div<{ kind }>`
  position: relative;
  padding: 12px 50px 12px 20px;
  border-radius: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 273px;
  background-color: ${({ kind }) =>
    kind === 'success' ? 'green' : kind === 'warning' ? 'yeallow' : 'red'};
`;

export const Close = styled.div`
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  cursor: pointer;
  position: absolute;
  &:after {
    content: '';
    position: absolute;
    height: 18px;
    width: 3px;
    background-color: #fff;
    transform: rotate(45deg);
  }
  &:before {
    content: '';
    position: absolute;
    height: 18px;
    width: 3px;
    background-color: #fff;
    transform: rotate(-45deg);
  }
`;

const bounce = keyframes`
  from {
    left: -100px; 
    opacity: 0;
  }
  to {
    left: 20px; 
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 100;
  animation: ${bounce} 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;
