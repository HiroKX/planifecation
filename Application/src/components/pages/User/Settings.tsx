import {
  Divider,
  Switch as PaperSwitch,
  Text as PaperText,
} from 'react-native-paper';
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

type Props = NativeStackScreenProps<StackParamList>;

export default function Settings(props: Readonly<Props>): ReactNode {
  const [themeSlideEnabled, setThemeSlideEnabled] = useState(false);
  const toggleThemeSwitch = () => setThemeSlideEnabled(!themeSlideEnabled);

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
          <SurfaceTemplate mode="flat">
            <View style={styles.flexBox}>
              <PaperText style={styles.flexItem} onPress={() => {}}>
                Activer le thème {themeSlideEnabled ? 'clair' : 'sombre'}
              </PaperText>
              <PaperSwitch
                style={styles.flexItem}
                value={themeSlideEnabled}
                onValueChange={toggleThemeSwitch}
              />
            </View>
            <View style={styles.flexBox}>
              <PaperText style={styles.flexItem}>
                Booster sa connexion
              </PaperText>
              <View style={styles.flexItem}>
                <SliderTemplate
                  progress={progressSlider}
                  minimumValue={minValueSlider}
                  maximumValue={maxValueSlider}
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
          <Divider style={{ height: 1 }} />
          <SurfaceTemplate>
            <ButtonTemplate
              onPress={() => {
                props.navigation.navigate('Profil');
              }}
            >
              Modifier mon profil
            </ButtonTemplate>
            <ButtonTemplate onPress={() => {}}>
              Télécharger mes données
            </ButtonTemplate>
            <ButtonTemplate
              onPress={async () => {
                await DeleteAndLogoutUser(client, props);
              }}
            >
              Supprimer mon compte
            </ButtonTemplate>
            <ButtonTemplate
              onPress={async () => {
                await LogoutUser(client, props);
              }}
            >
              Se déconnecter
            </ButtonTemplate>
            <Divider style={{ height: 1 }} />
            <ButtonTemplate onPress={() => {}}>
              Accéder aux conditions générales
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
  },
  flexItem: {
    flex: 1,
  },
});
