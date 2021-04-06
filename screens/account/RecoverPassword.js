import { installWebGeolocationPolyfill } from 'expo-location'
import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { Screen } from 'react-native-screens'
import Loading from '../../components/Loading'
import { sendEmailResetPassword } from '../../util/action'
import { validateEmail } from '../../util/helper'

export default function RecoverPassword({navigation}) {
    const [email, setEmail] = useState("")
    const [errorEmail, setErrorEmail] = useState(null)
    const [loading, setLoading] = useState(false)


    const onSubmit = async() => {
        if(!validForm()){
            return
        }


        setLoading(true)
        const response = await sendEmailResetPassword(email)
        setLoading(false)

        if(!response.statusResponse){
            Alert.alert("Error", "Error in you email, please check you email.")
            return
        }        
        Alert.alert("Confirmation", "Success change password for you email.")
        navigation.navigate("account", {screen: "login"})

    }

    const validForm =() => {
        if(!validateEmail(email)){
            setErrorEmail("You mus't a email valid.")
            return false
        }
        setErrorEmail("")
        return true
    }

   
    return (
        <View style={styles.formContainer}>
           <Image
                source = {require("../../assets/images.png")}
                resizeMode = 'stretch'
                style = {styles.image}>
           </Image>
            
            <Input placeholder="Your enter email."
            containerStyle={styles.inputForm}
            onChange={(e) => setEmail(e.nativeEvent.text)}
            defaultValue={email}
            errorMessage={errorEmail}
            keyboardType= "email-address"
            rightIcon={<Icon type="material-community" name="at" iconStyle={styles.icon}/>}/>

            <Button title="Recover Password"
            containerStyle={styles.btnContainer} 
            buttonStyle={styles.btnContainerStyle}
            onPress={onSubmit}/>
            <Loading isVisible={loading} text="Loading Recovery Password..."/>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer : {
        flex : 1,
        alignItems : "center",
        
        backgroundColor : "white"
    },
    inputForm : {
      width : "85%",      
    },
    btnContainer : {
        marginTop : 20,
        width: "85%",
        alignSelf : "center"
    },
    btnContainerStyle: {
        backgroundColor: "#3c3c4c",
        borderRadius: 26
    },
    icon : {
        color : "#c1c1c1"
    },
    image: {           
        height: 200,
        width: "105%",    
        marginBottom: 10,
        margin : 20, 
        alignItems : "flex-end"               
      }
  })
