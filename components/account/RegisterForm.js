import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { validateEmail } from '../../util/helper'
import {size} from 'loadsh'
import {useNavigation} from '@react-navigation/native'

import {registerUser} from '../../util/action'
import Loading from '../Loading'

export default function RegisterForm() {
    const navigation = useNavigation()

    
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormDataValue())

    const [erroEmail, seterroEmail] = useState("")
    const [erroPassword, seterroPassword] = useState("")
    const [erroConfirmPassword, seterroConfirmPassword] = useState("")

    const [loadgin, setLoadgin] = useState(false)


    const onChange =(e, type) => {
       setFormData({...formData, [type] : e.nativeEvent.text})
    }


    const registerUserClick = async() => {
        if (!validateData()){
            return
        }
        setLoadgin(true)

        const resutl = await registerUser(formData.email, formData.password)

        setLoadgin(false)

        if(!resutl.statusResponse){
         seterroEmail(resutl.error)
         setFormData("")
         return
        }
        navigation.navigate("account")
    }
    const validateData =() => {
        seterroEmail("")
        seterroPassword("")
        seterroConfirmPassword("")
        let isValid = true

        if(!validateEmail(formData.email)){
           seterroEmail("You must enter an valid email.")
           isValid = false 
        }

        if(size(formData.password)< 6){
            seterroPassword("You much enter a 6 character password")
            isValid = false
        }
        if(size(formData.confirm)< 6){
            seterroConfirmPassword("You much enter a 6 character password")
            isValid = false
        }
        if((formData.password) !== formData.confirm){
            seterroPassword("Password and the confirmation password are not the same ")
            seterroConfirmPassword("Password and the confirmation password are not the same ")
            isValid = false
        }

        return isValid

    }
    return (
        <View style ={styles.form}>
            <Input 
            containerStyle ={styles.input}
            placeholder="Enter your email..."
            onChange={(e) => onChange(e, "email")}
            keyboardType="email-address"
            errorMessage = {erroEmail}
            defaultValue ={formData.email}/>
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
             <Input 
            containerStyle ={styles.input}
            placeholder="Enter your confirm password..."
            password={true}
            secureTextEntry= {!showPassword}
            onChange={(e) => onChange(e, "confirm")}
            errorMessage = {erroConfirmPassword}
            defaultValue ={formData.confirm}
            rightIcon={
                <Icon
                type ="material-community"
                name = {showPassword  ?  "eye-off-outline" : "eye-outline"}
                iconStyle={styles.icon}
                onPress = {() => setShowPassword(!showPassword)}
                   /> }/>

            <Button buttonStyle={styles.button}
            containerStyle = {styles.btncontainer}
            title="Register new user"
            onPress ={() => registerUserClick()}
            />
            <Loading isVisible = {loadgin} text="Create Account...."/>
        </View>
    )
}
const defaultFormDataValue = () => {
    return { email:"", password:"", confirm:""}
}

const styles = StyleSheet.create({
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
        color: "#c1c1c1"
    }
})
