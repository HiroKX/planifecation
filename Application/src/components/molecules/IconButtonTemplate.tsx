import { IconButton, IconButtonProps } from "react-native-paper";

export default function SurfaceTemplate(
  props: Readonly<IconButtonProps>
): ReactNode {
  return (
    <IconButton
        size={props.size ?? 30}
        mode={props.mode ?? 'contained'}
        onPress={props.onPress}
        {...props}
        ></IconButton>

  );
}