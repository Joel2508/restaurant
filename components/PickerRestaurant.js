import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MultiSelect from "react-native-multiple-select";


const items = [
  { id: 1, name: "Client" },
  { id: 2, name: "Properties" },
];

export default class PickerRestaurant extends Component {
    state = {
        selectedItems: []
    }
    onSelectedItemsChange = selectedItems => {
        this.setState({selectedItems})
    }
  render() {
    const {selectedItems} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.tilteText}>Select type User...</Text>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            ref={(component) => {
              this.multiSelect = component;
            }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#CCC" }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor : "white",
      padding: 10
  },
  tilteText : {
      padding: 8,
      fontSize: 20,
      textAlign: "center",
      fontWeight: "bold"
  }
});
