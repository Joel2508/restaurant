import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import { closeSession } from '../../util/action'

export default function UserLogged() {

    const navigation = useNavigation()
    return (
        <View>
            <Text>UserLogged....</Text>
            <Button 
            title="Log Out"
            onPress ={() =>{ 
                closeSession()
                navigation.navigate("restaurants")
                }}/>
        </View>
    )
}

const styles = StyleSheet.create({})
