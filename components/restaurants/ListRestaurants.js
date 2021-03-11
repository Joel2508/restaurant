import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { StyleSheet,FlatList, Text, View } from 'react-native'
import { Image, ListItem } from 'react-native-elements'
import Restaurants from '../../screens/restaurants/Restaurants'

import  {size} from 'loadsh'

export default function ListRestaurants({restaurants, navigation}) {
    return (
        <View>
            <FlatList
             data = {restaurants}
             keyExtractor ={(item, index) => index.toString()}
             renderItem = {(restaurant) => (
                 <Restaurant restaurant ={restaurant} navigation = {navigation}/>
             )}
            />
        </View>
    )
}

function Restaurant({restaurant, navigation}) {
    const  {id, images, name, address, description, phone, email, callingCode} =  restaurant.item
    const  imageRestaurant  = images[0]

    return (
        <TouchableOpacity>
            <View style ={styles.viewRestaurants}>
                <View style = {styles.viewimage}>
                    <Image
                        resizeMethod= "cover"
                        PlaceholderContent  ={<ActivityIndicator color = "#fff"/>}
                        source = {{uri: imageRestaurant}}
                        style = {styles.image}>
                    </Image>
                </View>
            <View>
                    <Text style ={styles.restaurantStyleTitle}>{name}</Text>
                    <Text style ={styles.restaurantStyleAddrees}>{address}</Text>
                    <Text style ={styles.restaurantStyleInforPhone}>{callingCode}-{phone}</Text>
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
        marginRight : 15
    },
    image : {
        width : 100,
        height : 100,
    },
    restaurantStyleTitle : {
        fontWeight : "bold"
    },
    restaurantStyleAddrees : {
        paddingTop : 2,
        color : "grey"
    },
    restaurantStyleDecription : {
        paddingTop: 2,
        color: "grey",
        width : "80%"
    }
})
