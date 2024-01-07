import { View } from 'react-native';
import { Checkbox, CheckboxProps } from 'react-native-paper';
import { theme } from '../organisms/OwnPaperProvider';

export default function CheckboxTemplate(
  props: Readonly<CheckboxProps>
): React.ReactNode {
  return (
    <View style={{ borderWidth: 1 }}>
      <Checkbox onPress={props.onPress} {...props}></Checkbox>
    </View>
  );
}
