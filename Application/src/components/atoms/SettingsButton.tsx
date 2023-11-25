import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackParamList } from '../../navigation/RootStack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


type Props = StackNavigationProp<StackParamList>;

export default function Settings() {
  const navigation = useNavigation<Props>();

  let disabledItem= false; //TODO : Changer lorsqu'un utiliser est connecté (vérifier avec des méthodes comme useEffect, etc...)
  return (
    <TouchableOpacity disabled={disabledItem} onPress={() => navigation.navigate('Paramètres')}>
        <Image
            style={{width:45,height:45}}
            source={require('../../assets/logo.png')}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
});