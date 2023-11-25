import * as React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { Props as PaperTextInputProps } from 'react-native-paper/src/components/TextInput/TextInput'

const TextInputTemplate = (props: Readonly<PaperTextInputProps>) => {

  return (
    <PaperTextInput>
      {props.children}
    </PaperTextInput>
  );
};

export default TextInputTemplate;
