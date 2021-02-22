import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View style ={styles.form}>
            <Input 
            containerStyle ={styles.input}
            placeholder="Enter your email..."/>
            <Input 
            containerStyle ={styles.input}
            placeholder="Enter your password..."
            password={true}
            secureTextEntry= {!showPassword}
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
            />
        </View>
    )
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
