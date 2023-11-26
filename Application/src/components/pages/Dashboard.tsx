import SurfaceTemplate from '../organisms/SurfaceTemplate';
import AppTemplate from '../AppTemplate';
import {
  GetLoggedUser,
  DisconnectUser,
} from '../../services/AuthenticationService';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/RootStack';

type Props = NativeStackScreenProps<StackParamList>;

export default function Dashboard({ navigation }: Readonly<Props>) {
  GetLoggedUser().then((user: { login: any; token: any }) => {
    console.log("Everybody says 'welcome on the dashboard' to ", user.login);
    console.log('Look at his beautiful token : ', user.token);
  });

  async function Disconnect() {
    console.log('Disconnecting...');
    await DisconnectUser().then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Accueil' }],
      });
    });
  }

  return (
    <SurfaceTemplate>
      <AppTemplate
        icon="door-sliding"
        onPress={async () => await Disconnect()}
      />
    </SurfaceTemplate>
  );
}

/*
        <AppTemplate icon="pencil"/>
        <AppTemplate icon="cog"/>
        <AppTemplate icon="moon-waning-crescent"/>
        <AppTemplate icon="car"/>
        <AppTemplate icon="check"/>
        <AppTemplate icon="weather-sunny"/>
 */
