
import { signInWithEmailAndPassword } from "firebase/auth";
import { View } from "moti";
import { useEffect, useState } from "react";
import { Button, TextInput } from "react-native";
import { useRouter } from "solito/router";
import { auth } from "../auth/index";

export default function SignInScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    // useEffect(() => {
    //     console.log(navigation)
        // navigation.getParent()?.setOptions({
        //   tabBarStyle: {
        //     display: "none"
        //   }
        // });
        // return () => navigation.getParent()?.setOptions({
        //   tabBarStyle: undefined
        // });
    //   }, [navigation]);

    useEffect(() => {
        if (auth.currentUser) {
            router.replace("/")
        }
    }, [])

    const submitForm = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log('Signed in')
        } catch (error) {
            console.log(error)
            console.log("Invalid email or password")    
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