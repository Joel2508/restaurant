import React from 'react'
import { ActivityIndicator } from 'react-native'

import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-elements'
import Carousel, {Pagination} from 'react-native-snap-carousel'
import {size} from 'loadsh' 

export default function CarouselImage({images, height, width, activieSlide, setActiveSlide}) {


    const renderItem = ({item}) =>{
       return (
           <Image
           style = {{width, height, borderRadius : 10}}
           PlaceholderContent ={<ActivityIndicator color = "#fff"/>}
           source = {{uri: item}}
           />
       )
    }
    return (
        <View>
        <Carousel
            layout={"tinder"}
            data ={images}
            sliderWidth = {width}
            itemWidth = {width}
            itemHeight ={height}
            renderItem = {renderItem}
            onSnapToItem={(index) => setActiveSlide(index)}
            />
            <MyPagination data={images} activieSlide = {activieSlide}/>
        </View>
    )
}

function MyPagination({data, activieSlide}){
     return(
         <Pagination
            dotsLength={size(data)}
            activeDotIndex ={activieSlide}
            containerStyle = {styles.containerPagination}
            dotStyle = {styles.dotActive}
            inactiveDotStyle = {styles.dotInative}    
            inactiveDotOpacity ={0.6}
            inactiveDotScale={0.6}
            />
     )
}

const styles = StyleSheet.create({
    containerPagination: {
        backgroundColor: "transparent",
        position : "absolute",
        zIndex : 1,
        bottom : 0,
        alignSelf : "center",        
    },
    dotActive : {
        width: 20,
        height: 20,
        borderRadius: 12,
        marginHorizontal : 2,
        backgroundColor : "#3c3c4c"
    },

    dotInative : {
        width: 14,
        height: 14,
        borderRadius: 8,
        marginHorizontal : 2,
        backgroundColor : "#fff"
    },
})
