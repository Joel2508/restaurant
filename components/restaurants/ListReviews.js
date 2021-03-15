import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import firebase from 'firebase/app'
import { Avatar, Button, Rating } from 'react-native-elements'
import AddReviewRestaurant from '../../screens/restaurants/AddReviewRestaurant'
import Modal from '../Modal'

import {map, size} from 'loadsh'

import moment  from 'moment/min/moment-with-locales'
import { getRestaurantReviewById } from '../../util/action'
import { ActivityIndicator } from 'react-native'
moment.locale("es")

export default function ListReviews({navigation, idRestaurant}) {

    const [reviews, setReviews] = useState([])
    

    useEffect(() => {
      (async()=>{
        const response  = await getRestaurantReviewById(idRestaurant)
        if(response.statusResponse){
          setReviews(response.reviews)
        }
      })()
    }, [])

    const [userLogger, setUserLogger] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    const [shoModal, setshoModal] = useState(false)
    firebase.auth().onAuthStateChanged((user) => {
       user ? setUserLogger(true) : setUserLogger(false)
    })
    const selectComponent = (key) => {
      if(key === "AddReviewRestaurant"){
        setRenderComponent(

            <AddReviewRestaurant         
                setshoModal={setshoModal}
                idRestaurant = {idRestaurant}>
            </AddReviewRestaurant>
        )

    }        
    setshoModal(true)
}


    return (
     <View>
         {
             userLogger ? (
               <Button
               buttonStyle ={styles.btntAddComment}
                title ="Write your comment"
                titleStyle = {styles.titlebtn}
                icon = {{
                    type :"material-community",
                    name : "square-edit-outline",
                    color : "#3c3c4c"
                }}
                
                onPress = {() =>  selectComponent("AddReviewRestaurant")}/>
             ): (

               <Text 
               style ={styles.title_1}
               onPress = {() => navigation.navigate("login")} >
                    If you want to comment you must be logged in
                  <Text style = {styles.title_2}> Log in</Text>
               </Text>
               
             )
         }
     <Modal isVisible ={shoModal} setVisible ={setshoModal}>
          {
            renderComponent
          }
     </Modal>
     {
       size(reviews) > 0 && (

         map(reviews, reviewDocument =>  (        
           <ReviewComment  reviewComment={reviewDocument} />
         ))
       )
     }
    </View>
    )
}

function ReviewComment ( { reviewComment } ) {
     const {title, review, createA, avatarUser, raiting} = reviewComment
     const createReview = new Date(createA.seconds * 10000)

     return (
       <View style = {styles.viewReview}>
         <View style ={styles.imageAvatar}>
           <Avatar renderPlaceholderContent= {<ActivityIndicator color ="#fff"/>}
           size ="large"
           rounded
           containerStyle = {styles.imageAvatarUser}
           source = {
             avatarUser ? {uri : avatarUser} : require("../../assets/avatar1.png")
           }
           />
         </View>
        <View style={styles.viewInfo}>
          <Text style={styles.reviewTitle}>{title}</Text>
          <Text style={styles.reviewComment}>{review}</Text>
          <Rating imageSize={15}
            startingValue={raiting}
            readonly/>
            <Text style={styles.reviwDate}>{moment(createReview).format("LLL")}</Text>
        </View>
       </View>
     )

}

const styles = StyleSheet.create({
    btntAddComment: {
         backgroundColor : "transparent"
    },
    titlebtn: {
       color: "#7c7c7c"
    },
    title_1 :{
      textAlign : "center",
      color :  "#3c3c4c",
      padding: 25
    },
    title_2 :{
      fontWeight : "bold",
      width : 100,
      height: 100
    },
    viewReview:{
      flexDirection : "row",
      padding : 10,
      paddingBottom : 10,
      borderBottomColor : "#3c3c4c",
      borderBottomWidth: 1 
    },
    imageAvatar : {
      marginRight : 15
    },
    imageAvatarUser : {
      width : 60,
      height: 60
    },
    viewInfo: {
      flex : 1,
      alignItems: "flex-start"
    },
    reviewTitle: {
      fontWeight: "bold"
    },
    reviewComment : {
       paddingTop : 2,
       color : "gray",
       marginBottom : 5
    },
    reviwDate : {
      marginTop : 5,
      color : "gray",
      fontSize :12,
      position : "absolute",
      right:0,
      bottom :0
    }
})
