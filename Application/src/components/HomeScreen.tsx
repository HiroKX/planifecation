import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import GoogleUp from './GoogleUp';
function HomeScreen() {
    //const { user } = route.params;
    //console.log(user);
    const [user, setUser] = React.useState({
        email :"null",
        name :"null",
        picture :"null"
    });


// then display the data!
    return (
        <View style={styles.container}>
            {/* print props */}
            {/*<Image source={{uri: user.picture}} style={{width: 100, height: 100}}/>*/}
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