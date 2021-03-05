import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import  CountryPicker  from 'react-native-country-picker-modal'
import { Button, Icon, Input } from 'react-native-elements'
import AddRestaurant from '../../screens/restaurants/AddRestaurant'

export default function AddRestaurantForm({toastRef, setLoading, navigation}) {

    const AddRestaurant =() => {
        console.log("Fuck Yeah....")
    }

    return (
        <View style={styles.viewContainer}>
            <FormAdd/>
            <Button title = "Add Restaurant"
            onPress = {AddRestaurant()}
            buttonStyle = {styles.btnAddRestaurant}/>
        </View>
    )
}


function  FormAdd() {
    const [country, setCountry] = useState("DO")
    const [callingCode, setCallingCode] = useState("809")
    const [phone, setPhone] = useState("")

    return (
        <View style= {styles.viewForm}>
            
            <Input
              placeholder ="Name the restaurant..."
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
              keyboardType ="email-address"
              placeholder ="Email the restaurant..."
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
                    setCallingCode(country.callingCode[0])
                }}/>
                <Input
                    placeholder = "WhatsApp the Restaurant..."
                    keyboardType="phone-pad"
                    containerStyle= {styles.inputPhone}
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
                    containerStyle= {styles.textArea}
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
