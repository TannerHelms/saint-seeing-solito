
import { P, Text } from "app/design/typography";
import { View } from "moti";
import { useEffect, useState } from "react";
import { Button, TextInput } from "react-native";
import { auth } from "../auth/index";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "solito/router";
import { AuthGate } from "../auth/auth-gate";

export default function SignInScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (auth.currentUser) {
            router.replace("/")
        }
    }, [])

    const submitForm = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            router.replace("/")
        } catch (error) {
            if (error.code.includes("invalid")) {
                console.log("Invalid email or password")    
            } else {
                console.log(error)
            }
        }
    }

    return (
        <View className="flex-1 items-center justify-center">
            <TextInput value={email} onChangeText={(text) => setEmail(text)} placeholder="Email" />
            <TextInput value={password} onChangeText={(text) => setPassword(text)} placeholder="password" />
            <Button title="Submit" onPress={submitForm} />
        </View>
    )
}