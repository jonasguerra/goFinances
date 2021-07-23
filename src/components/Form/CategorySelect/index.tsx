import React from 'react';
import { Category, Container } from './styles';

interface Props {
  title: string;
}

export function CategorySelect() {
  return (
    <Container>
      <Category></Category>
    </Container>
  );
}
