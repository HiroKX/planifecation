import {
  Divider,
  Switch as PaperSwitch,
  Text as PaperText,
} from 'react-native-paper';
import ButtonTemplate from '../../atoms/styles/ButtonTemplate';
import SurfaceTemplate from '../../molecules/SurfaceTemplate';
import { ReactNode, useState } from 'react';
import { LogoutUser } from '../../../controllers/AuthenticationController';
import { StackParamList } from '../../../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DeleteAndLogoutUser } from '../../../controllers/UserController';
import { ApolloConsumer } from '@apollo/client';
import SliderTemplate from '../../atoms/styles/SliderTemplate';
import { useSharedValue } from 'react-native-reanimated';
import TextTemplate from '../../atoms/styles/TextTemplate';

type Props = NativeStackScreenProps<StackParamList>;

function Settings(props: Readonly<Props>): ReactNode {
  const [themeSlideEnabled, setThemeSlideEnabled] = useState(false);
  const toggleThemeSwitch = () => setThemeSlideEnabled(!themeSlideEnabled);

  const progressSlider = useSharedValue(0);
  const minValueSlider = useSharedValue(0);
  const maxValueSlider = useSharedValue(2000);

  const [boosterLevel, setBoosterLevel] = useState("Sans boost")


  return (
    <ApolloConsumer>
      {client => (
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
          <ButtonTemplate
            onPress={() => {
              props.navigation.navigate('Profil');
            }}
          >
            Modifier mon profil
          </ButtonTemplate>
          <ButtonTemplate onPress={() => {}}>
            Télécharger mes données
          </ButtonTemplate>
          <ButtonTemplate
            onPress={async () => {
              await DeleteAndLogoutUser(client, props);
            }}
          >
            Supprimer mon compte
          </ButtonTemplate>
          <ButtonTemplate
            onPress={async () => {
              await LogoutUser(client, props);
            }}
          >
            Se déconnecter
          </ButtonTemplate>
          <Divider style={{ height: 1 }} />
          <ButtonTemplate onPress={() => {}}>
            Accéder aux conditions générales
          </ButtonTemplate>
          <TextTemplate children={undefined}></TextTemplate>
          <SliderTemplate 
          progress={progressSlider} 
          minimumValue={minValueSlider} 
          maximumValue={maxValueSlider}
          step={4}
          onValueChange={ (progress) => {
            switch(progress) {
              case 500 :
                setBoosterLevel("Fast !");
                break;
              case 1000 :  
                setBoosterLevel("Super fast !!");
                break;
              case 1500 :  
                setBoosterLevel("Hyper fast !!!");
                break;
              case 2000 : 
                setBoosterLevel("ULTRA FAST !!!!!");
                break;
              default:
                setBoosterLevel("Sans boost");
            }
          }}
          ></SliderTemplate>
          <TextTemplate >{boosterLevel}</TextTemplate>
        </SurfaceTemplate>
      )}
    </ApolloConsumer>
  );
}

export default Settings;
