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

type Props = NativeStackScreenProps<StackParamList>;

function Settings(props: Readonly<Props>): ReactNode {
  const [themeSlideEnabled, setThemeSlideEnabled] = useState(false);
  const toggleThemeSwitch = () => setThemeSlideEnabled(!themeSlideEnabled);

  return (
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
      <ButtonTemplate onPress={() => {}}>Modifier mon profil</ButtonTemplate>
      <ButtonTemplate onPress={() => {}}>
        Télécharger mes données
      </ButtonTemplate>
      <ButtonTemplate onPress={() => {}}>Supprimer mon compte</ButtonTemplate>
      <ButtonTemplate
        onPress={async () => {
          await LogoutUser(props);
        }}
      >
        Se déconnecter
      </ButtonTemplate>
      <Divider style={{ height: 1 }} />
      <ButtonTemplate onPress={() => {}}>
        Accéder aux conditions générales
      </ButtonTemplate>
    </SurfaceTemplate>
  );
}

export default Settings;
