import { useState } from 'react';
import { StyleSheet } from 'react-native';
import SurfaceTemplate from '../templates/SurfaceTemplate';
import TextInputTemplate from '../templates/TextInputTemplate';
import ButtonTemplate from '../templates/ButtonTemplate';

export default function SignUp({ navigation }) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
  return (
    <SurfaceTemplate>
      <TextInputTemplate 
        label="Adresse mail"
        value={id}
        handleChangeText={(text) => setId(text)}
        />
      <TextInputTemplate
        label="Mot de passe"
        mode='outlined'
        value={password}
        handleChangeText={(text) => setPassword(text)}
        secureTextEntry={true}/>
      <TextInputTemplate
        label="Confirmer le mot de passe"
        mode='outlined'
        value={confirmpass}
        handleChangeText={(text) => setConfirmpass(text)}
        secureTextEntry={true}/>
        <ButtonTemplate
        handleClick={() => {
          navigation.replace('Connexion');
        }}>
          M'inscrire</ButtonTemplate>
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
