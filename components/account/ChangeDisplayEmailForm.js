import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import {isEmpty} from 'loadsh'

import { validateEmail } from '../../util/helper'
import { updateEmail, reauthencate } from '../../util/action'


export default function ChangeDisplayEmailForm({displayEmail, setshoModal, toastRef, setReloadUser}) {

    const [loading, setLoading] = useState(false)
    const [newEmail, setNewEmail] = useState(displayEmail)
    const [showPassword, setShowPassword] = useState(null)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const updateSubmitEmail = async() =>{

        if(!validForm()){
        return        
      }
        setLoading(true)
        const resultreauthencate = await reauthencate(password)

         if(!resultreauthencate.statusResponse){
            setLoading(false)
            setErrorPassword("Your password is incorrent.")
            return
         }
        const resultUpdateEmail  = await updateEmail(newEmail)
        setLoading(false)

        if(!resultUpdateEmail.statusResponse){
            setLoading(false)
            setErrorEmail("Not can't change your new email.")
            return
        }
        setReloadUser(true)
        toastRef.current.show("Success update email to :" + newEmail, 3000)
        setshoModal(false)
    }

    const onChange = (e) =>{
        setPassword(e.nativeEvent.text)
     }

    const validForm =() => {
        let isvalid = true
        setErrorEmail(false)

        setErrorPassword(false)
        if(!validateEmail(newEmail)){
            setErrorEmail("You must enter an valid email.")
            isvalid = false 
         } 
       if(newEmail === displayEmail){
        setErrorEmail("You must enter the different is this " + displayEmail)
        isvalid = false
       }
       if(isEmpty(password)){
        setErrorPassword("You must enter passoword actually ")
        isvalid = false
       }
      return isvalid
    }

return (
    <View style={styles.view}>
        <Input style={styles.input}
         defaultValue ={displayEmail}    
         placeholder = "Enter your Email...."     
         errorMessage = {errorEmail}         
         keyboardType = "email-address"
         
         onChange ={(e) => setNewEmail(e.nativeEvent.text)}         
            leftIcon = {
                <Icon
                type ="material-community"
                name = "at"
                iconStyle={styles.icon}
                /> }/>            
             <Input 
            containerStyle ={styles.input}
            placeholder="Enter your password..."
            password={password}
            secureTextEntry= {!showPassword}
            errorMessage = {errorPassword}
            onChange={(e) => onChange(e)}
            defaultValue ={password}
            leftIcon={
                <Icon
                type ="material-community"
                name = {showPassword  ?  "eye-off-outline" : "eye-outline"}
                iconStyle={styles.icon}
                onPress = {() => setShowPassword(!showPassword)}
                   /> }/>


        <Button
        containerStyle = {styles.btncontainer}
        onPress = {updateSubmitEmail} 
        title="Update"
        buttonStyle ={styles.btnButton}
        loading = {loading}/>
    </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems : "center",
        paddingVertical : 10,          
    },
    input: {
        marginBottom: 10,    
    }, 
    btnButton:{
        backgroundColor : "#3c3c4c",
        borderRadius: 26,
        alignItems: "center",        
    },
    btncontainer: {
        width : "100%"
    },
    icon:{
        color: "#3c3c4c"
    }

})
