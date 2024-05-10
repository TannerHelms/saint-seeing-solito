import { DocumentData, collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { auth, db } from '../auth'

export async function Users() {
  const querySnapshot = await getDocs(collection(db, 'users'))
  let users = [] as DocumentData[]
  querySnapshot.forEach((doc) => {
    let data = doc.data()
    data.ref = doc.id
    users.push(data)
  })
  return users
}

export async function Me() {
  if (auth.currentUser) {
    const querySnapshot = await getDoc(doc(db, 'users', auth.currentUser.uid))
    let data = querySnapshot.data() as DocumentData
    data.ref = querySnapshot.id
    return data
  }
  return null
}
