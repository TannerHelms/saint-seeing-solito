import { KeyboardAvoidingView, ScrollView, TextInput } from "react-native";
import { Text } from "../../design/typography";
import { View } from "../../design/view";
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";
export default function DetailsScreen({navigation}) {

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

    return (
    <KeyboardAvoidingView behavior="position" className="flex-1">
        <View className="flex min-h-screen">
            <View className="flex-">
                <ScrollView>
                    <Text>Messages Container</Text>
                </ScrollView>
            </View>
            <View className="absolute bottom-0 h-36 bg-white w-full">
                <Text>Send Message Container</Text>
                <View className="flex items-center p-3 rounded-full relative">
                    <Ionicons name="add" size={24} color="black" className="size-5 z-50 text-gray-500" />
                    <TextInput placeholder="message..." className="absolute bg-gray-100 inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white " />
                </View>
            </View>
        </View>
    </KeyboardAvoidingView>
    )
}