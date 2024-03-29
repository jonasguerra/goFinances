import React from "react";

import { Button, Text, TextInput, View } from "react-native";

export function Profile() {
  return (
    <View>
      <Text testID="text-title">Profile</Text>
      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Jonas"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Guerra"
      />
      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
}
