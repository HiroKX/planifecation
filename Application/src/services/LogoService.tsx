import { View, Image, StyleSheet } from 'react-native';

export default function LogoService() {
  return (
    <View>
        <Image
            style={{width:70,height:70}}
            source={require('../assets/logo.png')}/>
    </View>
  );
}

const styles = StyleSheet.create({
});