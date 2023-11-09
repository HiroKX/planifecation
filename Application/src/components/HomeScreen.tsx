import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import GoogleUp from './GoogleUp';
function HomeScreen({ route }) {
    const { user } = route.params;
    console.log(user);
    const [userInfo, setUserInfo] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [picture, setPicture] = React.useState(null);


// then display the data!
    return (
        <View style={styles.container}>
            {/* print props */}
            {<Image source={{uri: picture}} style={{width: 100, height: 100}}/>}
            <Text style={styles.info}>Name: {user.name}</Text>
            <Text style={styles.info}>Email: {user.email}</Text>
            <GoogleUp />
        </View>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        color: "black",
        fontSize: 20,
    },
});