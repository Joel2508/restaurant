import React, { useState } from 'react'
import {Alert, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { updateProfile, uploadImage } from '../../util/action'
import { loadImageFromGallery } from '../../util/helper'

export default function InforUser({ user, setLoading, setLoadingText }) {
    const [photoUrl, setPhotoUrl] = useState(user.photoURL)

    const changePhoto = async() =>{

     const result = await loadImageFromGallery([1,1])

     if (!result.status ){
         return
     }
      setLoadingText("Update Image....") 

      setLoading(true)

      const resultUploadImage = await uploadImage(result.image,  "avatars", user.uid) 
      console.log(resultUploadImage)

      if(!resultUploadImage.statusResponse){
          setLoading(false)
          Alert.alert("Error loading the image....")
          return
      }
      const resulUpdateProfile = await updateProfile({photoURL : resultUploadImage.url})
      setLoading(false)
      if(resulUpdateProfile.stastuResponse){
       setPhotoUrl(resulUpdateProfile.url)
      }else{
        Alert.alert("Error update the image profile ....")

      }
    }

    return (
        <View style={styles.container}>
            <Avatar 
             rounded
             size ="large"
             onPress = {() => changePhoto()}
             containerStyle ={styles.avatar}
             source ={
                 user.photoURL ? {uri : photoUrl} : require("../../assets/avatar1.png")
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
