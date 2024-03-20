import TextTemplate from '../atoms/styles/TextTemplate';
import { cgu } from '../../assets/cgu';
import SurfaceTemplate from '../molecules/SurfaceTemplate';
import { StyleSheet } from 'react-native';

export default function Cgu() {
  return (
    <SurfaceTemplate style={styles.surface}>
      <TextTemplate variant="bodyLarge">{cgu}</TextTemplate>
    </SurfaceTemplate>
  );
}

const styles = StyleSheet.create({
  surface: {
    marginTop: 15,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 18,
  },
});
