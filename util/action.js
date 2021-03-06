import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { fileToBlob } from './helper'

import * as Notifications from 'expo-notifications'
 
import Constants from 'expo-constants'

import {FireSQL} from  'firesql'

import {map} from 'loadsh'
import { Alert, Platform, PlatformColor } from 'react-native'
import { not } from 'react-native-reanimated'
const db = firebase.firestore(firebaseApp)


const firesql = new FireSQL (firebase.firestore(), {includeId : "id"})


export const isUserLogged = () =>{

    let isLogged = false    
    firebase.auth().onAuthStateChanged((user) => {             
        user !== null && isLogged == true
    })

    return isLogged
}

export const getCurrentUser = () => {
    
    const user =  firebase.auth().currentUser
    if(user ===  null){
        return null
    }
    return user
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

    const result = { statusResponse: true, error: null}
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

export const updateEmail = async(email) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updatePassword = async(password) => {
    const result = { statusResponse: true, error: null }    
    try {
        await firebase.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const reauthencate = async(password) => {
    const result = { statusResponse: true, error: null }
    const user = getCurrentUser()    
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
    
    try {
        await user.reauthenticateWithCredential(credentials)        
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result    
}



export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: true, error: null }    
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getRestaurant   = async(LimiteRestaurants) => {
    const result = { statusResponse: true, error: null, restaurants: [], startRestaurants: null}    
    try {
        const response =  await db.collection("restaurants").orderBy("createA", "desc").limit(LimiteRestaurants).get()
        if(response.docs.length > 0){
           result.startRestaurants = response.docs[response.docs.length - 1]
        }
        response.forEach((docs) => {
            const restaurant = docs.data()
            restaurant.id = docs.id
            result.restaurants.push(restaurant)
        } )
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getMoreRestaurant   = async(LimiteRestaurants, startRestaurants) => {
    const result = { statusResponse: true, error: null, restaurants: [], startRestaurants: null}    
    try {
        const response =  await db.collection("restaurants")
        .orderBy("createA", "desc")
        .startAfter(startRestaurants.data().createA)
        .limit(LimiteRestaurants)
        .get()
        if(response.docs.length > 0){
           result.startRestaurants = response.docs[response.docs.length - 1]
        }
        response.forEach((docs) => {
            const restaurant = docs.data()
            restaurant.id = docs.id
            result.restaurants.push(restaurant)
        } )
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getDocumentById = async(collection, id) => {
    const result = { statusResponse: true, error: null, document: null}    
    try {
        const response =  await db.collection(collection).doc(id).get()
        result.document = response.data()
        result.document.id = response.id  
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updateDocumentRestaurantById = async(collection, id, data) => {
    const result = { statusResponse: true, error: null, document: null}    
    try {
        await db.collection(collection).doc(id).update(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}


export const getRestaurantReviewById   = async(id) => {
    const result = { statusResponse: true, error: null, reviews: []}    
    try {
        const response =  await db.collection("reviews")
        .where("idRestaurant", "==", id)
        .get()

        response.forEach((docs) => {
            const review = docs.data()
            review.id = docs.id
            result.reviews.push(review)
        } )
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}
export const getFavorite = async(idRestaurant) => {
    const result = { statusResponse: true, error: null, isFavorite : false }    
    try {
       const response =  await db.collection("favorites")
       .where("idRestaurant", "==", idRestaurant)
       .where("idUser", "==", getCurrentUser().uid)
       .get()
       result.isFavorite = response.docs.length > 0       
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const removeFavorite = async(idRestaurant) => {
    const result = { statusResponse: true, error: null }    
    try {
       const response =  await db.collection("favorites")
       .where("idRestaurant", "==", idRestaurant)
       .where("idUser", "==", getCurrentUser().uid)
       .get()
        response.forEach(async (doc)=> {
          const favoriteId = doc.id
          await db.collection("favorites").doc(favoriteId).delete()
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getFavorites = async() => {
    const result = { statusResponse: true, error: null, favorites : [] }    
    try {
       const response =  await db.collection("favorites")
       .where("idUser", "==", getCurrentUser().uid)
       .get()
        await Promise.all(
            map(response.docs, async(doc)=> {
                const favorite = doc.data()
                const responseRestaurants = await getDocumentById("restaurants", favorite.idRestaurant)                
                if(responseRestaurants.statusResponse){
                    result.favorites.push(responseRestaurants.document)
                }
            })
        )
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getTopRestaurant = async(limit) => {
    const result = { statusResponse: true, error: null, restaurants : [] }    
    try {
       const response =  await db.collection("restaurants")
       .orderBy("rating", "desc")
       .limit(limit)
       .get()
       response.forEach((doc) => {
           const restaurant = doc.data()
           restaurant.id  = doc.id
           result.restaurants.push(restaurant)
       })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const searchRestaurant = async(search) => {
    const result = { statusResponse: true, error: null, restaurants : [] }    
    try {
        result.restaurants = await firesql.query(`SELECT * FROM restaurants WHERE name LIKE  '${search}%'  `)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}


export const getToken = async() => {
    if(!Constants.isDevice){
        Alert.alert("You must a physical device for notification.")
        return
    }

    const {status : existingStatus} = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if(existingStatus !== "granted"){
        const {status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
    }
    if(finalStatus !== "granted"){
        Alert.alert("You must the permission for notification.")
        return
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data
    
    
    if(Platform.OS == "android"){
        Notifications.setNotificationChannelAsync("defautl",  {
            name :  "defautl",
            importance : Notifications.AndroidImportance.MAX,
            vibrationPattern : [0,250, 250, 250],
            lightColor: "#FF231F7C"

        })
    }

    return token 

}



export const addDocumentWithId = async(collection, data, doc) => {
    const result = { statusResponse: true, error: null }    
    try {
        await db.collection(collection).doc(doc).set(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

Notifications.setNotificationHandler({
    handleNotification: async() =>({
        shouldShowAlert : true,
        shouldPlaySound : true,
        shouldSetBadge : true
    })
})
export const startNofications = (notificationListener, responseListener) =>{
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener(notification => {
        
    })

    return () => {
        Notifications.removeNotificationSubscription(notificationListener)
        Notifications.removeNotificationSubscription(responseListener)
    }
}

export const sendPushNotifications = async(message) =>{
    let response = false
    await fetch("https://exp.host/--/api/v2/push/send", {
        method : "POST",
        headers : {
         Accept : "application/json",
         "Accept-encoding": "gzip, deflate",
         "Content-Type" : "application/json",
        },
        body: JSON.stringify(message),
    }).then(() =>  response = true) 

    return response
}

export const setNotificationsMessage = (token, title, body, data) => {
    const message = {
        to: token,
        sound : "default", 
        title: title,
        body: body,
        data: data
    }
    return message
}


export const getUserFavorite = async(restaurantId)=> {

    const result = {statusResponse : true , error : null, users :[] }
    try {
        const response = await db.collection("favorites").where("idRestaurant", "==", restaurantId).get()
        await Promise.all(

            map(response.docs, async(doc)=>{
              const favorite = doc.data()
              const user = await getDocumentById("users", favorite.idUser)
              if(user.statusResponse){
                  result.users.push(user.document)
              }
            })

        )
    } catch (error) {
        result.error = error
        result.statusResponse = false
    }
    return result
}


export const sendEmailResetPassword = async(email) => {
    const result = { statusResponse: true, error: null }    
    try {
        await firebase.auth().sendPasswordResetEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}


export const getDocumentByIdUser = async() => {

    const user =  firebase.auth().currentUser
    
    const result = {statusResponse : null, error: null, typeUser : null}
    try {
        if(user === null){
            return result
        }
        const response =  await db.collection("users").doc(user.uid).get()
        result.typeUser = response.data().typeUserValue
        result.statusResponse = true        
    } catch (error) {
        result.statusResponse = false,
        result.error = error

    }
    return result

}

