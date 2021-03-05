import React, {useState, useCallback, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'

import Loading from '../../components/Loading'

import firebase from 'firebase/app'




export default function Restaurants({navigation}) {

    const [userRestaurant, setUserRestaurant] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfor) => {
            userInfor ? setUserRestaurant(true) : setUserRestaurant(false)
        })
    }, [])
    

    if(userRestaurant === null){
        return <Loading isVisible = {true} text = "Loading..." />
    }

    return (
        <View styles={styles.viewBody}>
            <Text>Restaurant.....</Text>
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
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
      flex: 1,
    },
    iconContainer: {
        position : "absolute",
        right: 20,            
        shadowColor : "black",
        shadowOffset:  { width : 2, height : 2},
        shadowOpacity: 0.5,
        bottom : -580
        
      }
})
