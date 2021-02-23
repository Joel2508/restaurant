import * as Permissions from 'expo-permissions'
import * as ImagePicker from  'expo-image-picker'
import { Alert } from "react-native";


export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export const loadImageFromGallery = async(array) => {
    const response = {status : false, image: null}
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA)
    if(resultPermission.status == "denided"){
        Alert.alert("You must permission at this app the from gallery.")
        return response
        
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing : true,
        aspect : array
    })
    if(result.cancelled){
        return response
    }
    response.status = true,
    response.image = result.uri
    return response
}


export const fileToBlob = async(path) => {
    const file = await fetch(path)
    const block = await file.blob()
    return block
}