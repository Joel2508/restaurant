import React from 'react'
import { ScrollView ,StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'


export default function Login() {
    return (
       <ScrollView>
           <Image
           source = {require("../../assets/restaurante1.png")}
           resizeMode = 'stretch'
           style = {styles.image}>
           </Image>
           <View style ={styles.contain}>
               <Text>Login Form</Text>
              <CreateAccount/>
           </View>
           <Divider style={styles.divider}/>
       </ScrollView>
    )
}

function CreateAccount (props) {
    const navigation = useNavigation()
    return (
        <Text style ={styles.register}
        onPress = {() => navigation.navigate("register")}
        >
            You do not have an account?
            
            <Text style ={styles.btnregister}> Register </Text>
        </Text>
        
    )

}


const styles = StyleSheet.create({
    image: {           
      height: 150,
      width: "90%",    
      marginBottom: 20,
      margin : 20, 
      alignItems : "flex-end"               
    },
    contain : {
        marginHorizontal : 40
    },
    divider : {
        backgroundColor: '#3c3c4c',
        margin:40
    },
    register : {
        marginTop : 15,
        marginHorizontal: 10,
        alignSelf: "center" 
    }, 
    btnregister : {
        color : '#3c3c4c',
        fontSize : 16,
        fontWeight : 'bold',
        
    }

})
