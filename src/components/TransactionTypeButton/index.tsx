import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Button, Container, Icon, Title } from './styles';

const icons = {
  positive: 'arrow-up-circle',
  negative: 'arrow-down-circle',
};

interface Props extends RectButtonProps {
  title: string;
  type: 'positive' | 'negative';
  isActive: boolean;
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: Props) {
  return (
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
