import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Search from '../screens/Search'

const Stack = createStackNavigator()

export default function SearchStack() {
    return (
     <Stack.Navigator>
         <Stack.Screen
         name = "search"
         component = {Search}
         options = {{title : "Search"}}
         />
     </Stack.Navigator>
    )
}
