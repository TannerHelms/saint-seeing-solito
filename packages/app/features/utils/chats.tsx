import { DocumentData, addDoc, collection, doc, getDocs, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { Me } from "./users"
import { auth, db } from "../auth";
import uuid from 'react-native-uuid';
export async function CreateChat(user) {
    const me = await Me() as DocumentData;
    const chat = await addDoc(collection(db, "chats"), {
        user_a: {
                ref: me.ref,
                display_name: me.display_name,
                photo_url: me.photo_url
            },
        user_b: {
                ref: user.ref,
                display_name: user.display_name,
                photo_url: user.photo_url
            },
        last_message: "Chat Created",
        last_message_date: serverTimestamp()
    })
    return true
}

export async function GetChats() {
    const me = await Me() as DocumentData;
    const querySnapshot = await getDocs(collection(db, 'chats'))
    let chats = [] as DocumentData[]
    querySnapshot.forEach((doc) => {
        let data = doc.data()
        data.ref = doc.id
        if (data.user_a.ref === me.ref || data.user_b.ref === me.ref) {
            chats.push(data)
        }
    })
    return chats
}

export async function sendMessage(ref, message) {
    const user = auth.currentUser;
    const uid = uuid.v4() as string
    await setDoc(doc(db, 'chats', ref, "messages", uid), {
        body: message,
        sender: user!!.uid,
        timestamp: serverTimestamp()
    })
    }

    export async function getMessages(ref: string) {
        const userUid = auth.currentUser!!.uid
        onSnapshot(
            collection(db, 'chats', ref, 'messages'),
            (snapshot) => {
                const messages = snapshot.docs.map(doc => {
                    let data = doc.data()
                    data.ref = doc.id
                    userUid === data.sender ? data.sent = true : data.sent = false
                    return data
                })
               return messages.reverse()
            }
        )
    }