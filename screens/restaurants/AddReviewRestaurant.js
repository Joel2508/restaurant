import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {AirbnbRating, Button, Input} from 'react-native-elements'
import Toast from 'react-native-easy-toast'


import {isEmpty} from 'loadsh'
import Loading from '../../components/Loading'
import { addDocumentWithoutId, getCurrentUser, getDocumentById, updateDocumentRestaurantById } from '../../util/action'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function AddReviewRestaurant({navigation, setshoModal, idRestaurant}) {

    const toast = useRef()

    const [rating, setRating] = useState(null)

    const [title, setTitle] = useState("")
    const [errorTitle, seterrorTitle] = useState(null)
    const [review, setReview] = useState("")
    const [errorReview, setErrorReview] = useState(null)

    const [loading, setLoading] = useState(false)

    const AddReview = async() => {
          if(!validateForm()){
             return
          }

          setLoading(true)
          const user =  getCurrentUser()
          const data = {
              idUser: user.uid,
              avatarUser : user.photoURL,
              idRestaurant: idRestaurant,
              title,
              rating, 
              comment: review,
              createA: new Date(),              
          }


          const responseReview = await addDocumentWithoutId("reviews", data)
          if(!responseReview.statusResponse){
            toast.current.show("Error send comment, please try later.", 3000)
            setLoading(false)
            return
          }

          const responseGetRestaurant = await getDocumentById("restaurants", idRestaurant)
          if(!responseGetRestaurant.statusResponse){
            setLoading(false)
            toast.current.show("Error when opting for the restaurant.", 3000)
            return
          }

          const restaurant = responseGetRestaurant.document
          const raitingTotal = restaurant.raitingTotal + rating
          const quantityVoiting = restaurant.quantityVoiting + 1
          const ratingResult = raitingTotal / quantityVoiting 

          const responseUpdateRestaurant = await updateDocumentRestaurantById("restaurants", idRestaurant,{
            raitingTotal, 
            quantityVoiting, 
            rating : ratingResult
          })

          if(!responseUpdateRestaurant.statusResponse){
            setLoading(false)
            toast.current.show("Error update the restaurant.", 3000)
            return
          }
          setLoading(false)
          setshoModal(false)


    }

    const validateForm = () =>{
        if(!rating){
            toast.current.show("You must enter a punctuation.", 3000)
            return false
        }

        if(isEmpty(title)){
            seterrorTitle("You must enter a title.")
            return false
         }
         if(isEmpty(review)){
            setTitle("")
            setErrorReview("You must enter a comment.")
            return false
         }
         setTitle("")
         setReview("")

       return true
    }

    return (
        <View>
           <KeyboardAwareScrollView style = {styles.viewRating}>
           <Text style ={styles.newComment}>New Comment</Text>
               <AirbnbRating
                    count = {5}
                    reviews = {["Bad", "Average", "Good", "Very Good", "Excellent"]}
                    defaultRating = {0}
                    size = {35} 
                    onFinishRating = {(value) => setRating(value)}>
               </AirbnbRating>
               <Input
                 placeholder = "Title..."
                 containerStyle = {styles.input}
                 onChange ={(e) => setTitle(e.nativeEvent.text)}         
                 errorMessage ={errorTitle}
               />
               <Input
               keyboardAppearance ="dark"
                 placeholder = "Comment..."
                 containerStyle = {styles.comment}
                 style ={styles.styleComment}
                 multiline
                 onChange = {(e) => setReview(e.nativeEvent.text)}
                 errorMessage={errorReview}
               />
               <Button
                title = "Send Comment"
                containerStyle = {styles.btnSendComment}
                buttonStyle = {styles.btnStyle}
                onPress = {() => AddReview()}>
               </Button>
               <Loading isVisible={loading} text = "Send Comment..."/>
               <Toast ref={toast} position = "top" opacity={0.5}/>
           </KeyboardAwareScrollView>

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
        height : 380,
    },
    input:{
       marginTop : 10
    },
    styleComment : {
        height : 100,
        width : "50%",
        padding : 0,
        margin : 0
    },
    btnSendComment: {
       flex : 1,
       justifyContent : "flex-end",
        marginBottom:10,
        marginTop : 20,
        width: "100%"
    },
    btnStyle: {
        backgroundColor : "#7c7c7c",
        borderRadius : 26
    },
})
