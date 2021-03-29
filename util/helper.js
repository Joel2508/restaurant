import * as Permissions from 'expo-permissions'
import * as ImagePicker from  'expo-image-picker'
import { Alert, Platform, Linking } from "react-native";
import * as Location from 'expo-location'



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

export const getCurrentLocation = async() => {
     const response = { status: false, location: null, message : "", city : "", name:  ""}
     const resultPermission = await Permissions.askAsync(Permissions.LOCATION)
     if(resultPermission.status === "denied"){
         response.message = "You must permission for location."
         return response 
     }

     const position = await Location.getCurrentPositionAsync({})
          
     const location = {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         latitudeDelta: 0.001,
         longitudeDelta: 0.001,
     }

     response.status = true
     response.location  = location 
     response.message = "OK"
     return response
}

export const geoLocationReveseUserStreet  = async(newRegion) => {
    
    const response = {status : false, city: "", name : "", country : "", street : "", message : ""};

    const {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Access to Location denied');
        return
    }
    if(Platform.OS === "android"){
        response.message = ""
        response.street = ""
        response.country = ""
        response.name = ""
        response.city = ""        
    }
    else{
        try {        


            const place = await Location.reverseGeocodeAsync({
                latitude : newRegion.latitude,
                longitude : newRegion.longitude
            });
        
            place.find( p => {
                response.city = p.city,
                response.name = p.name,
                response.country = p.country,
                response.street = p.street,
                response.status = true
            });    
        } catch (error) {            
            response.message ="Error"
            return response
        }
     }

   return response
}
 
export const  _reverseGeocode = async(lat, lng) => {
    let location = {};
    if (Platform.OS === 'ios') {
      const res = await Location.reverseGeocodeAsync({latitude: lat.toFixed(6), longitude: lng.toFixed(6)});
      location = res[0];
    } else {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${["AIzaSyA5_TGvI0qpmDL2lyEifMxjEmCl_be6pAs"]}`);
      const responseJson = await response.json();
      location = await _setLocationFromAddressComponents(responseJson.results[0]);
    }
    return location;
  }
 
  function _setLocationFromAddressComponents (addressComponents) { 
    const location = {
      street_number: null,
      route: null,
      name: null,
      city: null,
      region: null,
      postalCode: null,
    };
    addressComponents.forEach((a) => {
      switch(a.types[0]) {
        case 'street_number':
          location.street_number = a.short_name;
          break;
        case 'route':
          location.route = a.short_name;
          break;
        case 'locality':
          location.city = a.short_name;
          break;
        case 'administrative_area_level_1':
          location.region = a.short_name;
          break;
        case 'postal_code':
          location.postalCode = a.short_name;
          break;
      }
    });
    location.name = `${location.street_number} ${location.route}`;
    return location;
  }

  export const formatPhone = (callingCode, phone) => {
      return `(${callingCode})-${phone.substr(0,3)}-${phone.substr(3,4)}`
  }

  export const callNumber = (phoneNumber)=>{
    Linking.openURL(`tel:${phoneNumber}`)
  }

  export const sendWhastApp = (phoneNumber, tex)=>{
    const link = `https://wa.me/${phoneNumber}?text=${tex}`
    Linking.canOpenURL(link).then((suppoted) => {
      if(!suppoted){
        Alert.alert("Please install WhatsApp for send message")
        return
      }
      return Linking.openURL(link)
    }) 
  }

  
  export const sendEmail = (to, subject, body)=>{
    Linking.openURL(`mailto:${to}?subjecr=${subject}&body=${body}`)
  }

