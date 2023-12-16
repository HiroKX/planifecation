import { ReactNode } from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { Props as PaperTextInputProps } from 'react-native-paper/src/components/TextInput/TextInput';

export default function TextInputTemplate(
  props: Readonly<PaperTextInputProps>
): ReactNode {
  return <PaperTextInput {...props} />;
}
