import { useField } from 'effector-forms';
import { Field } from 'effector-forms/dist/types';
import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { Wrapper, Inner, Error } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  width?: string;
  field: Field<any>;
  isPhoneNumber?: boolean;
};

export const Input: React.FC<InputProps> = ({
  width,
  field,
  isPhoneNumber,
  ...props
}) => {
  const { value, onChange, firstError, name } = useField(field);

  const isShowError = !!firstError;

  const changableValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isPhoneNumber) {
      return e.target.value;
    }
    return e.target.value.replace(/\D/, '');
  };

  return (
    <Wrapper width={width}>
      <Inner
        {...props}
        name={name}
        value={value}
        onChange={(e) => onChange(changableValue(e))}
        isShowError={isShowError}
      />
      {isShowError && <Error>{firstError.errorText}</Error>}
    </Wrapper>
  );
};
