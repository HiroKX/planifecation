import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useNavigation } from '@react-navigation/native';
import {useState} from "react";

function GoogleUp() {
    const navigation = useNavigation();
    const YOUR_CLIENT_ID = "273744401902-ukvoh9f1m229ok383rcvrclnlnatno9d.apps.googleusercontent.com"
    const YOUR_REDIRECT_URI = "http://localhost:3001/google"
    const REDIRECT_URI = "exp://192.168.1.59:8081"
    const [user, setUser] = useState({});

    const handlePress = async () => {
        const result = await WebBrowser.openAuthSessionAsync(
            `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&prompt=consent`,
            REDIRECT_URI
        );
        console.log(result.type);
        if (result.type === "success") {

            // get back the params from the url
            const params = Linking.parse(result.url);
            const { email, name, picture } = params.queryParams;
            //pass in all the user data in an object...
            const currentUser = {
                email,
                name,
                picture,
            };
            setUser(currentUser)

            navigation.navigate('Home');
            // navigate to the HomeScreen and pass the user object

        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handlePress}
            >
                <View style={styles.circle}>
                    <Text style={styles.text}>G</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default GoogleUp;

const styles = StyleSheet.create({

    circle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: "#DEB887",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 20,
    },
});