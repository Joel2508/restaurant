import React, {useState, useCallback, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import {useFocusEffect} from '@react-navigation/native'


import Loading from '../../components/Loading'

import {size} from  'loadsh'
import firebase from 'firebase/app'
import { getMoreRestaurant, getRestaurant } from '../../util/action'
import ListRestaurants from '../../components/restaurants/ListRestaurants'



export default function Restaurants({navigation}) {

    const [startRestaurants, setStartRestaurants] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)
    
    const limiteRestaurants = 5

    
    const [userRestaurant, setUserRestaurant] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfor) => {
            userInfor ? setUserRestaurant(true) : setUserRestaurant(false)
        })
    }, [])

    useFocusEffect (
        useCallback (async() => {
          setLoading(true)
          const response = await getRestaurant(limiteRestaurants)
        
          if(response.statusResponse){
              setStartRestaurants(response.startRestaurants)
              setRestaurants(response.restaurants)
          }
          setLoading(false)
        }, [])
    )
  const handleLoadMore = async() => {
    if(!startRestaurants){
        return
    }
    setLoading(true)
    const response = await getMoreRestaurant(limiteRestaurants, startRestaurants)
    if(response.statusResponse){
        setStartRestaurants(response.startRestaurants)
        setRestaurants([...restaurants, ...response.restaurants])
    }    
    setLoading(false)
}
    if(userRestaurant === null){
        return <Loading isVisible = {true} text = "Loading..." />
    }

    return (
        <View style={styles.viewBody}>
            {
                size(restaurants) > 0 ? (
                   <ListRestaurants restaurants ={restaurants} 
                   navigation={navigation} 
                   handleLoadMore = {handleLoadMore} />

                ) : (
                  <View style = {styles.notFoundViewStyle}>
                       <Text style = {styles.notRestaurantText}>
                           Not exist Restaurants 
                       </Text>
                  </View>
                )
            }
            {
                userRestaurant && (
                    <Icon 
                        type ="material-community"
                        name="plus"
                        color ="#3c3c4c"
                        reverse
                        containerStyle = {styles.iconContainer}
                        onPress ={() => navigation.navigate("add-restaurant")}/>    
                )
            
            }
            <Loading isVisible ={loading} text = "Loadig..."/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
      flex: 1,
    },
    iconContainer: {        
        position : "absolute",
        bottom : 10,
        right: 10,            
        shadowColor : "black",
        shadowOffset:  { width : 2, height : 2},
        shadowOpacity: 0.5,        
      },
      notFoundViewStyle : {
         flex:1, 
         justifyContent: "center",
        alignItems : "center"
      },
      notRestaurantText: {
         fontSize : 20,
         fontWeight : "bold"
      }
})
