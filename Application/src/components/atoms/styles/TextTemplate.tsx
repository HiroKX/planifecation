import { ReactNode } from 'react';
import { Text as PaperText } from 'react-native-paper';
import TextProps, {
  Props as PaperTextProps,
} from 'react-native-paper/src/components/Typography/Text';

export default function TextTemplate(
  props: Readonly<PaperTextProps<typeof TextProps>>
): ReactNode {
  return <PaperText {...props}>{props.children}</PaperText>;
}
