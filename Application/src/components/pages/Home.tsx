import { StyleSheet, View, Text } from 'react-native';
import SurfaceTemplate from '../templates/SurfaceTemplate';
import { Button } from 'react-native-paper';
import { mainTheme } from '../../environment/themes';

export default function Home({ navigation }) {
  return (
    <View>
      <SurfaceTemplate>
        <Button
          style={styles.button}
          mode='contained'
          textColor={mainTheme.colors.text}
          onPress={() => navigation.navigate('Connexion')}>
            Connexion
        </Button>
        <Button
          style={styles.button}
          mode='outlined'
          onPress={() => navigation.navigate('Inscription')}>
            Inscription
        </Button>
      </SurfaceTemplate>
    </View>
  );
}

const styles = StyleSheet.create({
  button : {
    margin: 5,
  }
});
