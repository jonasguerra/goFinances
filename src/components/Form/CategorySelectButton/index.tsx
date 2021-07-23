import React from 'react';
import { Category, Icon, TouchableOpacity } from './styles';

interface Props {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down"></Icon>
    </TouchableOpacity>
  );
}
