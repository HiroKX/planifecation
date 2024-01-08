import { IconButton, IconButtonProps } from 'react-native-paper';

interface IconOverrideProps {
  iconButton : IconButtonProps;
  status : 'checked' | 'unchecked';
  onPress : () => void;
}


export default function CheckboxTemplate(
  props: Readonly<IconOverrideProps>
): React.ReactNode {
  return (
      <IconButton
      {...props} 
      icon={props.status === 'unchecked' ? 'checkbox-blank-outline' : 'checkbox-marked' }/>
  );
}
