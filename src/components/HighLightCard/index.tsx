import React from 'react';
import { Amount, Container, Footer, Header, Icon, LastTransaction, Title } from './styles';

interface Props {
  title: string;
  amount: string;
  lastTransaction: string;
  type: 'up' | 'down' | 'total';
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign',
};

export function HighlightCard(props: Props) {
  return (
    //dessa forma eu passo propriedades para os meus estilos
    <Container type={props.type}>
      <Header>
        <Title type={props.type}>{props.title}</Title>
        <Icon name={icon[props.type]} type={props.type} />
      </Header>
      <Footer>
        <Amount type={props.type}>{props.amount}</Amount>
        <LastTransaction type={props.type}>{props.lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
