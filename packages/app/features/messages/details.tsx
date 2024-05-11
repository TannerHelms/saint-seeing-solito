import { Feather, Ionicons } from '@expo/vector-icons';
import { useEffect, useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, Pressable, ScrollView, TextInput } from "react-native";
import { createParam } from 'solito';
import { Text } from "../../design/typography";
import { View } from "../../design/view";
import { getMessages, sendMessage } from '../utils/chats';
import { auth, db } from '../auth';
import { DocumentData, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
type Params = {
    id?: string
    screen: string
  }
  const { useParams } = createParam<Params>()

export default function DetailsScreen({navigation}) {
    const ref = useParams().params.screen
    const userUid = auth.currentUser!!.uid
    const [messages, setMessages] = useState<DocumentData[]>([])
    const [message, setMessage] = useState<string>()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat'
        })
    }, [navigation])

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

    
    useEffect(() => {
        async function get() {
            const messagesRef = collection(db, 'chats', ref, 'messages')
            const q = query(messagesRef, orderBy("timestamp"))
            onSnapshot(
                q,
                (snapshot) => {
                    let messages = snapshot.docs.map(doc => {
                        let data = doc.data()
                        data.ref = doc.id
                        userUid === data.sender ? data.sent = true : data.sent = false
                        return data
                    })
                   setMessages(messages)
                }
            )
        }
        get()
    }, [db])

    return (
        
            // <ScrollView className="min-h-screen max-h-screen">
            // <KeyboardAvoidingView behavior="position" className="flex-1">
            <View className='flex-1'>
        <View className="p-3">
                <ScrollView 
                     ref={ref => {this.scrollView = ref}}
                     onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                >
                    {messages && messages.map((message, idx) => {
                        return (
                            <View key={idx} className={message.sent ? 'flex flex-row justify-end' : 'flex flex-row justify-start'}>
                                <View className={message.sent ? 'bg-blue-400 p-2 rounded-lg m-2' : 'bg-gray-200 p-2 rounded-lg m-2'}>
                                    <Text className={message.sent ? 'text-white' : 'text-black'}>{message.body}</Text>
                                </View>
                            </View>
                        )
                    })}
                    <View className='h-36'/>
                </ScrollView>
            </View>
            <View className="absolute bottom-0 h-22 bg-white w-full">
                <View className="relative z-50 bg-gray-100 flex flex-row mx-2 rounded-full my-2 p-2 items-center space-x-2 pr-4">
                    <Ionicons name="add" size={24} color="black" className="size-5 z-50 text-gray-500" />
                    <TextInput placeholder="Message..." className="rounded-full text-gray-700 focus:shadow-lg flex-1" onChangeText={setMessage} />
                    <Pressable className="bg-blue-400 p-1.5 rounded-full flex items-center justify-center" onPress={() => sendMessage(ref, message)}>
                        <Feather name="send" size={24} color="white" />
                    </Pressable>
                </View>
            </View>
            </View>
        //    </KeyboardAvoidingView>
        //       </ScrollView>
    )
}