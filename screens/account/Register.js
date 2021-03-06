import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import RegisterForm from '../../components/account/RegisterForm'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view' 


export default function Register() {
    return (
        <KeyboardAwareScrollView style={styles.containerScrollView}>
           <Image
            source = {require("../../assets/images.png")}
            resizeMode = 'stretch'
            style = {styles.image}>
           </Image>

            <RegisterForm/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image: {           
        height: 200,
        width: "105%",    
        marginBottom: 10,
        margin : 30, 
        alignItems : "flex-end"               
      },
      containerScrollView :{
          flex : 1,
          backgroundColor: "white"
      }
})
