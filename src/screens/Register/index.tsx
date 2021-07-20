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
import { useState } from 'react';

export function Register() {

  const [transactionType, setTransactionType] = useState('')

  function handleTransactionTypeSelect(type: 'up' | 'down'){
    setTransactionType(type)
  }

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
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type='down'
              title='Outcome'
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
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