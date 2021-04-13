import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button, Icon, Input } from "react-native-elements";
import { validateEmail } from "../../util/helper";
import { size } from "loadsh";
import { useNavigation } from "@react-navigation/native";
import IconVector from 'react-native-vector-icons/Feather';

import Toast from 'react-native-easy-toast'

import PickerModal from "../PickerModal";

import DropDownPicker from 'react-native-dropdown-picker'


import { Picker } from "@react-native-picker/picker";

import {
  addDocumentWithId,
  getCurrentUser,
  getToken,
  registerUser,
} from "../../util/action";
import Loading from "../Loading";

export default function RegisterForm() {

  const toast = useRef()
  const navigation = useNavigation();

  

  const [typeUser, setTypeUser] = useState(null)


  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormDataValue());

  const [erroEmail, seterroEmail] = useState("");
  const [erroPassword, seterroPassword] = useState("");
  const [erroConfirmPassword, seterroConfirmPassword] = useState("");

  const [loadgin, setLoadgin] = useState(false);
  const [enable, setEnable] = useState(false);

  const selectTypeUser = () => {
    setEnable(true);
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const registerUserClick = async () => {
    if (!validateData()) {
      return;
    }
    setLoadgin(true);

    const resutl = await registerUser(formData.email, formData.password);

    if (!resutl.statusResponse) {
      setLoadgin(false);
      seterroEmail(resutl.error);
      setFormData("");
      return;
    }

    const token = await getToken();

    const typeUserValue = typeUser.value
    const resultToken = await addDocumentWithId(
      "users",
      { token, typeUserValue },
      getCurrentUser().uid
    );
    if (!resultToken.statusResponse) {
      setLoadgin(false);
      seterroEmail(resultToken.error);
      return;
    }

    setLoadgin(false);
    navigation.navigate("account");
  };
  const validateData = () => {
    seterroEmail("");
    seterroPassword("");
    seterroConfirmPassword("");
    
     
    if(typeUser === null){      
      toast.current.show("You mus't select a type the user.", 3000)
      return
    }
    if (!validateEmail(formData.email)) {
      seterroEmail("You must enter an valid email.");
      return  false;
    }

    if (size(formData.password) < 6) {
      seterroPassword("You much enter a 6 character password");
      seterroEmail("")
      return false;
    }
    if (size(formData.confirm) < 6) {
      seterroConfirmPassword("You much enter a 6 character password");
      return false;
    }
    if (formData.password !== formData.confirm) {
      seterroConfirmPassword("")
      seterroPassword(
        "Password and the confirmation password are not the same "
      );
      seterroConfirmPassword(
        "Password and the confirmation password are not the same "
      );
      return false;
    }

    seterroConfirmPassword("")
    return true;
  }



  return (
    <View style={styles.form}>
       <Toast ref={toast} position = "top" opacity={1.5}/>
      <DropDownPicker              
        items={[
          {label: 'Select a type user', value: 'item0', hidden: true},
          {label: 'Customent', value: 'customent', Icon: ()=> <IconVector    name="flag" size={18} backgroundColor="#900"/>},
          {label: 'Property', value: 'property', Icon: ()=> <IconVector  name="account-check-outline" size={18} backgroundColor = "#900"/>}
        ]}
        containerStyle={{ height: 60, padding: 10, backgroundColor: "white" }}
        style={{ backgroundColor: "#fafafa", padding: 10 }}
        itemStyle={{
          justifyContent: "flex-start",
          padding: 10,
          backgroundColor: "white",
        }}
        dropDownStyle={{ backgroundColor: "white", marginLeft: 10 }}
        onChangeItem={(item) =>
          setTypeUser({value: item.value})
        }        
        defaultValue='item0'
      />
      <Input
        containerStyle={styles.input}
        placeholder="Enter your email..."
        onChange={(e) => onChange(e, "email")}
        keyboardType="email-address"
        errorMessage={erroEmail}
        defaultValue={formData.email}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Enter your password..."
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
        errorMessage={erroPassword}
        defaultValue={formData.password}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        containerStyle={styles.input}
        placeholder="Enter your confirm password..."
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "confirm")}
        errorMessage={erroConfirmPassword}
        defaultValue={formData.confirm}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <Button
        buttonStyle={styles.button}
        containerStyle={styles.btncontainer}
        title="Register new user"
        onPress={() => registerUserClick()}
      />

      <Loading isVisible={loadgin} text="Create Account...." />
    </View>
  );
}
const defaultFormDataValue = () => {
  return { email: "", password: "", confirm: "", typeUser: "" };
};

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  input: {
    width: "100%",
  },
  button: {
    backgroundColor: "#3c3c4c",
    borderRadius: 26,
  },
  btncontainer: {
    marginTop: 10,
    width: "95%",
    alignSelf: "center",
  },
  icon: {
    color: "#c1c1c1",
  },
  pickerStyle: {
    marginHorizontal: 20,
  },
  pickerWrapper: {
    borderWidth: 1,
    backgroundColor: "#c1c1c1",
    borderRadius: 2,
    marginLeft: 20,
    marginRight: 20,
  },
  pickerIcon: {
    color: "#3c3c4c",
    position: "absolute",
    bottom: 15,
    right: 10,
    fontSize: 20,
  },

  pickerContent: {
    color: "#3c3c4c",
    backgroundColor: "white",
    height: 150,
  },
});
