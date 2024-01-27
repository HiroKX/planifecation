import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { FAB as PaperFab } from 'react-native-paper';
import { Props as PaperFabProps } from 'react-native-paper/src/components/FAB/FAB';

export default function AppTemplate(props: Readonly<PaperFabProps>): ReactNode {
  return (
    <PaperFab
      variant={props.variant ?? 'primary'}
      icon={props.icon ?? 'plus'}
      style={styles.fab}
      onPress={props.onPress}
      theme={props.theme ?? undefined}
      {...props}
    />
  );
}
const styles = StyleSheet.create({
  fab: {
    display: 'flex',
    margin: 16,
  },
});
