import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'

import {SearchBar, ListItem, Icon, Image} from 'react-native-elements'

import {isEmpty, size} from 'loadsh'
import { searchRestaurant } from '../util/action'

export default function Search({navigation}) {
    const [search, setSearch] = useState("")
    const [restaurants, setRestaurants] = useState([])


    useEffect(() => {

        if(isEmpty(search)){
            return
        }
        async function getData() {
            const response  = await searchRestaurant(search)
            if(response.statusResponse){
                setRestaurants(response.restaurants)
            }
            console.log(restaurants)
        }
        getData()
    }, [search])

    return (
        <View>
            <SearchBar
            placeholder ="You enter name the restaurant"
            onChangeText={(e) => setSearch(e)}
            containerStyle ={styles.searchBar}
            value = {search}/>
            {
                size(restaurants) > 0 ? (
                    <FlatList
                    data ={restaurants}
                    keyExtractor ={(item, index) => index.toString()}
                    renderItem = {(restaurant) => (
                        <Restaurant restaurant = {restaurant} navigation= {navigation} />
                    )}/>

                    

                ) : (
                    isEmpty(search) ? (
                        <Text style={styles.notFount}>You enter firt letter the restaurant</Text>

                    ) : (
                        <Text style={styles.notFount}>Does not exist restaurant with that name </Text>
                    )
                )
            }
        </View>
    )
}

function Restaurant ({restaurant, navigation}) {
    const {id, name, images, } = restaurant.item

    return ( 
        <ListItem style ={styles.menuItem}
        onPress={() => navigation.navigate("restaurants", {
            screen : "onerestaurant",
            params: {id, name}
        })}>
            <Image 
               resizeMethod="cover"
               PlaceholderContent= {<ActivityIndicator color = "grey"/>}
               source ={{uri : images[0]}}
               style = {styles.imagesRestaurants}

             />



        <ListItem.Content>
            <ListItem.Title>{name}</ListItem.Title>
        </ListItem.Content>
        <Icon 
         type="material-community"
         name = "chevron-right"
        />

        </ListItem>
    )

}



const styles = StyleSheet.create({
    searchBar : {
        marginBottom : 20,
        backgroundColor : "#fff"
    },
    menuItem: {
     margin : 10
    },
    imagesRestaurants : {
        width : 80,
        height : 80
    },
    notFount : {
        alignSelf : "center",
        width : "90%"
    }
})
