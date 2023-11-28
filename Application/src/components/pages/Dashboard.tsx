import SurfaceTemplate from '../organisms/SurfaceTemplate';
import AppTemplate from '../AppTemplate';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigation/RootStack';
import {useAppDispatch} from "../../utils/redux/Store";
import {updateLoggedUser} from "../../utils/redux/slices/LoggedUserSlice";

type Props = NativeStackScreenProps<StackParamList, 'Dashboard'>;

export default function Dashboard({ navigation, route }: Readonly<Props>) {
    const dispatch = useAppDispatch();
    console.debug("Welcome to the Dashboard,");
    console.debug("Params = ", route.params);
    if (route.params != undefined && route.params.username != "") {
        console.debug("Getting useAppDispatch");
        console.debug("Dispatching updateLoggedUser");
        dispatch(updateLoggedUser({id: 0, username: route.params.username, password: "", token: route.params.token}));
        console.debug("Dispatched");
    }

  return (
    <SurfaceTemplate>
      <AppTemplate
        icon="door-sliding"
        onPress={async () => {
            console.log("Disconnecting...");
            navigation.reset({
                index: 0,
                routes: [{name: 'Accueil'}],
            });
        }}
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
