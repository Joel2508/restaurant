
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Icon } from 'react-native-elements'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RestaurantsStack from '../navigations/RestaurantsStack'
import AccountStack from '../navigations/AccountStack'
import FavoritesStack from '../navigations/FavoritesStack'
import SearchStack from '../navigations/SearchStack'
import TopRestaurantsStack from '../navigations/TopRestaurantsStack'



const Tab =  createBottomTabNavigator()

export default function Navigation() {

    const screenOptions = (route, color) => {
        let iconName 
        switch (route.name) {
            case "restaurants":
                iconName = "silverware-fork-knife"                
                break;
            case "favorites":
                iconName = "star-outline"                
                break;
            case "account":
                iconName = "account-circle-outline"                
                break;
            case "search":
                iconName = "selection-search"                
                break;                    
            case "topRestaurants":
                iconName = "arrow-top-right-bold-outline"               
                break;                    
    
            default:
                break;
        }

        return (
            <Icon
               type="material-community"
               name = {iconName}
               size = {22}
               color = {color}
            />
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName = "restaurants"
                tabBarOptions ={{
                    inactiveTintColor : "#e0d8c8",
                    activeTintColor : "#050505"
                        
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                })}>                            
                
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
                    name="search"
                    component ={SearchStack}
                    options = {{title : "Search"}}
                />
                <Tab.Screen
                    name="topRestaurants"
                    component ={TopRestaurantsStack}
                    options = {{title : "Top 5"}}
                />
                <Tab.Screen
                    name="account"
                    component ={AccountStack}
                    options = {{title : "Account"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
