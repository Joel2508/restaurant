import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { BorderlessButton } from 'react-native-gesture-handler'

export default function ChangeDisplayNameForm({displayname, setShoModal, toastRef}) {
    return (
        <View style ={styles.view}>
            <Input 
            placeholder="Enter your firt name and last name"
            containerStyle = {styles.container}
            defaultValue ={displayname}
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
            >

            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        alignItems : "center",
        paddingVertical : 10
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
