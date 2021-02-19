import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../../components/Loading'

export default function UserGuest() {
    return (
        <View>         
            <Loading isVisible = {true}> Loading...</Loading>
        </View>
    )
}

const styles = StyleSheet.create({})
