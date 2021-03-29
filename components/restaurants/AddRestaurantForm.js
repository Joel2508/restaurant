import React, {useState, useEffect} from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import  CountryPicker  from 'react-native-country-picker-modal'
import { Avatar, Button, Icon, Image, Input } from 'react-native-elements'
import {isEmpty, map, size, filter} from 'lodash'

import { getCurrentLocation, loadImageFromGallery, validateEmail, geoLocationReveseUserStreet } from '../../util/helper'
import { Alert, Dimensions } from 'react-native'
import Modal from '../Modal'

import MapView, { Marker,  UrlTile } from 'react-native-maps'
import { addDocumentWithoutId, getCurrentUser, uploadImage } from '../../util/action'

import uuid from 'random-uuid-v4'
import { getCountryCurrencyAsync } from 'react-native-country-picker-modal/lib/CountryService'


const widtScreen = Dimensions.get("window").width

export default function AddRestaurantForm({toastRef, setLoading, navigation}) {
    
    const [formData, setFormData] = useState(defaultValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(null)
    const [errorAddres, setErrorAddres] = useState(null)    


    const [imagesSelectd, setImageSelectd] = useState([])


    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationRestaurant, setLocationRestaurant] = useState(null)

    const AddRestaurant = async() => {
        console.log(formData.callingCode)
    
        if(!validateForm()){
            return
        }

        setLoading(true)

        const responseUploadImage = await uploadImages()
  
        const restaurantObject = {
            name: formData.name,
            address : formData.address,
            description : formData.description,
            email: formData.email,
            phone : formData.phone, 
            nameCountry : formData.nameCountry,
            location : locationRestaurant,
            images : responseUploadImage,
            rating: 0, 
            raitingTotal : 0,
            quantityVoiting: 0,
            createA : new Date(),
            createBY : getCurrentUser().uid           
        }

        const responseRestaurant = await addDocumentWithoutId("restaurants", restaurantObject)
        setLoading(false)
        
        if(!responseRestaurant.statusResponse){
          toastRef.current.show("Error to loading data.", 3000)
          return
        }        
        navigation.navigate("restaurant")
    }

    const uploadImages =  async() =>{
        const urlImage = []
        await Promise.all(
            map(imagesSelectd, async(image) => {
                const response = await uploadImage(image, "restaurants", uuid())
                if(response.statusResponse){
                    urlImage.push(response.url)
                }
            })
        )
        return urlImage
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
       if(!validateEmail(formData.email)) {
            setErrorEmail("Email is invalid check your email.")
            return false        
       }
       if(size(formData.phone) < 6){
        setErrorPhoneNumber("You must enter a phone number the restaurant  that  6 digit.")
        setErrorEmail("")
        return false
       }
       if(isEmpty(formData.description)){
            setErrorDescription("The filed description is empty.")
            setErrorPhoneNumber("")
            return false
        }

        if(!locationRestaurant){
            toastRef.current.show("You must put your that restaurant location", 3000)
            return false
        }
        if(size(imagesSelectd) === 0){
            toastRef.current.show("You must select one image for this restaurant", 3000)
            return false
        }

        setErrorDescription("")

        return true

    }


    const clearErrors =() => {
        setErrorAddres(null)
        setErrorDescription(null)
        setErrorEmail(null)
        setErrorName(null)
        setErrorPhoneNumber(null) 
        setLocationRestaurant(null)
        setImageSelectd([])    
        setLoading(false)
    }

    return (
        <ScrollView style={styles.viewContainer}>
            <ImageRestaurant imageRestaurant ={imagesSelectd[0]}/>

            <FormAdd formData = {formData}
            setFormData = {setFormData}
            errorName ={errorName}
            errorAddres = {errorAddres}
            errorDescription = {errorDescription}
            errorEmail = {errorEmail}
            errorPhoneNumber = {errorPhoneNumber}
            setIsVisibleMap= {setIsVisibleMap}
            locationRestaurant = {locationRestaurant}/>

            <UploadImagen toastRef ={toastRef}
            imagesSelectd={imagesSelectd}
            setImageSelectd = {setImageSelectd}/>

            <Button title = "Add Restaurant"
            onPress = {AddRestaurant}
            buttonStyle = {styles.btnAddRestaurant}/>

            <MapRestaurant isVisibleMap = {isVisibleMap} setIsVisibleMap = {setIsVisibleMap}
                           setLocationRestaurant = {setLocationRestaurant} toastRef = {toastRef} formData ={formData}/>

            
        </ScrollView>
    )
}



