import React from 'react'
import {  ScrollView } from 'react-native'
import { StyleSheet, Image, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Loading from '../../components/Loading'
import { useNavigation } from  '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()
    return (
        <ScrollView
        centerContent = {true}
        style = {styles.viewBody}>
            <Image 
                source = {require("../../assets/images.png")}
                resizeMode = "contain"                
                style = {styles.image}
            />
        <Text style={styles.title}>Consult your profile in this restaurant..</Text>
        <Text style={styles.description}>  How would you describe your best restaurant? 
               Search and view the best restaurants for you and tell what your best experience has been
        </Text>
        <Button
            buttonStyle ={styles.button}
            title= "View your profile"
            onPress = {() => navigation.navigate("login")}
        />
        </ScrollView>
        )
}

const styles = StyleSheet.create({
    viewBody : {
        backgroundColor : "white"
    },
    image : {
        height: 150,
        width : "100%",
        marginBottom : 10,
        
    },
    title : {
     fontWeight: 'bold',
     fontSize : 19,
     textAlign : "center",
     marginBottom : 10
    },
    description : {
        textAlign : 'center',
        marginBottom:20,
        fontSize:15,
        color : '#3c3c4c'
    },
    button : {        
        backgroundColor : '#3c3c4c',
        borderRadius : 23,
        margin: 20
    }
})
