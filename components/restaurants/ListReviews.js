import React,{useState, useCallback, useRef} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import firebase from 'firebase/app'
import { Avatar, Button, Rating } from 'react-native-elements'
import AddReviewRestaurant from '../../screens/restaurants/AddReviewRestaurant'
import Modal from '../Modal'
import ModalImage from '../ModalImage'

import {map, size} from 'loadsh'

import Toast from 'react-native-easy-toast'
import moment  from 'moment/min/moment-with-locales'
import { getRestaurantReviewById } from '../../util/action'
import { ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import SelectImageUserReview from './SelectImageUserReview'
moment.locale("es")

export default function ListReviews({navigation, idRestaurant}) {

    const [reviews, setReviews] = useState([])
    const toast = useRef()
    useFocusEffect(
      useCallback(() => {
          (async() => {
              const response = await getRestaurantReviewById(idRestaurant)
              if (response.statusResponse) {
                  setReviews(response.reviews)
              }
          })()
      }, [])
  )

     


    const [userLogger, setUserLogger] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    const [renderComponentImage, setRenderComponentImage] = useState(null)
    const [shoModal, setshoModal] = useState(false)
    

    firebase.auth().onAuthStateChanged((user) => {
       user ? setUserLogger(true) : setUserLogger(false)
    })


    const SelectImageUser = (key, avatarUser)=> {

      if(key === "SelectImageUser"){
        if(avatarUser !== null ){

          setRenderComponentImage(
            <SelectImageUserReview avatarUser={avatarUser}/>
           )   
        }
        else{
          toast.current.show("Not Image the user enabled", 3000)
          return
        }
  
       
      }
      setshoModal(true)
    }

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
       <Toast ref={toast} position = "top" opacity={1.5}/>
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
           <ReviewComment  reviewComment={reviewDocument} SelectImageUser={SelectImageUser} toast ={toast} />
         ))
       )
     }
     <View>
     <ModalImage isVisible={shoModal} setVisible = {setshoModal}>
        {
          renderComponentImage
        }
     </ModalImage>
     </View>
    </View>
    )
}

function ReviewComment ( { reviewComment, SelectImageUser } ) {
     const {title, createA, avatarUser, rating, comment} = reviewComment
     const createReview = new Date(createA.seconds * 1000)


     return (
       <View style = {styles.viewReview}>
         <View style ={styles.imageAvatar}>
           <Avatar renderPlaceholderContent= {<ActivityIndicator color ="#fff"/>}
           size ="large"
           rounded
           containerStyle = {styles.imageAvatarUser}
           onPress ={() => SelectImageUser("SelectImageUser", avatarUser)}
           source = {
             avatarUser ? {uri : avatarUser} : require("../../assets/avatar1.png")
           }
           />
         </View>
        <View style={styles.viewInfo}>
          <Text style={styles.reviewTitle}>{title}</Text>
          <Text style={styles.reviewTitleComment}>{comment}</Text>
          <Rating imageSize={15}
          
            startingValue={rating}
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
    reviwDate : {
      marginTop : 5,
      color : "gray",
      fontSize :12,
      position : "absolute",
      right:0,
      bottom :0
    },
    reviewTitleComment: {
      color : "gray",

    }
})
