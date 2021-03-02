import React, {useState, useRef, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import { closeSession, getCurrentUser } from '../../util/action'
 
import Toast from  'react-native-easy-toast'
import InforUser from '../../components/account/InforUser'
import Loading from '../../components/Loading'
import AccountOptions from '../../components/account/AccountOptions'



export default function UserLogged() {

    const toastRef = useRef()
    const navigation = useNavigation()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [reloadUser, setReloadUser] = useState(false)

    useEffect(() => {

        setUser(getCurrentUser())
        setReloadUser(false)
    }, [reloadUser])
    return (
        <View style={styles.container}>
             {
               user && 
               (
                   <View> 
                     <InforUser 
                     user = {user} 
                     setLoading={setLoading}
                    setLoadingText={setLoadingText} 
                    setReloadUser={setReloadUser}
                      /> 
                      <AccountOptions
                      user={user}
                      toastRef = {toastRef}
                      setReloadUser={setReloadUser}/>
                   </View>
               )            
             }
            <Button 
            buttonStyle = {styles.btnLogOut}
            titleStyle = {styles.btnLogOutTitle}
            title="Log Out"
            onPress ={() =>{ 
                closeSession()
                navigation.navigate("restaurants")
                }}/>
                <Toast ref={toastRef} position="center" opacity={0.9}/>
                <Loading isVisible ={loading} text ={loadingText}/>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        minHeight : "100%",
        
    },
    btnLogOut : {
      marginTop : 30,
      margin : 30,
      borderRadius : 20,
      backgroundColor: "#3c3c4c",
      borderTopWidth : 1,
      borderTopColor : "#ffffff",
      borderBottomWidth :1,
      borderBottomColor : "#c1c1c1",
      paddingVertical : 10,
    }, 
    btnLogOutTitle : {
        color: "#c1c1c1"
    }

})
