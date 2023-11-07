import { StyleSheet, Text, View } from 'react-native';

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Text>Hello from component SignUp !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
