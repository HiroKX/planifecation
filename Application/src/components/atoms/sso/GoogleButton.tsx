import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { StackParamList } from '../../../navigation/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GoogleAuth  from '../../../controllers/sso/GoogleAuth'

type Props = NativeStackScreenProps<StackParamList>;

function GoogleUp({navigation}: Readonly<Props>) {
    function handlePress(){
        GoogleAuth();
        navigation.navigate('Dashboard');
    }

    return (
        <View>
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