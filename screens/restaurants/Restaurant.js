import React, {useState, useRef, useEffect, useCallback} from 'react'
import { Alert, Dimensions, ScrollView, Settings } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input, ListItem, Rating } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import Toast from 'react-native-easy-toast'

import firebase from 'firebase/app'

import { useFocusEffect } from '@react-navigation/native'
import {map, isEmpty} from 'loadsh'
import CarouselImage from '../../components/CarouselImage'
import Loading from '../../components/Loading'
import MapRestaurant from '../../components/restaurants/MapRestaurant'
import { addDocumentWithoutId, getCurrentUser, getDocumentById, getFavorite, getToken, getUserFavorite, removeFavorite, sendPushNotifications, setNotificationsMessage } from '../../util/action'
import { callNumber, formatPhone, sendEmail, sendWhastApp } from '../../util/helper'
import ListReviews from '../../components/restaurants/ListReviews'
import Modal from '../../components/Modal'

const widthDimension = Dimensions.get("window").width

export default function Restaurant({navigation, route}) {

    const toastRef = useRef()
    const [currentUser, setCurrentUser] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [modalNotification, setModalNotification] = useState(false)
    const {id, name} = route.params 
    navigation.setOptions({title: name})
    const [restaurant, setRestaurant] = useState(null)

    const [isFavorite, setIsFavorite] = useState(false)

    const [userLogger, setUserLogger] = useState(false)
    const [loading, setLoading] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogger(true) : setUserLogger(false)
        setCurrentUser(user)
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
                phone = {formatPhone(restaurant.phone)}
                currentUser={currentUser}
                phoneNotFormat = {restaurant.phone}
                setLoading ={setLoading}
                setModalNotification={setModalNotification}
                
                />
            <ListReviews
             navigation = {navigation}
             idRestaurant = {restaurant.id}                          
            />
            <SendMessage    
            modalNotification ={modalNotification} 
            setModalNotification = {setModalNotification}
            restaurant={restaurant}
            setLoading ={setLoading}
            />
            <Toast ref={toastRef} position="center" opacity ={0.5}/>            
            <Loading isVisible ={loading} text = "Wait please..."/>
        </ScrollView>
    )
}

function SendMessage({modalNotification, setModalNotification, restaurant, setLoading}) {
     const [title, setTitle] = useState("")
     const [errorTitle, setErrorTitle] = useState(null)
     const [message, setMessage] = useState("")
     const [errorMessage, setErrorMessage] = useState(null)

 

     const sendNotification = async()=>{
        

        if(!valideForm()){
           return
        }

        setLoading(true)

        const userName= getCurrentUser().displayName ? getCurrentUser().displayName : "Anonimo"

        const theMessage = ` ${message} the restaurant : ${restaurant.name}`

        const usersFavorite = await getUserFavorite(restaurant.id)


        if(!usersFavorite.statusResponse){
            setLoading(false)
            Alert.alert("Error get the users what lovers the restaurant.")
            return
        }


        await Promise.all(
            map(usersFavorite.users, async(user)=> {             
                const messageNotification = await setNotificationsMessage(
                    user.token,
                    `${userName}, he said : ${title}`,
                    theMessage,
                    {data: theMessage}
                )
                await sendPushNotifications(messageNotification)        
            })
        )
        
        setLoading(false)
        setTitle(null)
        setMessage(null)
        setModalNotification(false)
    }

    const valideForm  =() => {
        if(isEmpty(title)){
            setErrorTitle("This filed is empty.")
            return false
        }
        if(isEmpty(message)){
            setErrorTitle("")
            setErrorMessage("The filed message is empty, you mus't enter a message.")
            return false
        }
        setErrorMessage("")
        return true
    }
     return(
         <Modal
            isVisible={modalNotification}
           setVisible={setModalNotification} >
         <KeyboardAwareScrollView style = {styles.viewScrollSendMessage}>

          <View style={styles.modalNotificationStyle}>
              <Text style={styles.textStyle}>Send a message to  lovers {restaurant.name}
              </Text>
              <Input
                placeholder= "Title the message..."
                onChangeText = {(text)=> setTitle(text)}
                value = {title}
                errorMessage = {errorTitle}
              />
              <Input
                placeholder= "Message..."
                multiline
                inputStyle = {styles.textAreaStyle}
                onChangeText = {(text)=> setMessage(text)}
                value = {message}
                errorMessage = {errorMessage}
              />
              <Button 
              title = "Send Message"
              buttonStyle = {styles.btnSendMessage}
              onPress ={sendNotification}
              containerStyle = {styles.btnContainer}/>
          </View>
          </KeyboardAwareScrollView>
    
          </Modal> 
     )

}

function RestaurantInfo({name, location, address, email, 
    phone, currentUser, phoneNotFormat, setModalNotification}) {
    

    const listInfo = [
        { type: "addres", text: address, iconLeft: "map-marker-outline", iconRigth : "message-text-outline"},
        { type: "phone", text: phone, iconLeft: "phone", iconRigth : "whatsapp"},
        { type: "email", text: email, iconLeft: "at"},        
    ]

    const actionLeft = (text)=> {
         if(text === "phone"){
             callNumber(phone)
         }else if (text === "email"){
             if(currentUser){
                sendEmail(email, "Interesting", `I am ${currentUser.displayName}, I am interested in your services`)
             }else {
                sendEmail(email, "Interesting", "I am interested in your services")
             }
         }
    }

    const actionRigth = (text)=> {
        if(text === "phone") {
            phone = `+1${phoneNotFormat}`
            if(currentUser){
                sendWhastApp(phone, "Interesting " + ` I am ${currentUser.displayName}, I am interested in your services`)
             }else {
                sendWhastApp(phone, "Interesting " + ` I am interested in your services`)
             }
        }
        else if(text == "addres"){
            setModalNotification(true)
        }
    }

    
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
                            name = {item.iconLeft}
                            color ="#3c3c4c"
                            onPress ={
                                () => actionLeft(item.type)
                            }/>                        
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                        {
                            item.iconRigth && (
                            <Icon
                                type ="material-community"
                                name = {item.iconRigth}
                                color ="#3c3c4c"
                                onPress ={
                                    ()=> actionRigth(item.type)
                                }/>                            
                            )
                        }
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
    },
    textAreaStyle : {
        height : 100,
        paddingHorizontal : 10,        
    }, 
    btnSendMessage : {
        backgroundColor : "#3c3c4c"
    },
    btnContainer : {
        width: "65%",
        borderRadius: 16
    },
    textStyle: {
        color : "#000",
        fontSize : 16,
        fontWeight : "bold"
    },
    modalNotificationStyle : {
        justifyContent : "center",
        alignItems : "center"
    },
    viewScrollSendMessage: {
        height: 300
    }


})
