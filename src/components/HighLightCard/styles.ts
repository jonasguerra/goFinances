import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface CardProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<CardProps>`
  background-color: ${({ theme, type }) => (type === 'total' ? theme.colors.secondary : theme.colors.shape)};

  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Title = styled.Text<CardProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, type }) => (type === 'total' ? theme.colors.shape : theme.colors.text_dark)};
`;

export const Icon = styled(Feather)<CardProps>`
  font-size: ${RFValue(40)}px;
  ${(props) =>
    props.type === 'up' &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}
  ${(props) =>
    props.type === 'down' &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}
    ${(props) =>
    props.type === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<CardProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  margin-top: 38px;

  color: ${({ theme, type }) => (type === 'total' ? theme.colors.shape : theme.colors.text_dark)};
`;

export const LastTransaction = styled.Text<CardProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;

  color: ${({ theme, type }) => (type === 'total' ? theme.colors.shape : theme.colors.text)};
`;
