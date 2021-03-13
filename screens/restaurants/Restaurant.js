import React, {useState, useEffect} from 'react'
import { Alert, Dimensions, ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'
import MapView from 'react-native-maps'


import {map} from 'loadsh'
import CarouselImage from '../../components/CarouselImage'
import Loading from '../../components/Loading'
import MapRestaurant from '../../components/restaurants/MapRestaurant'
import { getDocumentById } from '../../util/action'
import { formatPhone } from '../../util/helper'
import ListReviews from '../../components/restaurants/ListReviews'

const widthDimension = Dimensions.get("window").width

export default function Restaurant({navigation, route}) {
    const [activeSlide, setActiveSlide] = useState(0)

    const {id, name} = route.params 
    const [restaurant, setRestaurant] = useState(null)

    navigation.setOptions({title: name})

    useEffect(() => {

        (async ()=>{
            const response = await getDocumentById("restaurants", id)
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
        <ScrollView style = {styles.viewScroll}>
            <CarouselImage
                images = {restaurant.images}
                height = {250}
                width = {widthDimension}
                activieSlide = {activeSlide}
                setActiveSlide = {setActiveSlide}/>
            
            <TitleRestaurant
                name = {restaurant.name}
                description= {restaurant.description}
                rating = {restaurant.rating}/>
            <RestaurantInfo
                name={restaurant.name}
                location ={restaurant.location}
                address = {restaurant.address}
                email ={restaurant.email}
                phone = {formatPhone(restaurant.callingCode, restaurant.phone)}
                />
            <ListReviews
             navigation = {navigation}
             idRestaurant = {restaurant.id}
             
            />
        </ScrollView>
    )
}

function RestaurantInfo({name, location, address, email, phone}) {
    const listInfo = [
        {text: address, iconName: "map-marker-outline"},
        {text: email, iconName: "at"},        
        {text: phone, iconName: "phone"},
    ]

    return (
        <View style ={styles.viewRestaurantInfo}>
            <Text style ={styles.infoTitleRestaurant}>
                Information the restaurant
            </Text>
          <MapRestaurant 
            location ={location}
            name ={name}
            height={150}/>
            {
                map(listInfo, (item, index) => (
                    <ListItem
                        key ={index} 
                        style = {styles.containerList}>                        
                        <Icon
                            type ="material-community"
                            name = {item.iconName}
                            color ="#3c3c4c"/>                        
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>                    
                ))            
            }
        </View>
    )
}



function TitleRestaurant ({name, description, rating}) {
   return (
       <View style ={styles.viewRestaurantTitle}>
           <View style={styles.viewRestaurantContainer}>
            <Text style ={styles.nameRestaurant}>{name}</Text>
            <Rating
                style ={styles.ratingStyle}
                imageSize ={20}
                readonly 
                startingValue={parseFloat(rating)} />
           </View>
           <Text style ={styles.descriptionRestaurant}>{description}</Text>
       </View>
   )
}


const styles = StyleSheet.create({
    viewScroll : {
        flex: 1,
        backgroundColor : "#fff"
    },
    viewRestaurantTitle: {
        padding : 15
    },
    viewRestaurantContainer: {
      flexDirection : "row"
    },
    descriptionRestaurant: {
        marginTop : 8,
        color: "gray",
        textAlign : "justify"
    },
    ratingStyle : {
        position :"absolute",
        right : 0
    },
    nameRestaurant : {
        fontWeight: "bold"
    },
    viewRestaurantInfo: {
        margin : 15,
        marginTop : 25        
    },
    infoTitleRestaurant : {
        fontSize : 18,
        fontWeight: "bold",
        marginBottom : 5    
    },
    containerList : {
       borderBottomColor : "#7c7c7c",
       borderBottomWidth : 1 
    }
})
