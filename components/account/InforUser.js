import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'

export default function InforUser({ user }) {
    console.log(user)
    return (
        <View style={styles.container}>
            <Avatar 
             rounded
             size ="large"
             containerStyle ={styles.avatar}
             source ={
                 user.photoURL ? {uri : photoURL} : require("../../assets/avatar1.png")
             }
            />
            <View style={styles.inforUser}>
                <Text style={styles.displayName}>
                    {
                        user.displayName ? user.displayName : "Anonymous"
                    }
                </Text>
                <Text>
                    {user.email}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : "row",
        backgroundColor : "#f9f9f9",
        paddingVertical : 30
    },
    avatar : {
        borderColor : "#c1c1c1",
        backgroundColor : "#ffffff",
        width : 100,
        height: 100
    },
    inforUser: {
     marginLeft : 20,     
    },
    displayName :{
      fontWeight : "bold",
      paddingBottom : 5
    }
})
