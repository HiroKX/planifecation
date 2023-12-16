import { Surface as PaperCard } from 'react-native-paper';
import { Props as PaperCardProps } from 'react-native-paper/src/components/Surface';
import { StyleSheet } from 'react-native';
import { ReactNode } from 'react';

export default function SurfaceTemplate(
  props: Readonly<PaperCardProps>
): ReactNode {
  return (
    <PaperCard
      style={props.style ?? styles.surface}
      mode={props.mode ?? 'elevated'}
      elevation={props.elevation ?? 0}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
  },
});
