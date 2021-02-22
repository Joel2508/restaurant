
import React, { useState, useEffect,useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {  getCurrentUser, isUserLogged } from '../../util/action'
import { useFocusEffect } from '@react-navigation/native'

import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import Loading from '../../components/Loading'


export default function Account() {
    const [Login, setLogin] = useState(null)

    useFocusEffect(
        useCallback(() => {
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)
            },[])
    )
    
    if (Login == null){
       return  <Loading isVisible= {true} text="Loading..."/>
    }
    return Login ?  <UserLogged/> : <UserGuest/>


}

const styles = StyleSheet.create({})
