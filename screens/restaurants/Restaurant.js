import React, {useState, useRef, useEffect, useCallback} from 'react'
import { Alert, Dimensions, ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'

import Toast from 'react-native-easy-toast'

import firebase from 'firebase/app'

import { useFocusEffect } from '@react-navigation/native'
import {map} from 'loadsh'
import CarouselImage from '../../components/CarouselImage'
import Loading from '../../components/Loading'
import MapRestaurant from '../../components/restaurants/MapRestaurant'
import { addDocumentWithoutId, getCurrentUser, getDocumentById, getFavorite, removeFavorite } from '../../util/action'
import { formatPhone } from '../../util/helper'
import ListReviews from '../../components/restaurants/ListReviews'

const widthDimension = Dimensions.get("window").width

export default function Restaurant({navigation, route}) {

    const toastRef = useRef()
    const [activeSlide, setActiveSlide] = useState(0)

    const {id, name} = route.params 
    navigation.setOptions({title: name})
    const [restaurant, setRestaurant] = useState(null)

    const [isFavorite, setIsFavorite] = useState(false)

    const [userLogger, setUserLogger] = useState(false)
    const [loading, setLoading] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogger(true) : setUserLogger(false)
    })

    useFocusEffect(
        useCallback(() => {
            (async ()=> {
                const response = await getDocumentById("restaurants", id)
                if(response.statusResponse){
                   setRestaurant(response.document)
                }else{
                    setRestaurant({})
                    Alert.alert("Error loading the restaurant.")
                }        
            })()
        }, [])
    )

    useEffect(() => {
        (async ()=> {
            if(userLogger && restaurant){
                const response = await getFavorite(restaurant.id)
                response.statusResponse && setIsFavorite(response.isFavorite)
            }
        })()
    }, [userLogger, restaurant])


    const remoteFavoriteDoc = async()=> {
        setLoading(true)
        const response = await removeFavorite(restaurant.id)
        setLoading(false)     

        if(response.statusResponse){
            toastRef.current.show("Restaurant delete the favorite.", 3000)
        }else{
            toastRef.current.show("Not can't delete the restaurant that favorite.", 3000)
        }
    }
    
    const addFavorite = async() =>{
        if(!userLogger){
            toastRef.current.show("If want add this new restaurant you must at log in.", 3000)
            return
        }
        setLoading(true) 
        const response = await addDocumentWithoutId("favorites", {
            idUser : getCurrentUser().uid,
            idRestaurant : restaurant.id, location : restaurant.location
        })
        if(response.statusResponse){
            setIsFavorite(true)
            toastRef.current.show("This restaurant is in favorite.", 3000)
        }
        else{
            toastRef.current.show("Not cant add the restaurant to favorite.", 3000)
        }
        setLoading(false)

    }

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
            <View style ={styles.viewFavorite}>
                <Icon type="material-community" name = {isFavorite ? "heart" : "heart-outline"}
                onPress = {isFavorite ?  remoteFavoriteDoc : addFavorite }
                color =  "#3c3c4c"
                size = {35}
                underlayColor = "transparent"/>

            </View>

            
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
            <Toast ref={toastRef} position="center" opacity ={0.5}/>            
            <Loading isVisible ={loading} text = "Wait please..."/>
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
            name ={name}
            location ={location}
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
    },
    viewFavorite : {
        position: "absolute",
        top: 0 ,
        right : 0,
        backgroundColor : "#fff",
        borderBottomLeftRadius : 100,
        padding : 5,
        paddingLeft : 15
    }
})
