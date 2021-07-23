import React, { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { InputComponent } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { Container, Fields, Form, Header, Title, TransactionsType } from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputComponent placeholder="Nome" />
          <InputComponent placeholder="Preço" />

          <TransactionsType>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsType>
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
