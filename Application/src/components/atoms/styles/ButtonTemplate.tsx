import { Button as PaperButton } from 'react-native-paper';
import { Props as PaperButtonProps } from 'react-native-paper/src/components/Button/Button';
import { StyleSheet } from 'react-native';

export default function ButtonTemplate(props: Readonly<PaperButtonProps>) {
  return <PaperButton style={styles.button} {...props} />;
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
  },
});
