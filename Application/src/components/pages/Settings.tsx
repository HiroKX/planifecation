import {
  Divider,
  Switch as PaperSwitch,
  Text as PaperText,
} from 'react-native-paper';
import { DisconnectUser } from '../../services/AuthenticationService';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import SurfaceTemplate from '../organisms/SurfaceTemplate';
import { useState } from 'react';

function Settings() {
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
      <ButtonTemplate onPress={DisconnectUser}>
        Modifier mon profil
      </ButtonTemplate>
      <ButtonTemplate onPress={DisconnectUser}>
        Télécharger mes données
      </ButtonTemplate>
      <ButtonTemplate onPress={DisconnectUser}>
        Supprimer mon compte
      </ButtonTemplate>
      <ButtonTemplate onPress={DisconnectUser}>Se déconnecter</ButtonTemplate>
      <Divider style={{ height: 1 }} />
      <ButtonTemplate onPress={DisconnectUser}>
        Accéder aux conditions générales
      </ButtonTemplate>
    </SurfaceTemplate>
  );
}

export default Settings;
