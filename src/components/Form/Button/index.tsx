import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Title, TouchableOpacityComponent } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <TouchableOpacityComponent {...rest}>
      <Title>{title}</Title>
    </TouchableOpacityComponent>
  );
}
