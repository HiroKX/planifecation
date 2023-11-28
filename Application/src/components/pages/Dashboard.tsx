import SurfaceTemplate from '../organisms/SurfaceTemplate';
import AppTemplate from '../AppTemplate';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/RootStack';
import {
  GetLoggedUser,
  LogoutUser,
} from '../../controllers/AuthenticationController';

type Props = NativeStackScreenProps<StackParamList>;

export default function Dashboard({ navigation }: Readonly<Props>) {
  GetLoggedUser().then(user => {
    if (user.username == null || user.token == null) {
      console.error('No user logged in.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Accueil' }],
      });
    }
  });

  return (
    <SurfaceTemplate>
      <AppTemplate
        icon="door-sliding"
        onPress={async () => {
          await LogoutUser(navigation);
        }}
      />
    </SurfaceTemplate>
  );
}
