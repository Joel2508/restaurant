import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import {openMap} from 'react-native-open-maps'
export default function MapRestaurant({location, name, height}) {
    const openAppMap =() => {
      openMap({
          latitude: location.latitude,
          longitude : location.longitude,
          zoom: 19,
          query : name
      })
    }
    return (
        <MapView style= {{height: height, witdh : "100%"}} initialRegion = {location}
        onPress = {openAppMap}>

        <Marker
        coordinate ={{
        latitude : location.latitude,
         longitude : location.longitude}}
         />

        </MapView>
    )
}

const styles = StyleSheet.create({
    mapView: {
        height :100
    }
})
