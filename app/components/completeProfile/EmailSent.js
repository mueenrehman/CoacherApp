import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Input from "../../common/Input";
import { FontFamily } from "../../style/typograpy";
import verifyAccount from "../../../services/VerifyEmail";
import { Colors } from "../../style/colors";
import NetInfo from "@react-native-community/netinfo";

const EmailSent = (props) => {
  const [code, setCode] = useState("");
  const [checkCode, setCheckCode] = useState("");

  _onHandleChange = (name, value) => {
    if (name == "code") {
      setCheckCode(false);
      setCode(value);
    }
  };

  const checkNetwork = async () => {
    try {
      let state = await NetInfo.fetch();
      if (state.isConnected == true) {
        checkValidations();
      } else {
        alert("Please check your internet connection and try again");
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const checkValidations = () => {
    if (code == "") {
      setCheckCode(true);
    } else if (String(code).length <= 3) {
      alert("Code must be 4 characters");
    } else {
      enterCode();
    }
  };

  const enterCode = async () => {
    let verificationCode = JSON.stringify({
      otp: code,
    });
    console.log("userdata is", verificationCode);

    try {
      let response = await verifyAccount(verificationCode);
      if (response.data != undefined && response.data.otp != "") {
        console.log("response", response);
        props.navigation.navigate("Login");
      } else {
        console.log("error in service");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ paddingBottom: "20%" }}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/coacherlogo.png")}
            style={styles.logo}
          />
          <Text style={{ textAlign: "center" }}>
            Please enter the code sent to your email address to Verfiy your
            Account.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            text={"Enter your code here"}
            value={code}
            onChangeText={(value) => {
              _onHandleChange("code", value);
              setCheckCode(false);
            }}
          />
          {checkCode == true && (
            <Text style={styles.errorStyle}>Code cannot be empty</Text>
          )}

          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => checkNetwork()}
          >
            <Text style={styles.btnText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.backgroundColor,
    height: "100%",
  },
  logoContainer: {
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: "10%",
  },
  inputContainer: {
    height: "60%",
    justifyContent: "space-around",
  },
  btnStyle: {
    backgroundColor: Colors.buttonColor,
    width: "80%",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontFamily: FontFamily.helveticaBold,
  },
});
export default EmailSent;
