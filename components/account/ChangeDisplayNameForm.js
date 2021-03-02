import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { BorderlessButton } from 'react-native-gesture-handler'

import {isEmpty} from 'loadsh'
import { set } from 'react-native-reanimated'
import { updateProfile } from '../../util/action'

export default function ChangeDisplayNameForm({displayName, setshoModal, toastRef, setReloadUser}) {

    const [newDisplayName, setnewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const updateNameAndLastName = async() => {
          if(!validadForm()){
              return
          }
          setLoading(true)
          const result = await updateProfile({displayName: newDisplayName})
          setLoading(false)
          
          console.log(result)
          if(!result.stastuResponse ){
            setError("Error update change firt name and last name")
            return
          }

          setReloadUser(true)
          toastRef.current.show("Success your data to " + newDisplayName, 3000)
          setshoModal(false)


    }
   const validadForm =() =>{
       setError(null)
       if(displayName === newDisplayName){
            setError("You must enter the different name")
            return false

        }

       if(isEmpty(newDisplayName)){
           setError("You must enter firt name and last name")
           return false
       }
       return true
   }

    return (
        <View style ={styles.view}>
            <Input 
            placeholder="Enter your firt name and last name...."
            containerStyle = {styles.container}
            defaultValue ={displayName}
            onChange ={(e) => setnewDisplayName(e.nativeEvent.text)}
            errorMessage ={error}
            leftIcon = {{
                type: "material-community",
                name: "account-circle",
                color : "#050505"
            }}
            
            />
            <Button 
            title = "Update"
            containerStyle ={styles.btnContainer}
            buttonStyle ={styles.btnButton}
            onPress = { updateNameAndLastName}
            loading ={loading}
            >

            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        alignItems : "center",
        paddingVertical : 20
    },
    container: {
        marginBottom : 10
    },
    btnContainer: {
        width : "100%"
    },
    btnButton: {
        backgroundColor : "#3c3c4c",
        borderRadius: 26,
        alignItems: "center",
        marginBottom : 20,
        height: 50

    }
})
