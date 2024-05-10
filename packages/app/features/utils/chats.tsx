import { DocumentData, addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { Me } from "./users"
import { db } from "../auth";

export async function CreateChat(user) {
    const me = await Me() as DocumentData;
    await addDoc(collection(db, "chats"), {
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
        if (data.user_a.ref === me.ref || data.user_b.ref === me.ref) {
            chats.push(data)
        }
    })
    return chats
}