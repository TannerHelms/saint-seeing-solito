
import { P, Text } from "app/design/typography";
import { View } from "moti";
import { useState } from "react";
import { Button, TextInput } from "react-native";
import { auth } from "../auth/index.native";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignInScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = async () => {
        try {
            const resp = await signInWithEmailAndPassword(auth, email, password)
            console.log('success')
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