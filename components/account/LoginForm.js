import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { signInWithEmailAndPassword } from '../../util/action'
import {isEmpty} from 'lodash'

import {useNavigation} from '@react-navigation/native'
import Loading from '../Loading'
import { validateEmail } from '../../util/helper'


export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormDataValue())

    const [erroEmail, seterroEmail] = useState("")
    const [erroPassword, seterroPassword] = useState("")

    const [loadgin, setLoadgin] = useState(false)
    const navigation = useNavigation()
    const onChange =(e, type) => {
        setFormData({...formData, [type] : e.nativeEvent.text})
     }

     const initialUser = async() => {
        if (!validateData()){
            return;
        }
        setLoadgin(true)

        const resutl = await signInWithEmailAndPassword(formData.email, formData.password)
        
        setLoadgin(false)
        
        if(!resutl.statusResponse){
         seterroEmail(resutl.email)
         seterroPassword(resutl.password)
         return
        }
        navigation.navigate("account")
    }
    
    const validateData =() => {
        seterroEmail("")
        seterroPassword("")
        let isValid = true

        if(!validateEmail(formData.email)){
           seterroEmail("You must enter an valid email.")
           isValid = false 
        }
        
        if(isEmpty(formData.password)){
            seterroPassword("The filed password is in empty.")
            isValid = false 
        }
        return isValid

    }

    return (
        <View style = {styles.container}>
            <Input 
                containerStyle ={styles.input}
                placeholder="Enter your email..."
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage = {erroEmail}
                defaultValue ={formData.email}
                rightIcon = {
                    <Icon type="material-community"
                    name = "account-circle-outline"
                    iconStyle ={styles.icon} />
                }/>
            <Input 
                containerStyle ={styles.input}
                placeholder="Enter your password..."
                password={true}
                secureTextEntry= {!showPassword}
                onChange={(e) => onChange(e, "password")}
                errorMessage = {erroPassword}
                defaultValue ={formData.password}
                rightIcon={
                <Icon
                    type ="material-community"
                    name = {showPassword  ?  "eye-off-outline" : "eye-outline"}
                    iconStyle={styles.icon}
                    onPress = {() => setShowPassword(!showPassword)}
                />
             }/>
            <Button 
                buttonStyle={styles.button}
                containerStyle = {styles.btncontainer}
                title="Login"
                onPress ={() => initialUser()}
            />

            <Loading isVisible = {loadgin} text="Initial Account...."/>

        </View>
    )
}
const defaultFormDataValue = () => {
    return { email:"", password:""}
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: 'center',
        justifyContent : "center",
        marginTop : 30
    
    },
    form:{
        marginTop: 20,
    },
    input : {
        width: "100%"
    }, 
    button: {        
       backgroundColor : '#3c3c4c',
       borderRadius : 26
    },
    btncontainer: {
        marginTop : 10,
        width: "95%",
        alignSelf : 'center'
    },
    icon:{
        color: "#c1c1c1",
        fontSize: 30
    }

})
