import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { InputComponent } from '../Input';
import { Container, Error } from './styles';

interface Props extends TextInputProps {
  name: string;
  control: Control;
  error: string;
}

export function InputForm({ name, control, error, ...rest }: Props) {
  return (
    <Container>
      {/*Este controller recebe o control que é a referencia do form que está controlando este input 
      e também recebe o render, onde é possível acessar as propriedades do input renderizado */}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputComponent onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && <Error>{ error }</Error>}
    </Container>
  );
}
