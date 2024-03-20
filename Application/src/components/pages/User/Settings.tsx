import { Switch as PaperSwitch, Text as PaperText } from 'react-native-paper';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import { ReactNode, useState } from 'react';
import { LogoutUser } from '../../../controllers/AuthenticationController';
import { StackParamList } from '../../../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DeleteAndLogoutUser } from '../../../controllers/UserController';
import { ApolloConsumer } from '@apollo/client';
import SliderTemplate from '../../atoms/styles/SliderTemplate';
import { useSharedValue } from 'react-native-reanimated';
import TextTemplate from '../../atoms/styles/TextTemplate';
import { View, StyleSheet } from 'react-native';
import { boosterLabel, lag, setLag } from '../../../services/utils/utils';
import { theme } from '../../organisms/OwnPaperProvider';

type Props = NativeStackScreenProps<StackParamList>;

export default function Settings(props: Readonly<Props>): ReactNode {
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const toggleThemeSwitch = () => {
    setSwitchValue(!switchValue);
  };

  const progressSlider = useSharedValue(lag.value);
  const minValueSlider = useSharedValue(0);
  const maxValueSlider = useSharedValue(2000);

  const [boosterLevel, setBoosterLevel] = useState<string>(
    boosterLabel[lag.value]
  );

  return (
    <ApolloConsumer>
      {client => (
        <View>
          <View style={switchValue ? styles.darkThemeOn : undefined}></View>
          <SurfaceTemplate style={styles.template}>
            <PaperText style={styles.surfaceTitle}>
              Options d'application
            </PaperText>
            <View style={styles.flexBox}>
              <PaperText
                style={[styles.flexItem, styles.textTheme]}
                onPress={() => {}}
              >
                Activer le thème {switchValue ? 'clair' : 'assombri'}
              </PaperText>
              <PaperSwitch
                style={styles.darkThemeSwitch}
                color={theme.colors.tertiary}
                value={switchValue}
                onValueChange={toggleThemeSwitch}
              ></PaperSwitch>
            </View>
            <View style={styles.flexBox}>
              <PaperText style={styles.flexItemSlider}>
                Booster sa connexion
              </PaperText>
              <View style={styles.slider}>
                <SliderTemplate
                  progress={progressSlider}
                  minimumValue={minValueSlider}
                  maximumValue={maxValueSlider}
                  heartbeat
                  step={4}
                  onValueChange={progress => {
                    setBoosterLevel(boosterLabel[progress]);
                    setLag(progress);
                  }}
                />
                <TextTemplate>{boosterLevel}</TextTemplate>
              </View>
            </View>
          </SurfaceTemplate>
          <SurfaceTemplate style={styles.template}>
            <PaperText style={styles.surfaceTitle}>Paramètres</PaperText>
            <ButtonTemplate
              style={[styles.button, styles.buttonDanger]}
              onPress={() => {
                props.navigation.navigate('Profil');
              }}
            >
              Modifier mon profil
            </ButtonTemplate>
            <ButtonTemplate
              style={styles.button}
              onPress={() => {
                alert('Non disponible pour le moment');
              }}
            >
              Télécharger mes données
            </ButtonTemplate>
            <ButtonTemplate
              style={[styles.button, styles.buttonTransparent]}
              textColor={theme.colors.primary}
              mode="outlined"
              onPress={async () => {
                await LogoutUser(client, props);
              }}
            >
              Se déconnecter
            </ButtonTemplate>
            <ButtonTemplate
              style={[styles.button, styles.buttonTransparent]}
              onPress={() => props.navigation.navigate('CGU')}
              textColor={theme.colors.primary}
              mode="outlined"
            >
              Accéder aux conditions générales
            </ButtonTemplate>
            <ButtonTemplate
              style={[styles.button, styles.buttonSuccess]}
              onPress={async () => {
                await DeleteAndLogoutUser(client, props);
              }}
            >
              Supprimer mon compte
            </ButtonTemplate>
          </SurfaceTemplate>
        </View>
      )}
    </ApolloConsumer>
  );
}

const styles = StyleSheet.create({
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTheme: {
    alignSelf: 'center',
  },
  flexItem: {
    margin: 10,
  },
  flexItemSlider: {
    marginLeft: 10,
  },
  slider: {
    flex: 1,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  template: {
    padding: 20,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 18,
    zIndex: 1,
  },
  surfaceTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    zIndex: 1,
  },
  buttonDanger: {
    backgroundColor: theme.colors.tertiary,
    zIndex: 1,
  },
  buttonSuccess: {
    backgroundColor: theme.colors.error,
    zIndex: 1,
  },
  buttonTransparent: {
    borderColor: theme.colors.primary,
    border: '1px solid',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  darkThemeOn: {
    position: 'absolute',
    height: 9999,
    width: 9999,
    backgroundColor: 'black',
    opacity: 0.9,
    zIndex: 100,
    pointerEvents: 'none',
  },
  darkThemeSwitch: {
    margin: 10,
  },
});
