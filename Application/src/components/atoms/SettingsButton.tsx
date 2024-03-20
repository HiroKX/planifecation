import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackParamList } from '../../navigation/RootStack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ReactNode, useState, useEffect } from 'react';
import { IsLoggedUser } from '../../controllers/AuthenticationController';

type Props = StackNavigationProp<StackParamList>;

export default function Settings(): ReactNode {
  const navigation = useNavigation<Props>();
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    async function checkLogged() {
      setIsLogged(await IsLoggedUser());
    }
    checkLogged();
  }, []);

  let disabledItem = false; //TODO : Changer lorsqu'un utiliser est connecté (vérifier avec des méthodes comme useEffect, etc...)
  return (
    <TouchableOpacity
      disabled={disabledItem}
      onPress={() => {
        if (isLogged) {
          navigation.navigate('Paramètres');
        }
      }}
      style={styles.button}
    >
      <Image
        style={{ width: 45, height: 45 }}
        source={require('../../assets/logo.png')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    zIndex: 999,
  },
});
