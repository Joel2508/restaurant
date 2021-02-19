
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getCurrentUser, isUserLogged } from '../../util/action'

import * as firebase from 'firebase'

import UserGuest from './UserGuest'
import UserLogged from './UserLogged'

export default function Account() {
    

   const [login, setLogin] = useState(null)

    firebase.auth().onAuthStateChanged((user) => {     
        user !== null ? setLogin(true) : setLogin(false)
    })
    
    if (login == null){
       return  <Text>Loanding..</Text>
    }
    return login ? <UserGuest/> : <UserLogged/>

}

const styles = StyleSheet.create({})
