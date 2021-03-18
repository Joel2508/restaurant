import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { Avatar } from 'react-native-elements'


export default function SelectImageUserReview({avatarUser}) {

    
    return (
        <View style ={styles.imageAvatar}>
        <Avatar renderPlaceholderContent= {<ActivityIndicator color ="#fff"/>}
            size ="large"
            rounded
            containerStyle = {styles.imageAvatarUser}
            source = {
                avatarUser ? {uri : avatarUser} : require("../../assets/avatar1.png")
        }
        />
      </View>
 )
}

const styles = StyleSheet.create({
    imageAvatar:{
        alignItems : "center",
        paddingVertical : 10,          
    },
    imageAvatarUser : {
        width : "50%",
        height: 180,
        alignContent: "center"
        
    }
})
