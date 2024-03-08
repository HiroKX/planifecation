import { IconButton, IconButtonProps } from 'react-native-paper';

interface IconOverrideProps {
  iconButton?: IconButtonProps;
  status: 'checked' | 'unchecked';
  onPress: () => void;
  style? : StyleProp<ViewStyle>;
  containerColor?: string;
  iconColor?: string;
  size?: number
}

export default function CheckboxTemplate(
  props: Readonly<IconOverrideProps>
): React.ReactNode {
  return (
    <IconButton
      {...props}
      style={ props.style ?? undefined}
      containerColor={props.containerColor}
      iconColor={props.iconColor}
      size={props.size ?? 50}
      icon={
        props.status === 'unchecked'
          ? 'checkbox-blank-outline'
          : 'checkbox-marked'
      }
    />
  );
}
