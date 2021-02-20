import React from 'react'
import {  ScrollView } from 'react-native'
import { StyleSheet, Image, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Loading from '../../components/Loading'

export default function UserGuest() {
    return (
        <ScrollView
        centerContent = {true}
        style = {styles.viewBody}>
            <Image 
                source = {require("../../assets/restaurante1.png")}
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
            onPress = {() => console.log("Click!!!")}
        />
        </ScrollView>
        )
}

const styles = StyleSheet.create({
    viewBody : {
        marginHorizontal : 40, 
        marginVertical:40
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
        textAlign : 'justify',
        marginBottom:20,
        fontSize:15,
        color : '#3c3c4c'
    },
    button : {        
        backgroundColor : '#3c3c4c',
        borderRadius : 10
    }
})
