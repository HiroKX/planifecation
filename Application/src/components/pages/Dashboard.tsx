import { StyleSheet, View } from 'react-native';
import SurfaceTemplate from '../templates/SurfaceTemplate';
import AppTemplate from '../templates/AppTemplate';


export default function Dashboard({ navigation }) {
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

const styles = StyleSheet.create({
});
