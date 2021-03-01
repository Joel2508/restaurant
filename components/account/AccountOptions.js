import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { map } from 'loadsh'
import { Icon, ListItem } from 'react-native-elements'
import Modal from '../Modal'
import ChangeDisplayName from './ChangeDisplayNameForm'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'


export default function AccountOptions({user, toastRef}) {
    const [shoModal, setshoModal] = useState(false)
     
    const [renderComponent, setRenderComponent] = useState(null)
    const gerenetaOption = () => {
        return [{
    
            title: "Change, First Name and Last Name",
            iconNameLeft: "account-circle",
            iconNameRight: "chevron-right",
            iconColorLeft: "#3c3c4c",        
            iconColorRight: "#3c3c4c",        
            onPress: () => selectComponent("displayName")
        },
        {
            title: "Change Email",
            iconNameLeft: "at",
            iconNameRight: "chevron-right",
            iconColorLeft: "#3c3c4c",        
            iconColorRight: "#3c3c4c",        
            onPress: () => selectComponent("displayEmail")
        },
        {
            title: "Change Password",
            iconNameLeft: "lock-reset",
            iconNameRight: "chevron-right",
            iconColorLeft: "#3c3c4c",        
            iconColorRight: "#3c3c4c",        
            onPress: () => selectComponent("displayPassword")
        }]
    }
    const selectComponent = (key) =>{ 
        
        switch (key) {
            case "displayName":
                setRenderComponent (
                    <ChangeDisplayNameForm displayname={user.displayname} setshoModal={setshoModal}
                    toastRef ={toastRef}>

                    </ChangeDisplayNameForm>
                )            
                break;
            case "displayEmail":
                setRenderComponent(
                    <ChangeDisplayName>Display Email</ChangeDisplayName>
                )
                case "displayPassword":
                    setRenderComponent(
                        <Text>Display Password...</Text>
                    )
            default:
                break;
        }
        setshoModal(true)
    
    }
    const menuOptions = gerenetaOption()


    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                    key={index}
                    style ={ styles.menuItem}
                    onPress ={menu.onPress}>    
                        <Icon
                        type = "material-community"
                        name={menu.iconNameLeft}
                        color ={menu.iconColorLeft}/>
                        <ListItem.Content>
                            <ListItem.Title>
                                {menu.title}
                            </ListItem.Title>
                        </ListItem.Content>
                        <Icon
                        type = "material-community"
                        name={menu.iconNameRight}
                        color ={menu.iconColorRight}/>

                    </ListItem>
                ))
            }
            <Modal isVisible = {shoModal} setVisible ={setshoModal}>
                {
                    renderComponent
                }
            </Modal>
        </View>
    )
}




const styles = StyleSheet.create({
    menuItem : {
        borderBottomWidth: 1,
        borderBottomColor : "#c1c1c1"
    }
})
