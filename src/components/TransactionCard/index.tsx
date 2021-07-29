import React from 'react';
import { categories } from '../../utils/categories';
import {
  Amount,
  Category,
  CategoryIcon,
  CategoryName,
  Container,
  Date,
  Footer,
  Title,
} from './styles';

export interface TransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  date: string;
  category: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  //utilizado para pegar a primeira posição da lista
  const [category] = categories.filter((item) => item.key === data.category);

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <CategoryIcon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>13/04/2021</Date>
      </Footer>
    </Container>
  );
}
