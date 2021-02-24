import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hide } from '@/store/actions/alert';
import {
  getAlertIsNotClose,
  getAlertText,
  getAlertType,
} from '@/store/selectors';
import {
  Alert as ChackraAlert,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from '@chakra-ui/react';

const Alert: React.FC = () => {
  const text = useSelector(getAlertText);
  const type = useSelector(getAlertType);
  const isNotClose = useSelector(getAlertIsNotClose);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isNotClose) {
      return;
    }
    setTimeout(() => {
      dispatch(hide());
    }, 3000);
  }, [text]);

  const hideHandler = () => {
    dispatch(hide());
  };

  if (!text) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="10"
      height="50.6px"
    >
      <ChackraAlert status={type} height="full">
        <AlertIcon />
        <AlertTitle mr={2}>{text}</AlertTitle>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={hideHandler}
        />
      </ChackraAlert>
    </Box>
  );
};

export default Alert;
