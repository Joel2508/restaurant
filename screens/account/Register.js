import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import RegisterForm from '../../components/account/RegisterForm'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view' 


export default function Register() {
    return (
        <KeyboardAwareScrollView style={styles.containerScrollView}>
           <Image
            source = {require("../../assets/restaurante1.png")}
            resizeMode = 'stretch'
            style = {styles.image}>
           </Image>

            <RegisterForm/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    image: {           
        height: 150,
        width: "90%",    
        marginBottom: 20,
        margin : 20, 
        alignItems : "flex-end"               
      },
      containerScrollView :{
          flex : 1,
          marginTop: 10
      }
})
