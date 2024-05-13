import { View } from "packages/app/design/view";
import { useEffect, useState } from "react";
import CustomButton from "../utils/custom-button";
import CustomTextInput from "../utils/custom-text-input";
import { updatePassword } from "firebase/auth";
import { auth } from "../auth";
import { useRouter } from "solito/router";
export default function PasswordScreen({navigation}) {
    const router = useRouter()
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none"
          }
        });
        return () => navigation.getParent()?.setOptions({
          tabBarStyle: undefined
        });
      }, [navigation]);

    
    async function handleSubmit() {
        updatePassword(auth.currentUser!!, password).then(() => {
            setPassword('')
            router.replace('/Profile')
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <View className="px-2 space-y-4 pt-4">
            <CustomTextInput onChange={setPassword} icon="lock-closed" placeholder="New Password..."/>
            <CustomButton text="Change Password" onPress={handleSubmit} className="bg-primary rounded-xl py-2" textColor="text-black" />
        </View>
    )
}

