import { Feather } from '@expo/vector-icons';
import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Row } from "../../design/layout";
import { P } from "../../design/typography";
import { View } from "../../design/view";
import { db } from "../auth";
import { ChatTile } from '../profile/chat-tile';
import { CreateChatModal } from "./create-chat-modal";
import { Pressable } from 'react-native';
import { useRouter } from 'solito/router';

export default function MessageScreen() {
    const [chats, setChats] = useState<DocumentData[]>([])
    const [modal, setModal] = useState(false)
    const router = useRouter()
    useEffect(() => {
        async function get() {
            onSnapshot(
                collection(db, 'chats'),
                (snapshot) => {
                    const chats = snapshot.docs.map(doc => {
                        let data = doc.data()
                        data.ref = doc.id
                        return data
                    })
                    setChats(chats)
                }
            )
        }
        get()
    }, [db])

    function toggle() {
        setModal(!modal)
    }

    return (
        <View className='p-4 space-y-4'>
            <CreateChatModal visible={modal} toggle={toggle}/>
            <Row className='justify-between'>
                <P>Below are your chats</P> 
                <Feather name="edit" size={24} color="black" onPress={() => setModal(true)} />
            </Row>
            <View className='space-y-10'>
                {chats.map((chat: any, idx) => {
                    return (
                        <Pressable onPress={() => {router.push('/details/' + chat.ref)}} key={idx}>
                        <ChatTile chat={chat} />
                    </Pressable>
                    )
})}
            </View>
        </View>
    )
}


