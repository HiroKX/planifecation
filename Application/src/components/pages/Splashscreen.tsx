import { View } from 'react-native';
import { theme } from '../organisms/OwnPaperProvider';
import TextTemplate from '../atoms/styles/TextTemplate';
import LogoTemplate from '../atoms/styles/LogoTemplate';
import { ActivityIndicator } from 'react-native-paper';

export default function Splashscreen(props: Readonly<{ func: () => void }>) {
  return (
    <View style={{ backgroundColor: theme.colors.primary, flex: 1 }}>
      <View style={{ flex: 6, alignContent: 'center', alignItems: 'center' }}>
        <LogoTemplate style={{ width: 400, height: 400 }} />
        <TextTemplate
          onLongPress={props.func}
          variant="headlineLarge"
          style={{ flex: 1, color: theme.colors.secondary, fontSize: 42 }}
        >
          Planifécation
        </TextTemplate>
        <ActivityIndicator
          style={{ flex: 2 }}
          color={theme.colors.error}
          size={150}
        ></ActivityIndicator>
      </View>
    </View>
  );
}
