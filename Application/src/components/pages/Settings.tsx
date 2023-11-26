import { Divider, Switch, Text as PaperText } from 'react-native-paper';
import { DisconnectUser } from '../../services/AuthenticationService';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import SurfaceTemplate from '../organisms/SurfaceTemplate';
import { useState } from 'react';


function Settings() {

const [switchThemeEnabled, setSwitchThemeEnabled] = useState(false);
const toggleSwitch = () => setSwitchThemeEnabled(!switchThemeEnabled);

  return (
    <SurfaceTemplate>
      <SurfaceTemplate mode='flat' elevation={0} style={undefined}>
        {switchThemeEnabled ? <PaperText>Activer le thème clair</PaperText> : <PaperText>Activer le thème sombre</PaperText>}
        <Switch
          onValueChange={toggleSwitch}
          value={switchThemeEnabled
          }></Switch>
        </SurfaceTemplate>
      <Divider style={{ height: 1, }} />
      <ButtonTemplate onPress={DisconnectUser}>Modifier mon profil</ButtonTemplate>
      <ButtonTemplate onPress={DisconnectUser}>Télécharger mes données</ButtonTemplate>
      <ButtonTemplate onPress={DisconnectUser}>Supprimer mon compte</ButtonTemplate>
      <ButtonTemplate onPress={DisconnectUser}>Se déconnecter</ButtonTemplate>
      <Divider style={{ height: 1, }} />
      <ButtonTemplate onPress={DisconnectUser}>Accéder aux conditions générales</ButtonTemplate>
    </SurfaceTemplate>
  );
}

export default Settings;