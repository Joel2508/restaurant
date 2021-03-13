import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {AirbnbRating, Button, Input} from 'react-native-elements'

import Toast from 'react-native-easy-toast'

export default function AddReviewRestaurant({navigation, setshoModal, idRestaurant}) {

    const toast = useRef()

    const [rating, setRating] = useState(null)

    const [title, setTitle] = useState("")
    const [errorTitle, seterrorTitle] = useState(null)
    const [review, setReview] = useState("")
    const [errorReview, setErrorReview] = useState(null)

    const [loading, setLoading] = useState(false)
false

    return (
        <View>
           <View style = {styles.viewRating}>
           <Text style ={styles.newComment}>New Comment</Text>

               <AirbnbRating
                    count = {5}
                    reviews = {["Bad", "Average", "Good", "Very Good", "Excellent"]}
                    defaultRating = {0}
                    size = {35}>
               </AirbnbRating>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    newComment : {
       fontSize: 25,
       fontWeight : "bold",
       textAlign : "center"
    },
    viewRating: {
        height : 450,
    }
})
