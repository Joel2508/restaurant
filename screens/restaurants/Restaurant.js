import React, {useState, useEffect} from 'react'
import { Alert, Dimensions, ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Rating } from 'react-native-elements'

import CarouselImage from '../../components/CarouselImage'
import Loading from '../../components/Loading'
import { getDocumentById } from '../../util/action'

const widthDimension = Dimensions.get("window").width

export default function Restaurant({navigation, route}) {
    const [activeSlide, setActiveSlide] = useState(0)

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
        </ScrollView>
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
    }
})
