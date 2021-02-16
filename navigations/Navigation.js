
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RestaurantsStack from '../navigations/RestaurantsStack'
import AccountStack from '../navigations/AccountStack'
import FavoritesStack from '../navigations/FavoritesStack'
import SearchStack from '../navigations/SearchStack'
import TopRestaurantsStack from '../navigations/TopRestaurantsStack'



const Tab =  createBottomTabNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="restaurants"
                    component ={RestaurantsStack}
                    options ={{title : "Restaurants"}}
                />
                <Tab.Screen
                    name="favorites"
                    component ={FavoritesStack}
                    options = {{title : "Favorites"}}
                />
                <Tab.Screen
                    name="account"
                    component ={AccountStack}
                    options = {{title : "Account"}}
                />
                <Tab.Screen
                    name="search"
                    component ={SearchStack}
                    options = {{title : "Search"}}
                />
                <Tab.Screen
                    name="topRestaurants"
                    component ={TopRestaurantsStack}
                    options = {{title : "Top 5"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
