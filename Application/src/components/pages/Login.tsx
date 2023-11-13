import { useState } from 'react';
import { StyleSheet } from 'react-native';
import SurfaceTemplate from '../templates/SurfaceTemplate';
import TextInputTemplate from '../templates/TextInputTemplate';
import ButtonTemplate from '../templates/ButtonTemplate';

export default function Login({ navigation }) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
  return (
    <SurfaceTemplate>
      <TextInputTemplate 
        label="Identifiant"
        value={id}
        handleChangeText={(text) => setId(text)}
        />
      <TextInputTemplate
        label="Mot de passe"
        mode='outlined'
        value={password}
        handleChangeText={(text) => setPassword(text)}
        secureTextEntry={true}/>
        <ButtonTemplate
          handleClick={() => {
            navigation.navigate('Dashboard');
          }}>Se connecter</ButtonTemplate>
    </SurfaceTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
