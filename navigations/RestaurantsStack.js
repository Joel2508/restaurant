import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Restaurants from '../screens/restaurants/Restaurants'
import AddRestaurant from '../screens/restaurants/AddRestaurant'
import Restaurant from '../screens/restaurants/Restaurant'

const Stack = createStackNavigator()

export default function RestaurantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name ="restaurant"
            component ={Restaurants}
            options = {{title : "Restaurants"}}
            />
            <Stack.Screen
            name ="add-restaurant"
            component ={AddRestaurant}
            options = {{title : "Add Restaurant"}}
            />
            <Stack.Screen
            name ="onerestaurant"
            component ={Restaurant}
            />
        </Stack.Navigator>
        )
}