function MapRestaurant({isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef, formData}) {

    const [newRegion, setNewRegion] = useState(null)    
    useEffect(() => {
        (async() => {
            const response = await getCurrentLocation()
            if(response.status){
                setNewRegion(response.location)                         
            }
        })()
    }, [])
    const getMyLocation = async() => {
        setLocationRestaurant(newRegion)       
        
        const geoLocationReveseUser = await geoLocationReveseUserStreet(newRegion)
        const address = geoLocationReveseUser.country + ' '  + ' ' + geoLocationReveseUser.city + ' ' +  ' ' + geoLocationReveseUser.street 
        formData.address = address
        toastRef.current.show("Location save success", 3000)
        setIsVisibleMap(false)
    }
    return (
        <Modal isVisible = {isVisibleMap} setVisible = {setIsVisibleMap} children = {null}>
            <View>
                {
                    newRegion && (
                    <MapView 
                        style = {styles.mapView}
                        initialRegion = {newRegion}
                        showsUserLocation
                        onRegionChange = {(region) => setNewRegion(region)} 
                        mapType = "satellite"                   
                    >
                     <Marker
                     
                     coordinate = {{
                            latitude : newRegion.latitude,
                            longitude : newRegion.longitude,
                         }}
                     draggable
                     >
                     </Marker>
                    </MapView>
                    )
                }
                <View style={styles.btnMapButtonView}>

                    <Button title = "Cancel Location"
                    containerStyle = {styles.containerStyleBtnMapCancel}
                    onPress = {() => setIsVisibleMap(false)}
                    buttonStyle = {styles.btnCancel}/>       

                    <Button title = "Save Location"
                    onPress = {getMyLocation}
                    containerStyle = {styles.containerStyleBtnMapSave}
                    buttonStyle = {styles.btnLocation}/>     

                </View>
            </View>
        </Modal>
    ) 
}

function ImageRestaurant({imageRestaurant}) {
    return (
        <View style = {styles.photView}>
            <Image
            style = {{width: widtScreen, height:200}}
            source = {
                imageRestaurant ? {uri: imageRestaurant} : require("../../assets/notimage.png")
            }
            />

        </View>
    )
}

        
function  UploadImagen({toastRef, imagesSelectd, setImageSelectd}) {


    const selectImage = async() => {    
        const result = await loadImageFromGallery([4,3])
        if(!result.status){
            toastRef.current.show("Not select image", 3000)
            return
        }

        setImageSelectd([...imagesSelectd, result.image])
     }

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


function  FormAdd({formData, setFormData, errorName, errorAddres, errorDescription, errorEmail, 
    errorPhoneNumber, setIsVisibleMap, locationRestaurant}) {

    const [country, setCountry] = useState("")
    const [callingCode, setCallingCode] = useState([])
    const [phone, setPhone] = useState("")
    const [maxLengthPhone, setMaxLengthPhone] = useState(25)
    const [enable, setEnable] = useState(false)

    const onSelectCountry =(country) =>{
        setCountry(country.cca2)
        setEnable(true)
        if(country.cca2 === "DO"){
            setMaxLengthPhone(10)
        }
        else{
            setMaxLengthPhone(25)
        }
        setFormData({...formData, "country" : country.cca2, "nameCountry" : country.name})                                                   
    }

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
                  style={styles.icon}
                />
            }

            />
            <Input
              placeholder ="Address the restaurant..."
              errorMessage= {errorAddres}
              defaultValue ={formData.address}
              onChange = {(e) => onChange(e, "address")}
              rightIcon = {{
                type: "material-community",
                name: "map-marker-outline",
                style: locationRestaurant ? styles.icon : "#c2c2c2",
                onPress: () => setIsVisibleMap(true)
          }}

            />
            <Input
               rightIcon = {
                   <Icon
                     type = "material-community"
                     name = "at"
                     style={styles.icon}
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
                //withCallingCode
                //withCallingCodeButton
                withCurrency
                containerStyle= {styles.countryPicker}
                countryCode={country}   
                withCountryNameButton 
                                          
                onSelect ={(country) => onSelectCountry(country)}/>
                <Input
                    placeholder = "WhatsApp the Restaurant..." 
                    keyboardType="phone-pad"
                    containerStyle= {styles.inputPhone}
                    errorMessage = {errorPhoneNumber}
                    defaultValue ={formData.phone}
                    maxLength = {maxLengthPhone}
                    editable = {enable}
                    onChange = {(e) => onChange(e, "phone")}
      
                    rightIcon = {
                        <Icon
                          type = "material-community"                          
                          name = "whatsapp"
                          style={styles.icon}
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
                          style={styles.icon}
                        />
                    }

                ></Input> 
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
        nameCountry : ""
    }
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
    changeColorIcon : {
        backgroundColor: "#7c7c7c"
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
        
    },

    photView: {
        alignItems : "center",
        height : 200,
        marginBottom : 10
    },
    mapView:{
        width :  "100%",
        height: 600, 
        borderRadius:26,
    },
    btnMapButtonView : {
    flexDirection : "row",
    justifyContent : "center",
    marginTop : 10,
    
    },
    containerStyleBtnMapCancel : {
        paddingLeft : 5
    },  
    containerStyleBtnMapSave : {
     paddingRight : 5
    },
    btnLocation : {     
        width : 150,      
        height : 50, 
        backgroundColor : "#3c3c4c",
        borderRadius :20,
        marginLeft : 20,
    
    },
    btnCancel : {  
        width : 150,     
        height : 50, 
        backgroundColor : "#7c7c7c",
        borderRadius :20,
        marginRight : 20,
 
    }
})
