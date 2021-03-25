import React, {useState, useCallback, useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import { getTopRestaurant } from '../util/action'
import Toast from 'react-native-easy-toast'
import Loading from '../components/Loading'
import ListTopRestaurants from '../components/ranking/ListTopRestaurants'



export default function TopRestaurants({ navigation }) {
   
    const toastRef = useRef()

    const [restaurants, setRestaurants] = useState(null)
    const [loading, setLoading] = useState(false)


    useFocusEffect(
        useCallback(()=>{

            async function getData () {
                const limit = 10
                setLoading(true)
                const response = await getTopRestaurant(limit)
                setLoading(false)
                if(!response.statusResponse){
                   toastRef.current.show("Erro to loading the top at excellent restaurant.", 3000)
                   return
                }
                setRestaurants(response.restaurants)
            }
            getData()
        }, [])
    )

    return (
        <View>
            <ListTopRestaurants restaurants={restaurants} navigation ={navigation}/>
            <Loading isVisible={loading} text= "Wait Please..."/>
        </View>
    )
}

const styles = StyleSheet.create({})
