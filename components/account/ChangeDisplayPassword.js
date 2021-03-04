import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {isEmpty, size} from 'loadsh'
import { Button, Icon, Input } from 'react-native-elements'
import { reauthencate, updatePassword } from '../../util/action'

export default function ChangeDisplayPassword({ setshoModal, toastRef}) {

const [password, setPassword] = useState(null)
const [newPassword, setNewPassword] = useState(null)
const [confirmPassword, setConfirmPassword] = useState(null)

const [errorPassword, setErrorPassword] = useState(null)
const [errorNewPassword, setErrorNewPassword] = useState(null)
const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)

const [showPassword, setShowPassword] = useState(false)
const [loading, setLoading] = useState(false)



    
const updatePasswordUser = async() =>{

    if(!validedPassword()){
        return
    }
      
    setLoading(true)

    const resultPassword = await reauthencate(password)        
    
    if(!resultPassword.statusResponse){ 
        setLoading(false)
        setErrorPassword("This is password incorrent. ")
        return
      }

    const resultSuccess = await updatePassword(newPassword)
    
    if(!resultSuccess.statusResponse ){
        setErrorPassword("Error in the password.")   
        return
    }
    
    clearFiled()
    setLoading(false)
    toastRef.current.show("Update your password. ", 3000)
    setshoModal(false)

}

const validedPassword = () =>{

    if(isEmpty(password)) {
        setErrorPassword("This filed is empty.")
        return false
    }
    if(size(password) < 6) {
        setErrorPassword("You much enter a 6 character  password")
        return false
    }
    if(isEmpty(newPassword)) {
        setErrorNewPassword("Enter must your new password.")
        setErrorPassword("")
        return false
    }
    if(size(newPassword) < 6) {
        setErrorNewPassword("You much enter a 6 character new password.")
        setErrorPassword("")
        return false
    }

    if(isEmpty(confirmPassword)) {
        setErrorConfirmPassword("Enter must' the confirm password")
        setErrorNewPassword("")
        return false
    }

    if(size(confirmPassword) < 6) {
        setErrorConfirmPassword("You much enter a 6 character password confirm.")
        setErrorNewPassword("")
        return false
    }

    if(confirmPassword !== newPassword){
        setErrorConfirmPassword("The new password and that confirm password not equal.")        
        return
        return false
    }
    if(password === newPassword){
        setErrorPassword("You must enter the password different that actuality.")                
        setErrorNewPassword("You must enter the password different that actuality.")                
        setErrorConfirmPassword("You must enter the password different that actuality.")                
        return false
    }
    return true
}
 const clearFiled =() => {
    setErrorNewPassword("")
    setErrorPassword("")
    setErrorConfirmPassword("")
 }
    return (
        <View style ={styles.view}>
            <Input 
            
            containerStyle ={styles.input}
            placeholder="Enter your password..."
            password={true}
            secureTextEntry= {!showPassword}
            onChange={(e) => setPassword(e.nativeEvent.text)}            
            defaultValue ={password}
            errorMessage ={errorPassword}
            leftIcon = {
            <Icon
              type="material-community"
              name = "lock-reset"
              iconStyle = {styles.icon}
             />}
            rightIcon={
            <Icon
              type ="material-community"
              name = {showPassword  ?  "eye-off-outline" : "eye-outline"}
              iconStyle={styles.icon}
              onPress = {() => setShowPassword(!showPassword)}
             />
             }/>

            <Input 
            containerStyle ={styles.input}
            placeholder="Enter your new password..."
            password={true}
            secureTextEntry= {!showPassword}
            onChange={(e) => setNewPassword(e.nativeEvent.text)}            
            errorMessage = {errorNewPassword}
            defaultValue ={newPassword}
            leftIcon = {
                <Icon
                  type="material-community"
                  name = "lock-reset"
                  iconStyle = {styles.icon}
                 />}    
            rightIcon={
            <Icon
              type ="material-community"
              name = {showPassword  ?  "eye-off-outline" : "eye-outline"}
              iconStyle={styles.icon}
              onPress = {() => setShowPassword(!showPassword)}
             />
             }/>
             <Input 
            containerStyle ={styles.input}
            placeholder="Enter your confirm password..."
            password={true}
            secureTextEntry= {!showPassword}
            onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
            errorMessage = {errorConfirmPassword}
            defaultValue ={confirmPassword}
            leftIcon = {
                <Icon
                  type="material-community"
                  name = "lock-reset"
                  iconStyle = {styles.icon}
                 />}
    
            rightIcon={
                <Icon
                type ="material-community"
                name = {showPassword  ?  "eye-off-outline" : "eye-outline"}
                iconStyle={styles.icon}
                onPress = {() => setShowPassword(!showPassword)}
                   /> }/>

            <Button 
            title = "Update"
            containerStyle ={styles.btnContainer}
            buttonStyle ={styles.btnButton}
            onPress = { updatePasswordUser }
            loading ={loading}
            >

            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        alignItems : "center",
        paddingVertical : 20
    },
    container: {
        marginBottom : 10
    },
    btnContainer: {
        width : "100%"
    },
    btnButton: {
        backgroundColor : "#3c3c4c",
        borderRadius: 26,
        alignItems: "center",
        marginBottom : 20,
        height: 50

    }
})
