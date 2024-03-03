import { ReactNode } from 'react';
import { TextInput } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { Props as PaperTextInputProps } from 'react-native-paper/src/components/TextInput/TextInput';

export default function TextInputTemplate(
  props: Readonly<PaperTextInputProps>
): ReactNode {
  return (
    <PaperTextInput
      {...props}
      mode="outlined"
      render={
        props.multiline
          ? innerProps => (
              <TextInput
                {...innerProps}
                style={{
                  paddingTop: 9,
                  paddingBottom: 9,
                  height: 70,
                  width: '80%',
                }}
              ></TextInput>
            )
          : undefined
      }
    />
  );
}
