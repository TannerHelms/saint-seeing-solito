import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { auth, db } from '../auth'
import * as Location from 'expo-location'
import calcCrow from './calc-crow'
import { GetFriendCount } from './friends'
const API_KEY = 'AIzaSyBeSjc6Te10EBzAxR9pye0E7jd8lm2ekP0'
export async function Users() {
  let { status } = await Location.requestForegroundPermissionsAsync()

  if (status !== 'granted') {
  } else {
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
    })
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        location.coords.latitude +
        ',' +
        location.coords.longitude +
        '&key=' +
        API_KEY,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const resp = responseJson['results'][0]['formatted_address']
        const address_components = resp.split(',')
        const city = address_components[1].trim()
        const state = address_components[2].trim().split(' ')[0].trim()
        updateDoc(doc(db, 'users', auth.currentUser!!.uid), {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          location: city + ', ' + state,
        })
      })
  }

  const querySnapshot = await getDocs(collection(db, 'users'))
  let users = [] as DocumentData[]
  const me = await Me()

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      let data = doc.data()
      data.ref = doc.id
      data.distance = calcCrow(
        me!.latitude,
        me!.longitude,
        data.latitude,
        data.longitude,
      ).toFixed(0)
      data.friends = await GetFriendCount(doc.id)
      users.push(data)
    }),
  )
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
