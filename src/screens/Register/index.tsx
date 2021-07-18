import React from 'react';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType,
} from './styles';

import { InputComponent } from '../../components/forms/Input';
import { Button } from '../../components/forms/Button';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputComponent
            placeholder='Nome'
          />
          <InputComponent
            placeholder='Preço'
          />

          <TransactionsType>
            <TransactionTypeButton
              type='up'
              title='Income'
            />
            <TransactionTypeButton
              type='down'
              title='Outcome'
            />
          </TransactionsType>

        </Fields>
        <Button
          title='Enviar'
        />
      </Form>

    </Container>
  );
}