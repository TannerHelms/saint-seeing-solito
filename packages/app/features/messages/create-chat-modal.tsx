import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Users } from "../utils/users";
import { db } from "../auth";
import { CreateChat } from "../utils/chats";
import { Modal, Pressable } from "react-native";
import { View } from "../../design/view";
import { Text } from "../../design/typography";
import { Row } from "../../design/layout";
import { Ionicons } from "@expo/vector-icons";

export function CreateChatModal({toggle, visible}) {
    const [users, setUsers] = useState<DocumentData[]>([])
    useEffect(() => {
        async function get() {
            const users = await Users();
            setUsers(users)
        }
        get()
    }, [db])

    async function createChat(user) {
        await CreateChat(user)
        toggle()
    }

    if (users) {
        return (
            <Modal visible={visible} transparent={true} animationType="slide">
            <Pressable className='flex-1 bg-[#00000080] cursor-pointer' onPress={toggle}>
                <View className="bg-white mt-12 w-[80%] mx-auto rounded-xl p-4 space-y-4" >
                    <Row className="justify-between items-center">
                        <Text>Create New Chat</Text>
                        <Ionicons name="exit" size={24} color="black" />
                    </Row>
                        {users.map((user: any) => (
                            <Row key={user.ref} className="justify-between items-center">
                                <Text>{user.display_name}</Text>
                                <Pressable onPress={() => createChat(user)}>
                                    <Ionicons name="add" size={24} color="black" />
                                </Pressable>
                            </Row>
                        ))}
                </View>
            </Pressable>
        </Modal>
    )
}
}