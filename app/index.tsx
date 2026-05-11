import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

const index = () => {

//const router = useRouter(); 
//useEffect(() => {
//    setTimeout(() => {
//        router.push("/welcome");
//    }, 2000);
//}, []);
  return (
    <View style={styles.container}>
        <Image
        style={styles.logo}
        resizeMode="contain"
        source={require('../assets/logo.png')}
        />
    </View>
  );
}

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    logo: {
        aspectRatio: 1,
        height: "20%",
    },
});