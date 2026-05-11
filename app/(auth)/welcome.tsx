import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import Button from "@/components/Button";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "@/constants/theme";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";

const Welcome = () => {

    const router = useRouter();
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginButton}>
                        <Typo size={20} fontWeight={"500"}>
                            Login
                        </Typo>
                    </TouchableOpacity>
                    <Animated.Image
                        entering={FadeIn.duration(2000)}
                        style={styles.welcomeImage}
                        resizeMode="contain"
                        source={require('../../assets/logo.png')}
                    />
                </View>

                <View style={styles.footer}>
                    <Animated.View entering={FadeInDown.duration(1000).springify().damping(12)}
                        style={{ alignItems: 'center' }}>
                        <Typo size={30} fontWeight={"800"}>
                            Welcome
                        </Typo>
                        <Typo size={30} fontWeight={"800"}>
                            Emami MouldCare
                        </Typo>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(1000).springify().damping(12)}
                        style={{ alignItems: 'center', gap: 2 }}>
                        <Typo size={15} fontWeight={"600"} color={"#A1A1A1"}>
                            Your all-in-one mould inspection solution.
                        </Typo>
                    </Animated.View>
                </View>

                <View style={styles.buttonContainer}>
                    <Button onPress={() => router.push('/register')}>
                        <Typo size={22} color={colors.neutral900} fontWeight={"600"}>
                            Get Started
                        </Typo>
                    </Button>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    welcomeImage: {
        width: '100%',
        height: '50%',
        alignSelf: 'center',
        marginTop: 10,
    },
    loginButton: {
        alignSelf: "flex-end",
        marginRight: 20,
    },
    footer: {
        alignItems: 'center',
        paddingTop: 10,
        gap: 2,
        shadowColor: '#644c0a',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 5,
    },
    buttonContainer: {
        width: '90%',
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginBottom: 40,
    },
});