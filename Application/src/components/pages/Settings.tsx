import {
  Divider,
  Switch as PaperSwitch,
  Text as PaperText,
} from 'react-native-paper';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import SurfaceTemplate from '../organisms/SurfaceTemplate';
import { ReactNode, useState } from 'react';
import { LogoutUser } from '../../controllers/AuthenticationController';
import { StackParamList } from '../../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DeleteAndLogoutUser } from '../../controllers/UserController';
import { ApolloConsumer } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<StackParamList>;

function Settings(props: Readonly<Props>): ReactNode {
  const [themeSlideEnabled, setThemeSlideEnabled] = useState(false);
  const toggleThemeSwitch = () => setThemeSlideEnabled(!themeSlideEnabled);
  return (
    <ApolloConsumer>
      {client => (
        <SurfaceTemplate>
          <SurfaceTemplate mode="flat">
            <PaperText>
              Activer le thème {themeSlideEnabled ? 'clair' : 'sombre'}
            </PaperText>
            <PaperSwitch
              value={themeSlideEnabled}
              onValueChange={toggleThemeSwitch}
            ></PaperSwitch>
          </SurfaceTemplate>
          <Divider style={{ height: 1 }} />
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
      )}
    </ApolloConsumer>
  );
}

export default Settings;
