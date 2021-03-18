import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function ModalImage({isVisible, setVisible,  children}) {
    return (
        <Overlay
            isVisible = {isVisible}
            overlayStyle = {styles.overLay}
            onBackdropPress ={() => setVisible(false)} >
            {
                children
            }
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overLay:{
        width : "95%",
        borderRadius : 26,
        backgroundColor : "transparent"
    }
})
