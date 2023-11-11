import { StyleSheet, View } from 'react-native';
import SurfaceTemplate from '../templates/SurfaceTemplate';
import ButtonTemplate from '../templates/ButtonTemplate';
import SnackBarService from '../../services/SnackBarService';

export default function Home({ navigation }) {
  return (
    <View>
      <SurfaceTemplate>
        <ButtonTemplate 
          handleClick={() =>  {
            navigation.navigate('Connexion');
            
          }}
        >
            Connexion
        </ButtonTemplate>
        <ButtonTemplate 
          handleClick={() => navigation.navigate('Inscription')} 
          mode='outlined'>Inscription
          </ButtonTemplate>
      </SurfaceTemplate>
    </View>
  );
}

const styles = StyleSheet.create({
  button : {
    margin: 5,
  }
});
