import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { StyleSheet,FlatList, Text, View } from 'react-native'
import { Image } from 'react-native-elements'


import  {size} from 'loadsh'
import { formatPhone } from '../../util/helper'

export default function ListRestaurants({restaurants, navigation, handleLoadMore}) {
    return (
        <View>
            <FlatList
             data = {restaurants}
             keyExtractor ={(index) => index.toString()}
             onEndReachedThreshold ={0.5}
             onEndReached= {handleLoadMore}
             renderItem = {(restaurant) => (
                 <Restaurant 
                 restaurant ={restaurant} 
                 navigation = {navigation} 
                 />
             )}
            />
        </View>
    )
}

function Restaurant({restaurant, navigation}) {
    const  {id, images, name, address, description, phone, email} =  restaurant.item
    const  imageRestaurant  = images[3]

      
    const goRestaurant = () =>{
        navigation.navigate("onerestaurant", {id, name})
    }

    return (
        <TouchableOpacity onPress={goRestaurant}>
            <View style ={styles.viewRestaurants}>
                <View style = {styles.viewimage}>
                    <Image
                        resizeMethod = "resize"

                        PlaceholderContent  ={<ActivityIndicator color = "#fff"/>}
                        source = {{uri: imageRestaurant}}
                        style = {styles.image}>
                    </Image>
                </View>
            <View>
                    <Text style ={styles.restaurantStyleTitle}>{name}</Text>
                    <Text style ={styles.restaurantStyleAddrees}>{address}</Text>
                    <Text style ={styles.restaurantStyleInforPhone}>{formatPhone(phone)}</Text>
                    <Text style ={styles.restaurantStyleEmail}>{email}</Text>
                    <Text style ={styles.restaurantStyleDecription}>                        
                        {                    
                            size(description) > 0
                            ? `${description.substr(0, 60)}...`
                            : description
                        }
                    </Text>
            </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewRestaurants: {
        flexDirection : "row",
        margin : 10
    },
    viewimage: {
        marginRight : 20
    },
    image : {
        width : 100,
        height : 100,
        borderRadius : 15
    },
    restaurantStyleTitle : {
        fontWeight : "bold",
        fontSize : 18
     
    },
    restaurantStyleAddrees : {
        paddingTop : 5,
        fontSize: 14,
        color : "black"
    },
    restaurantStyleDecription : {
        paddingTop: 2,
        color: "grey",
        width : "80%"
    }
})
