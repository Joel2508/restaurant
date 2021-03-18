import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { map } from 'loadsh'
import { Icon, ListItem } from 'react-native-elements'
import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeDisplayEmailForm from './ChangeDisplayEmailForm'
import ChangeDisplayPassword from './ChangeDisplayPassword'



export default function AccountOptions({user, toastRef, setReloadUser}) {
    const [shoModal, setshoModal] = useState(false)
     
    const [renderComponent, setRenderComponent] = useState(null)
    const displayEmail = user.email
    const gerenetaOption = () => {
        return [{
    
            title: "Change, First Name and Last Name",
            iconNameLeft: "account-circle-outline",
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
        

        if(key === "displayName"){
            setRenderComponent (
                <ChangeDisplayNameForm
                displayName = {user.displayName} 
                setshoModal={setshoModal}
                toastRef ={toastRef}
                setReloadUser = {setReloadUser}>

                </ChangeDisplayNameForm>
            )            
        }
        if(key === "displayEmail"){
            setRenderComponent(
                <ChangeDisplayEmailForm 
                    displayEmail= {displayEmail} 
                    setshoModal={setshoModal}
                    toastRef ={toastRef}
                    setReloadUser = {setReloadUser}>                    
                </ChangeDisplayEmailForm>

            )
        }
        if(key === "displayPassword"){
            setRenderComponent(

                <ChangeDisplayPassword             
                    setshoModal={setshoModal}
                    toastRef ={toastRef}>
                </ChangeDisplayPassword>
            )

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
            <Modal isVisible = {shoModal} setVisible ={setshoModal} isImage={false}>
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
    },
})
