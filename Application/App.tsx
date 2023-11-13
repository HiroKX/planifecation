import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/components/HomeScreen";

const Stack = createNativeStackNavigator();

function DetailsScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => {
                    navigation.navigate('Home', { user: 'yourUserObject' });
                }}/>
        </View>
    );
}

export default function App() {

  return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Details">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
