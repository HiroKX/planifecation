import SurfaceTemplate from '../templates/SurfaceTemplate';
import AppTemplate from '../templates/AppTemplate';
import {GetLoggedUser, LogUser} from "../../services/AuthenticationService";

export default function Dashboard({ navigation }: any) {
    GetLoggedUser().then(user => {
        console.log("Everybody says 'welcome on the dashboard' to ", user.login);
        console.log("Look at his beautiful token : ", user.token);
    });
  return (
      <SurfaceTemplate>
        <AppTemplate icon="pencil"/>
        <AppTemplate icon="cog"/>
        <AppTemplate icon="moon-waning-crescent"/>
        <AppTemplate icon="car"/>
        <AppTemplate icon="check"/>
        <AppTemplate icon="weather-sunny"/>
        
      </SurfaceTemplate>
  );
}
