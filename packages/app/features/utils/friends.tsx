import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  queryEqual,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../auth'
import { DocumentData } from '@google-cloud/firestore'

export async function SendFriendRequest(from: DocumentData, to: DocumentData) {
  await addDoc(collection(db, 'friend_requests'), {
    fromRef: from.ref,
    fromName: from.display_name,
    fromPhotoURL: from.photo_url,
    toRef: to.ref,
    toName: to.display_name,
    toPhotoURL: to.photo_url,
    timestamp: serverTimestamp(),
  })
}

export async function GetStatus(user_a, user_b, setStatus) {
  const q = query(
    collection(db, 'friend_requests'),
    where('fromRef', '==', user_a),
    where('toRef', '==', user_b),
  )
  onSnapshot(q, (snapshot) => {
    if (snapshot.docs.length === 0) {
      setStatus('not friends')
      return
    }
    snapshot.forEach((doc) => {
      const data = doc.data()
      if (data.fromRef === user_a && data.toRef === user_b) {
        setStatus('pending')
      } else if (data.fromRef === user_b && data.toRef === user_a) {
        setStatus('received')
      }
    })
  })
}

export async function GetFriendRequests(userRef) {
  const q = query(
    collection(db, 'friend_requests'),
    where('toRef', '==', userRef),
  )
  const docs = await getDocs(q)
  return docs.docs.map((doc) => {
    let data = doc.data()
    data.ref = doc.id
    return data
  })
}

export async function AcceptFriendRequest(ref: string) {
  const docRef = doc(db, 'friend_requests', ref)
  updateDoc(docRef, {
    status: 'accepted',
  })
}
