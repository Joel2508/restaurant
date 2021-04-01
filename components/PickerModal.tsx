import React, { useState, useEffect } from 'react'
import {View, StyleSheet, Text, Modal} from 'react-native'

import {Picker} from '@react-native-picker/picker'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'

type Props = {
  visible : boolean;
  items: string[];
  title: string;
  onClose: () => void;
  onSelect: (value: string) => void;
  value?: string
}


const PickerModal : React.FC<Props> = ({visible, title, onClose, onSelect, value}) => {
  const [pickerValue, setPickerValue] = useState<string>('Client')
  const items = ['Client', 'Properties']

  useEffect(() => {
      if(value) {
       setPickerValue(value)
      }
  }, [])
    return (
      <Modal animated transparent visible={visible} animationType="fade">
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress ={onClose}>
                <Icon name= "close"/>
              </TouchableOpacity>
             <Text>{title || 'Placerholder'}</Text>
             <Icon name= "check" onPress ={() => onSelect(pickerValue)}/>
            </View>
            
          </View>
          <Picker selectedValue= {pickerValue} onValueChange= {(value) => setPickerValue(value)}>
            {items.map((item)=> (
              <Picker.Item value= {item} label={item}></Picker.Item>
            ))}
          </Picker>

        </View>
      </Modal>
    )
}

export default PickerModal; 

const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems:"center",
        justifyContent: "flex-end",
        backgroundColor: 'transparent'
      },
      pickerContainer : {
        height: 200,
        width: "100%",
        backgroundColor: "white"
        
      },
      header: {
        justifyContent: "space-between",
        flexDirection : "row",
        alignItems : "center",
        backgroundColor : "#eee",
        padding: 10



      }
})