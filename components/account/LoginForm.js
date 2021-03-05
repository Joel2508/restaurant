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
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [erroEmail, seterroEmail] = useState("")
    const [erroPassword, seterroPassword] = useState("")

    const [loadgin, setLoadgin] = useState(false)
    const navigation = useNavigation()
    const onChangeEmail = (e) => {
        setEmail(e.nativeEvent.text)
    }
    
    const onChangePassword = (e) => {
        setPassword(e.nativeEvent.text)
    }
    
     const initialUser = async() => {
        if (!validateData()){
            return;
        }
        setLoadgin(true)

        const resutl = await signInWithEmailAndPassword(email, password)
        
        setLoadgin(false)
        
        if(!resutl.statusResponse){         
         seterroPassword(resutl.error)
         setPassword("")
         return
        }
        navigation.navigate("account")
    }
    
    const validateData =() => {
        seterroEmail("")
        seterroPassword("")
        let isValid = true

        if(!validateEmail(email)){
           seterroEmail("You must enter an valid email.")
           isValid = false 
        }
        

        if(isEmpty(password)){
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
                onChange={(e) => onChangeEmail(e)}
                keyboardType="email-address"
                errorMessage = {erroEmail}
                defaultValue ={email}
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
                onChange={(e) => onChangePassword(e)}
                errorMessage = {erroPassword}
                defaultValue ={password}
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
