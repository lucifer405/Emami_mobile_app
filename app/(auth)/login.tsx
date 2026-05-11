import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import BackButton from "@/components/BackButton";
import { router, useRouter } from "expo-router";
import Input from "@/components/input";
import * as Icons from "phosphor-react-native";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/authContext";

const Login = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {login : loginUser} = useAuth();
    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Login", 'Please fill in both email and password fields.');
            return;
            // Handle login logic here, using emailRef.current and passwordRef.current
        }
        setIsLoading(true);
        const res = await loginUser(emailRef.current,passwordRef.current);
        setIsLoading(false);
        console.log('login with', res);
        if(res.success){
            Alert.alert("Login Successful", 'You have logged in successfully.');
            //router.push('/(tabs)');
        } else {
            Alert.alert("Login Failed", res.msg || 'Invalid email or password. Please try again.');
        }
    };
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <BackButton iconSize={28} />

                <View style={{ gap: 4, marginTop: spacingY._20 }}>
                    <Typo size={30} fontWeight={800} >
                        Welcome Back
                    </Typo>
                </View>
                <View style={styles.form}>
                    <Typo size={16} color={colors.textLighter}>
                        Login Now
                    </Typo>
                    <Input
                        placeholder="Enter You Email-Id"
                        onChangeText={(value) => (emailRef.current = value)}
                        icon={<Icons.At
                            size={verticalScale(26)}
                            color={colors.neutral300}
                            weight="fill" />}
                    />
                    <Input
                        placeholder="Enter You Password"
                        secureTextEntry
                        onChangeText={(value) => (passwordRef.current = value)}
                        icon={<Icons.Lock
                            size={verticalScale(26)}
                            color={colors.neutral300}
                            weight="fill" />}
                    />
                    <Typo style={styles.forgotPassword} size={14}>
                        Forgot Password?
                    </Typo>
                    <Button loading={isLoading} onPress={handleLogin}>
                        <Typo size={21} color={colors.black} fontWeight={"600"}>
                            Login
                        </Typo>
                    </Button>
                </View>

                {/*footer*/}
                <View style={styles.footer}>
                    <Typo size={15}>
                        Don't have an account?
                    </Typo>
                    <Pressable onPress={() => router.navigate('/register')}>
                        <Typo size={15} fontWeight={"bold"} color={colors.primary}>
                            Sign Up
                        </Typo>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
        paddingHorizontal: spacingY._20,
    },
    welcomeText: {
        fontSize: verticalScale(20),
        fontWeight: 'bold',
        color: colors.text,
    },
    form: {
        gap: spacingY._20,
    },
    forgotPassword: {
        fontSize: verticalScale(14),
        alignSelf: 'flex-end',
        textAlign: 'right',
        fontWeight: '500',
        color: colors.text,

    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    footerText: {
        textAlign: 'center',
        color: colors.text,
        fontSize: verticalScale(15),
    },
});