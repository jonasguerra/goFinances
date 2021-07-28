import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import { Container, Fields, Form, Header, Title, TransactionsType } from './styles';

interface formData {
  name: string;
  amount: number;
}

const scheme = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo'),
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const dataKey = '@gofinances/transations';

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }

  async function onsubmit(form: formData) {
    if (!transactionType) return Alert.alert('Informe o tipo da transação');

    if (category.key === 'category') return Alert.alert('Informe a categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      category: category.key,
      transactionType,
      date: new Date(),
    };

    try {
      const collection = await AsyncStorage.getItem(dataKey);
      const currentData = collection ? JSON.parse(collection) : [];
      const allData = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(allData));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'category',
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao salvar transação');
    }
  }

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey);

      //com a exclamação eu estou garantido ao typesript que sempre haverá um valor em DATA.
      console.log(JSON.parse(data!));
    }

    loadData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

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

            <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(onsubmit)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
