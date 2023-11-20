import SurfaceTemplate from '../templates/SurfaceTemplate';
import AppTemplate from '../templates/AppTemplate';
import {GetLoggedUser, DisconnectUser} from "../../services/AuthenticationService";

async function Disconnect(navigation : any) {
    console.log("Disconnecting...");
    await DisconnectUser().then(() => {
        navigation.replace('Accueil');
    });
}

export default function Dashboard({ navigation }: any) {
    GetLoggedUser().then((user: { login: any; token: any; }) => {
        console.log("Everybody says 'welcome on the dashboard' to ", user.login);
        console.log("Look at his beautiful token : ", user.token);
    });
  return (
      <SurfaceTemplate>
          <AppTemplate icon="door-sliding" handleClick={async () => await Disconnect(navigation) } />
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
