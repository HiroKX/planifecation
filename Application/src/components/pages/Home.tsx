import { StyleSheet, View } from 'react-native';
import CardService from '../../services/CardService';
import { Button } from '@react-native-material/core'
import { mainTheme } from '../../environment/themes';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Home({ navigation }) {
  return (
    <View>
      <CardService>
      <Button
          color= {mainTheme.colors.primary} 
          title="Se connecter"
          onPress= {() => navigation.navigate('Connexion')}
        />
        <Button
          color= {mainTheme.colors.primary} 
          variant="outlined"
          title="S'inscrire"
          onPress= {() => navigation.navigate('Inscription')}
        />
      </CardService>
    </View>
  );
}

const styles = StyleSheet.create({
});
