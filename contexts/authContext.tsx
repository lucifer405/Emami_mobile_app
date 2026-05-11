import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<UserType>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            //console.log("Auth State Changed:", firebaseUser);
            //console.log("Current User State:", user);
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser?.uid,
                    email: firebaseUser?.email,
                    name: firebaseUser?.displayName,
                });
                updateUserData(firebaseUser?.uid );
                router.replace("/(tabs)");
            } else {
                // User is signed out
                setUser(null);
                router.replace("/(auth)/welcome");
            }
        });
        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true }
        } catch (error) {
            let errorMessage = "An error occurred during login.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            console.error("Login Error:", errorMessage);
            return { success: false, msg: errorMessage };
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            let response = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(firestore, "users", response?.user?.uid), {
                name,
                email,
                uid: response?.user?.uid,
            });
            return { success: true }
        } catch (error) {
            let errorMessage = "An error occurred during registration.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            console.error("Registration Error:", errorMessage);
            return { success: false, msg: errorMessage };
        }
    };

    const updateUserData = async (uid: string) => {
        try {
            const docRef = doc(firestore, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const userData: UserType = {
                    uid: data?.uid || null,
                    email: data.email || null,
                    name: data.name || null,
                    image: data.image || null,

                };
                setUser({ ...userData });
            } else {
                console.error("No such document!");
            }
        } catch (error) {
            let errorMessage = "An error occurred while updating user data.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            console.error("Update User Data Error:", errorMessage);
        }
    };

    const contextValue: AuthContextType = {
        user,
        setUser,
        login,
        register,
        updateUserData,
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;