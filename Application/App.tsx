import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';



//web 273744401902-ukvoh9f1m229ok383rcvrclnlnatno9d.apps.googleusercontent.com
//ios 273744401902-eopbpe1llieftfpqdlnc01hklrc0outr.apps.googleusercontent.com
//android 273744401902-ujeranfouf026ijb92fvjsq79hmbdql3.apps.googleusercontent.com
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "273744401902-eopbpe1llieftfpqdlnc01hklrc0outr.apps.googleusercontent.com",
    androidClientId: "273744401902-ujeranfouf026ijb92fvjsq79hmbdql3.apps.googleusercontent.com",
    //webClientId: "273744401902-ukvoh9f1m229ok383rcvrclnlnatno9d.apps.googleusercontent.com",
  })
  React.useEffect(() =>{
    handleSignInWithGoogle()
  },[response]);
  async function handleSignInWithGoogle(){
    const user = await AsyncStorage.getItem("@user");
    if(!user){
      if(response?.type === "success"){
        await getUserInfo(response.authentication?.accessToken);
      }
    }else{
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if(!token) return;
    try{
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${token}`}
          });
      const user = await response.json();
      await AsyncStorage.setItem("@user",JSON.stringify(user));
      setUserInfo(user);
    }catch(error){
      //Throw error
    }
  }
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="Sign in with Google" onPress={() => promptAsync()} />
      <Button title="Delete local storage" onPress={() => AsyncStorage.removeItem("@user")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
