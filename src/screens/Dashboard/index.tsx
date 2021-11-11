import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { HighlightCard } from '../../components/HighLightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  LoadingContainer,
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

export interface highLightData {
  amount: string;
  lastTransaction: string;
}

export interface highLightCardProps {
  earnings: highLightData;
  expenses: highLightData;
  total: highLightData;
}

export const Dashboard = () => {
  const [transactions, setTransactions] = useState<DataListProps[]>(
    []
  );
  const [highLightCard, setHighLightCard] =
    useState<highLightCardProps>({} as highLightCardProps);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative' | 'total'
  ) {
    //buscar as datas das ultimas entradas e saídas

    /* Primeiramente filtra as transações por tipo de transação 
    depois pega o timestamp da data. Passa para a função MAX que vai
    encontrar o maior timestamp, depois converte esse timestamp novamente
    para um date*/
    let lastTransaction: number;

    if (type != 'total') {
      lastTransaction = Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      );
    } else {
      lastTransaction = Math.max.apply(
        Math,
        collection.map((transaction) =>
          new Date(transaction.date).getTime()
        )
      );
    }

    if (lastTransaction != -Infinity) {
      const lastTransactionDate = new Date(lastTransaction);
      return `${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString(
        'pt-BR',
        { month: 'long' }
      )}`;
    } else {
      return '';
    }
  }

  async function loadTransactionsData() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let earningsTotal = 0;
    let expensiveTotal = 0;
    let total = 0;

    const formattedTransactions: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === 'positive') {
          earningsTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          date,
          type: item.type,
          category: item.category,
        };
      }
    );

    const lastDatePositiveTransaction = getLastTransactionDate(
      transactions,
      'positive'
    );
    const lastDateNegativeTransaction = getLastTransactionDate(
      transactions,
      'negative'
    );
    const lastTotalTransaction = getLastTransactionDate(
      transactions,
      'total'
    );

    total = earningsTotal - expensiveTotal;
    setHighLightCard({
      earnings: {
        amount: earningsTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastDatePositiveTransaction &&
          `Ultima transação dia ${lastDatePositiveTransaction}`,
      },
      expenses: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastDateNegativeTransaction &&
          `Ultima transação dia ${lastDateNegativeTransaction}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction:
          lastTotalTransaction && `01 à ${lastTotalTransaction}`,
      },
    });

    setTransactions(formattedTransactions);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactionsData();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highLightCard.earnings.amount}
              lastTransaction={highLightCard.earnings.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highLightCard.expenses.amount}
              lastTransaction={highLightCard.expenses.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Saldo"
              amount={highLightCard.total.amount}
              lastTransaction={highLightCard.total.lastTransaction}
              type="total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TransactionCard data={item} />
              )}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};
