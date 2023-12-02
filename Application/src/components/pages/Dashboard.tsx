import SurfaceTemplate from '../organisms/SurfaceTemplate';
import AppTemplate from '../atoms/AppTemplate';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/RootStack';
import {
  GetLoggedUser,
  LogoutUser,
} from '../../controllers/AuthenticationController';
import { ReactNode } from 'react';

type Props = NativeStackScreenProps<StackParamList>;

export default function Dashboard(props: Readonly<Props>): ReactNode {
  GetLoggedUser().then(user => {
    if (user.username == '' || user.token == '') {
      console.error('No user logged in.');
      props.navigation.reset({
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
          await LogoutUser(props);
        }}
      />
      <AppTemplate
        icon="door-sliding"
        label="Bloc-notes"
        onPress={() => props.navigation.navigate('Bloc-notes')}
      />
    </SurfaceTemplate>
  );
}
