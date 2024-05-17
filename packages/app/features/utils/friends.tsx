import { DocumentData } from '@google-cloud/firestore'
import {
  addDoc,
  and,
  collection,
  doc,
  onSnapshot,
  or,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../auth'

export async function SendFriendRequest(from: DocumentData, to: DocumentData) {
  await addDoc(collection(db, 'friend_requests'), {
    fromRef: from.ref,
    fromName: from.display_name,
    fromPhotoURL: from.photo_url,
    toRef: to.ref,
    toName: to.display_name,
    toPhotoURL: to.photo_url,
    status: 'pending',
    chat: 'false',
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
      if (data.status === 'accepted') {
        setStatus('Friends')
      } else if (data.fromRef === user_a && data.toRef === user_b) {
        setStatus('Pending')
      } else if (data.fromRef === user_b && data.toRef === user_a) {
        setStatus('Received')
      }
    })
  })
}

export async function SetFriendRequests(
  userRef,
  setFriendRequests,
  loading,
  status = 'pending',
) {
  const q = query(
    collection(db, 'friend_requests'),
    where('toRef', '==', userRef),
    where('status', '==', status),
  )
  onSnapshot(q, (snapshot) => {
    const requests = snapshot.docs.map((doc) => {
      let data = doc.data()
      data.ref = doc.id
      return data
    })
    setFriendRequests(requests)
    loading(false)
  })
}

export async function AcceptFriendRequest(ref: string) {
  const docRef = doc(db, 'friend_requests', ref)
  updateDoc(docRef, {
    status: 'accepted',
  })
}

export async function SetFriends(userRef, setFriends, loading) {
  const q = query(
    collection(db, 'friend_requests'),
    and(
      or(where('fromRef', '==', userRef), where('toRef', '==', userRef)),
      where('status', '==', 'accepted'),
    ),
  )
  onSnapshot(q, (snapshot) => {
    const friends = snapshot.docs.map((doc) => {
      let data = doc.data()
      if (data.fromRef === userRef) {
        data.ref = data.toRef
        data.name = data.toName
        data.photoURL = data.toPhotoURL
      } else {
        data.ref = data.fromRef
        data.name = data.fromName
        data.photoURL = data.fromPhotoURL
      }

      data.ref = doc.id
      return data
    })
    setFriends(friends)
    loading(false)
  })
}

export async function SetCreateChats(userRef, setFriends, loading) {
  const q = query(
    collection(db, 'friend_requests'),
    and(
      or(where('fromRef', '==', userRef), where('toRef', '==', userRef)),
      where('status', '==', 'accepted'),
      where('chat', '==', 'false'),
    ),
  )
  onSnapshot(q, (snapshot) => {
    const friends = snapshot.docs.map((doc) => {
      let data = doc.data()
      if (data.fromRef === userRef) {
        data.ref = data.toRef
        data.name = data.toName
        data.photoURL = data.toPhotoURL
      } else {
        data.ref = data.fromRef
        data.name = data.fromName
        data.photoURL = data.fromPhotoURL
      }

      data.ref = doc.id
      return data
    })
    setFriends(friends)
    loading(false)
  })
}
