import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { fileToBlob } from './helper'

const db = firebase.firestore(firebaseApp)



export const isUserLogged = () =>{

    let isLogged = false    
    firebase.auth().onAuthStateChanged((user) => {             
        user !== null && isLogged == true
    })

    return isLogged
}


export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const closeSession = () => {
    return firebase.auth().signOut()
}


export const registerUser = async(email, password) => {
    const result = {statusResponse : true, error: null}
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Your cannot register this email in this application, it is registered "
    }
    return result
}


export const signInWithEmailAndPassword = async(email, password) => {
    const result = {statusResponse : true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "User or password invalid"
    }
    return result
}

export const uploadImage = async(image, path, name) => {
   const resutl = {statusResponse : false, error : null, url: null }
   const ref = firebase.storage().ref(path).child(name)
   const blob = await fileToBlob(image)

   try {
       await ref.put(blob)
       const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
       resutl.statusResponse = true
       resutl.url = url
   } catch (error) {
       resutl.statusResponse = false
       resutl.error = error
   }
   return resutl
}

export const updateProfile = async(data) => {
    const result = {stastuResponse : true, error : null}
    try {
        await firebase.auth().currentUser.updateProfile(data)
    } catch (error) {
        result.stastuResponse = false
        result.error = error
    }
    return result

}