import { firestore } from 'firebase'
import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import firebase from 'firebase/app'
import { Button } from 'react-native-elements'
import AddReviewRestaurant from '../../screens/restaurants/AddReviewRestaurant'
import Modal from '../Modal'
export default function ListReviews({navigation, idRestaurant}) {

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
    }
})
