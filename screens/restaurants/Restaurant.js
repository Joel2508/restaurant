import React, {useState, useEffect} from 'react'
import { Alert } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../../components/Loading'
import { getDocumentById } from '../../util/action'

export default function Restaurant({navigation, route}) {
    const {id, name} = route.params 
    const [restaurant, setRestaurant] = useState(null)

    navigation.setOptions({title: name})

    useEffect(() => {

        (async ()=>{
            const response = await getDocumentById("restaurants", id)
            console.log(response)
            if(response.statusResponse){
               setRestaurant(response.document)
            }else{
                setRestaurant({})
                Alert.alert("Error loading the restaurant.")
            }
        } )()
    }, [])

    if(!restaurant){
      return <Loading isVisible={true} text ="Loading"/>
    }
    return (
        <View>
            <Text>{restaurant.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
