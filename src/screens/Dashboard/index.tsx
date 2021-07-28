import React from 'react';
import { HighlightCard } from '../../components/HighLightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  LogoutButton,
  Photo,
  Title,
  TransactionList,
  Transactions,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export const Dashboard = () => {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: '12.000,50',
      date: '12/12/2012',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
    },
    {
      id: '2',
      type: 'negative',
      title: 'Desenvolvimento de site',
      amount: '12,50',
      date: '12/12/2012',
      category: {
        name: 'Alimentação',
        icon: 'coffee',
      },
    },
    {
      id: '3',
      type: 'negative',
      title: 'Desenvolvimento de site',
      amount: '1200,50',
      date: '12/12/2012',
      category: {
        name: 'Casa',
        icon: 'shopping-bag',
      },
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/27323498?v=4' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Jonas</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="17.400,00"
          lastTransaction="Ultima transação dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="7.400,00"
          lastTransaction="Ultima transação dia 13 de abril"
          type="down"
        />
        <HighlightCard
          title="Saldo"
          amount="10.000,00"
          lastTransaction="Ultima transação dia 13 de abril"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
