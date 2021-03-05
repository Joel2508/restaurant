import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  CountryPicker  from 'react-native-country-picker-modal'
import { Button, Icon, Input } from 'react-native-elements'
import {isEmpty} from 'lodash'
import AddRestaurant from '../../screens/restaurants/AddRestaurant'
import { validateEmail } from '../../util/helper'

export default function AddRestaurantForm({toastRef, setLoading, navigation}) {

    const [formData, setFormData] = useState(defaultValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(null)
    const [errorAddres, setErrorAddres] = useState(null)    

    const AddRestaurant =() => {
    
        console.log(formData)
        if(!validateForm()){
            return
        }


    }


    const validateForm = ()=>{
        if(isEmpty(formData.name)){
            setErrorName("The filed name is empty.")
            return false
        }
        if(isEmpty(formData.address)){
            setErrorAddres("The filed address is empty.")
            setErrorName("")
            return false
        }
        if(isEmpty(formData.email)){
            setErrorEmail("The filed email is empty.")
            setErrorAddres("")
           return false
       }
       if(!validateEmail(formData.email)){
        setErrorEmail("Email is invalid check your email.")
        
        return
      }
       if(isEmpty(formData.phone)){
        setErrorPhoneNumber("The filed phone number is empty.")
        setErrorEmail("")
        return false
       }
       if(isEmpty(formData.description)){
            setErrorDescription("The filed description is empty.")
            setErrorPhoneNumber("")
            return false
        }
        setErrorDescription("")

        return true

    }

    return (
        <View style={styles.viewContainer}>
            <FormAdd formData = {formData}
            setFormData = {setFormData}
            errorName ={errorName}
            errorAddres = {errorAddres}
            errorDescription = {errorDescription}
            errorEmail = {errorEmail}
            errorPhoneNumber = {errorPhoneNumber}/>

            <Button title = "Add Restaurant"
            onPress = {AddRestaurant}
            buttonStyle = {styles.btnAddRestaurant}/>
        </View>
    )
}


const defaultValues = () => {
    return {
        email : "",
        name : "", 
        phone : "",
        description: "",
        address : "",
        country : "DO",
        callingCode : "809"
    }
}


function  FormAdd({formData, setFormData, errorName, errorAddres, errorDescription, errorEmail, errorPhoneNumber}) {

    const [country, setCountry] = useState("DO")
    const [callingCode, setCallingCode] = useState("809")
    const [phone, setPhone] = useState("")


    const onChange =(e, type) => {
       setFormData({...formData, [type] : e.nativeEvent.text})
    }

    return (
        <View style= {styles.viewForm}>
            
            <Input
              placeholder ="Name the restaurant..."
              errorMessage = { errorName } 
              defaultValue ={formData.name}
              onChange = {(e) => onChange(e, "name")}
              rightIcon = {
                <Icon
                  type = "material-community"
                  name = "home-outline"
                  iconStyle={styles.icon}
                />
            }

            />
            <Input
              placeholder ="Address the restaurant..."
              errorMessage= {errorAddres}
              defaultValue ={formData.address}
              onChange = {(e) => onChange(e, "address")}
              rightIcon = {
                <Icon
                  type = "material-community"
                  name = "map-marker-outline"
                  iconStyle={styles.icon}
                />
            }

            />
            <Input
               rightIcon = {
                   <Icon
                     type = "material-community"
                     name = "at"
                     iconStyle={styles.icon}
                   />
               }
               defaultValue ={formData.email}
               onChange = {(e) => onChange(e, "email")} 
              keyboardType ="email-address"
              placeholder ="Email the restaurant..."
              errorMessage = {errorEmail}
            />            
            <View style={styles.phoneView}>
                <CountryPicker
                withFilter
                withFlag
                withCallingCode
                withCallingCodeButton
                containerStyle= {styles.countryPicker}
                countryCode={country}
                onSelect ={(country) => {
                    setCountry(country.cca2)
                    setFormData({...formData, "country" : country.cca2, "callingCode" : country.callingCode[0]})
                    setCallingCode(country.callingCode[0])
                }}/>
                <Input
                    placeholder = "WhatsApp the Restaurant..."
                    keyboardType="phone-pad"
                    containerStyle= {styles.inputPhone}
                    errorMessage = {errorPhoneNumber}
                    defaultValue ={formData.phone}
                    onChange = {(e) => onChange(e, "phone")}
      
                    rightIcon = {
                        <Icon
                          type = "material-community"                          
                          name = "whatsapp"
                          iconStyle={styles.icon}
                        />
                    }
     
                ></Input> 
            </View>
            <Input
                    placeholder = "Description for the Restaurant..."
                    multiline
                    errorMessage = {errorDescription}
                    containerStyle= {styles.textArea}
                    defaultValue ={formData.description}
                    onChange = {(e) => onChange(e, "description")}
                    rightIcon = {
                        <Icon
                          type = "material-community"                          
                          name = "text-box-outline"
                          iconStyle={styles.icon}
                        />
                    }

                ></Input> 
        </View>
    )
  
}
        

const styles = StyleSheet.create({
    viewContainer: {
        height : "100%"
    },
    viewForm : {
        marginHorizontal : 10,        
    },
    textArea: {
        height : 100,
        width : "100%"
    },
    phoneView: {
        width : "80%",
        flexDirection : "column"
    },
    inputPhone : {
        width : "125%"
    },
    btnAddRestaurant : {
        margin :"20%",
        backgroundColor : "#3c3c4c",
        borderRadius : 26
    },
    icon:{
        color: "#3c3c4c"
    }

})
