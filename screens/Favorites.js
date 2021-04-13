import React, {useState, useCallback, useRef} from 'react'
import { StyleSheet, Text, View, 
    FlatList, TouchableOpacity, Alert, ActivityIndicator  } from'react-native'
import {useFocusEffect} from '@react-navigation/native'
import { getFavorites, removeFavorite } from '../util/action'

import {Button, Icon, Image} from 'react-native-elements'
import Toast from 'react-native-easy-toast'
import firebase, { firestore } from 'firebase/app'

import Loading from '../components/Loading'
import Modal from '../components/Modal'
import MapRestaurant from '../components/restaurants/MapRestaurant'

export default function Favorites({navigation}) {

    const toast = useRef()

    const [restaurants, setRestaurants] = useState(null)

    const [userLogged, setUserLogged] = useState(false)

    const [loading, setLoading] = useState(false)

    const [reloadData, setReloadData] = useState(false)
    
   
    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })

     

    useFocusEffect(
        useCallback(() => {
            if(userLogged){
                async function getData() {
                    setLoading(true)
                    const response = await getFavorites()
                    setRestaurants(response.favorites)
                    setLoading(false)                
            }
            getData()
          }
          setReloadData(false)          
        }, [userLogged, reloadData])
    )

    if(!userLogged){

        return  <UserNotLogged navigation={navigation}/>

    }
    if(!restaurants){
       return <Loading isVisible ={true} text="Loading Restaurant..." />
    } else if(restaurants?.length === 0) {
        return <NotFoundRestaurants/>
    }
    return (
        <View style={styles.viewContainer}>
            {
                restaurants ? (
                   <FlatList
                    data ={restaurants}
                    keyExtractor = {(item, index) => index.toString()}
                    renderItem ={(restaurant)=>(

                        <Restaurant restaurant={restaurant} setLoading={setLoading} 
                        loading={loading} toast ={toast} 
                        navigation={navigation} setReloadData={setReloadData} />

                    )}
                   />
                ):(
                   <View style={styles.loadingRestaurant}>
                        <ActivityIndicator size="large" />
                        <Text style={{textAlign:"center"}}>Loading Restaurant...</Text>
                   </View>
                )
            }
            <Toast ref={toast} position="center" opacity={0.9} />
            <Loading isVisible ={loading} text ="Await Please..."/>
        </View>
    )
}

function Restaurant({restaurant,setLoading,loading,toast,navigation, setReloadData}){
    const {id, name, images, location} =restaurant.item
     
    const [isVisibiliy, setIsVisibiliy] = useState(false)

    
    const [renderComponent, setRenderComponent] = useState(null)


    const confirmeRemoveFavorite =()=>{
        Alert.alert("Delete favorite restaurant", "Are you want this restaurant the favorites?",
        [
            {
                text : "No",
                style : "cancel"
            },
            {
                text : "Yes",
                onPress : removeFavoriteDoc
            },
        ], {cancelable : false})
    }
    const removeFavoriteDoc = async()=>{
        setLoading(true)
        const response = await removeFavorite(id)
        setLoading(false)
        if(response.statusResponse){
           setReloadData(true)
           toast.current.show("Restaurant delete the favorite.", 3000)
        } else{
            toast.current.show("Error to delete the favorite.", 3000)
        }
    }

    const loadingMapRestaurant = () => {
         setIsVisibiliy(true)
         setRenderComponent(
            <View>
                <MapRestaurant
                   name ={name}
                   location ={location}
                   height={600}/>
             </View>
         )
    }

    
        return(
            <View style={styles.restaurantFavoritesStyles}>
                <TouchableOpacity
                onPress ={()=>      navigation.navigate("restaurants", {screen: "onerestaurant", params: {id, name}})}>
                 <Image resizeMode="cover"
                 style={styles.imageStyle}
                 PlaceholderContent={<ActivityIndicator color="#fff"/>}
                 source ={{uri: images[0]}}/>
                 <View style={styles.infoStyle}>
                     <Text style={styles.nameStyle}>
                         {name}
                     </Text>
                     <Icon type="material-community"
                     name ="heart"
                     color ="#f00"
                     containerStyle ={styles.favoritesStyles}
                     underlayColor = "transparent"
                     onPress ={confirmeRemoveFavorite}/>
                 </View>
                 
                </TouchableOpacity>
                <View style={styles.iconStyleMap}>
                <Icon type="material-community"
                        name ="map-marker-outline"
                        color ="#fff"
                        containerStyle ={styles.mapStyle}
                        underlayColor = "transparent"
                        onPress ={() => loadingMapRestaurant()}/>

                </View>

                <Modal isVisible={isVisibiliy} setVisible={setIsVisibiliy} >
                    {
                        renderComponent
                    }
                </Modal>
            </View>
        )
}

function NotFoundRestaurants(){
    return (
        <View style={{flex: 1, alignItems : "center", justifyContent: "center", backgroundColor: "white"}}>
            <Icon type="material-community"
                   name = "alert-octagon-outline"
                   size={50}                   
            />
            <Text style={{fontSize:20, fontWeight: "bold"}}>
                You not have favoreties restaurant 
            </Text>
        </View>
    )
}

function UserNotLogged ({navigation}) {
    return (
        <View style={{flex:1, alignItems :"center", justifyContent: "center", backgroundColor: "white"}}>
            <Icon type="material-community" name = "alert-octagon-outline"size={50}/>
            <Text style={{fontSize:20, fontWeight: "bold", textAlign:"center"}}>You needing is log in for view your favorites restaurants  </Text>
           <Button title="Log In" 
           containerStyle = {{marginTop : 20, width: "80%" }}
           buttonStyle ={{backgroundColor : "#3c3c4c", borderRadius : 26}} 
           onPress ={()=> navigation.navigate("account", {screen : "login"})}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
       flex: 1,
       backgroundColor : "white"
    },
    loadingRestaurant : {
        marginVertical : 10
    },
    restaurantFavoritesStyles : {
        margin : 1,
        backgroundColor: "white"
    },
    imageStyle : {
        width : "100%",
        height: 180
    },
    infoStyle: {
        
        alignItems: "center",
        justifyContent : "space-between",
        flexDirection : "row",
        paddingHorizontal : 10,
        paddingVertical : 5,
        marginTop : -5,
        backgroundColor : "#fff",
    },
    nameStyle : {
        fontWeight :"bold",
        fontSize : 20,        
    },
    favoritesStyles : {
        marginTop: -25,
        backgroundColor : "#fff",
        padding: 15, 
        borderRadius : 35
    },
    iconStyleMap : {
        flex: 1,
        flexDirection : "row",
        justifyContent:"flex-end",
        marginHorizontal: 10

    },
    mapStyle:{
        width : 50,
        height : 50,
        backgroundColor : "#3c3c4c",
        borderRadius: 25,
        padding: 13,
        

    }
})
