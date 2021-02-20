
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {  isUserLogged } from '../../util/action'

import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import Loading from '../../components/Loading'

export default function Account() {
    const [Login, setLogin] = useState(null)

    useEffect(() => {
        setLogin(isUserLogged())
    }, [])
    
    if (Login == null){
       return  <Loading isVisible= {true} text="Loading..."/>
    }
    return Login ?  <UserLogged/> : <UserGuest/>


}

const styles = StyleSheet.create({})
