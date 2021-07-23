import React from 'react';
import { TextInputProps } from 'react-native';
import { TextInputContainer } from './styles';

type Props = TextInputProps;

export function InputComponent({ ...rest }: Props) {
  return <TextInputContainer {...rest} />;
}
