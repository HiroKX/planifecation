import { Divider, Switch } from 'react-native-paper';
import { DisconnectUser } from '../../services/AuthenticationService';
import ButtonTemplate from '../atoms/styles/ButtonTemplate';
import SurfaceTemplate from '../organisms/SurfaceTemplate';


function Settings() {
  return (
    <SurfaceTemplate>
      <ButtonTemplate>Activer le DarkMode <Switch value={false} /> </ButtonTemplate>
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