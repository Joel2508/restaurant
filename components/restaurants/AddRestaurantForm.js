import React, {useState} from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import  CountryPicker  from 'react-native-country-picker-modal'
import { Avatar, Button, Icon, Input } from 'react-native-elements'
import {isEmpty, map, size, filter} from 'lodash'
import AddRestaurant from '../../screens/restaurants/AddRestaurant'
import { loadImageFromGallery, validateEmail } from '../../util/helper'
import { Alert } from 'react-native'



export default function AddRestaurantForm({toastRef, setLoading, navigation}) {

    const [formData, setFormData] = useState(defaultValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(null)
    const [errorAddres, setErrorAddres] = useState(null)    

    const [imagesSelectd, setImageSelectd] = useState([])

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
            <UploadImagen toastRef ={toastRef}
            imagesSelectd={imagesSelectd}
            setImageSelectd = {setImageSelectd}/>
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
        
function  UploadImagen({toastRef, imagesSelectd, setImageSelectd}) {
    const removeImage = (image) => {
       
        Alert.alert(
            "Delete Image",
            "Are you want delete this image?",
                [
                    {
                        text : "No",
                        style : "Cancel"
                    },
                    {
                        text : "Yes",
                        onPress : () => {
                            setImageSelectd(
                                filter(imagesSelectd, (imageUrl) => imageUrl  !== image)
                            )
                        }
                    }
                ],
                {
                    cancelable : false
                }
        )
    }
    const selectImage = async() => {    
       const result = await loadImageFromGallery([4,3])
       if(!result.status){
           toastRef.current.show("Not select image", 3000)
           return
       }

       setImageSelectd([...imagesSelectd, result.image])
       console.log(imagesSelectd)
    }
    return (
        <ScrollView
        horizontal
        style = {styles.viewImage}>
            {
                size(imagesSelectd) < 10 && (
                    <Icon
                    type ="material-community"
                    name = "camera"
                    color = "#3c3c4c"
                    containerStyle = {styles.styleContainer}
                    onPress = {selectImage}/>            
                )
            }
            {
                map(imagesSelectd, (imageRestaurant, index) => (
                    <Avatar
                    key={index}
                    style={styles.miniatureImage}
                    source= {{uri: imageRestaurant}}
                    onPress = {() => removeImage(imageRestaurant)}>
        
                    </Avatar>
                ))             
            }
        </ScrollView>
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
    },
    viewImage : {
     flexDirection : "row",
     marginHorizontal : 20,
     marginTop : 30,
    },
    styleContainer : {
     alignItems : "center",
     justifyContent : "center",
     marginRight : 10,
     height : 80,
     width : 80,
     backgroundColor : "#7c7c7c",
     borderRadius : 20,
     
    },
    miniatureImage : {
        width : 80,
        height: 80,
        marginRight: 10,
        borderRadius: 100
        
    }

})
