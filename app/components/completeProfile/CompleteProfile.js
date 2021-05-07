import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  AsyncStorage,
  NativeModules,
  Platform,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../style/colors";
import { FontFamily } from "../../style/typograpy";
import Button from "../../common/Button";
import { RadioButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import RegisterationModal from "../../common/RegisterationModal";
import AgeGroupModal from "../../common/ageGroupModal";
import InstructorTypeModal from "../../common/instructorTypeModal";
import InstructionTypeModal from "../../common/instructionTypeModal";
import * as ImagePicker from "react-native-image-picker";
import { CheckBox } from "react-native-elements";

import { fetchCategories } from "../../../services/FetchCategories";
import { fetchSubCategories } from "../../../services/FetchSubCategories";
import { fetchSkills } from "../../../services/FetchSkills";

// import {Checkbox} from '../../common/Checkbox';

import NetInfo from "@react-native-community/netinfo";
import * as coachRegister from "../../../services/registerCoach";
import { debug } from "react-native-reanimated";

const height = Dimensions.get("window").height;

function CompleteProfile({ navigation, route }) {
  const data = route.params;
  // console.log("data is", data);

  // const [checked, setChecked] = useState("baseBall");
  const [ageGroup, setAgeGroup] = useState("9");
  const [modalVisible, setModalVisible] = useState(false);

  const [ageModalVisible, setAgeModalVisible] = useState(false);

  const [age, setAge] = useState("");

  const [instructorModalVisible, setInstructorModalVisible] = useState(false);
  const [instructionModalVisible, setInstructionModalVisible] = useState(false);
  const [instructor, setInstructor] = useState("");
  const [instruction, setInstruction] = useState("");

  const [checkInstructorTypes, setCheckInstructorTypes] = useState(false);
  const [checkInstructionTypes, setCheckInstructionTypes] = useState(false);
  const [checkAgeGroup, setCheckAgeGroup] = useState(false);

  const [selectInstruction, setSelectInstruction] = useState({});
  const [selectInstructor, setSelectInstructor] = useState({});

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [coachSkills, setCoachSkills] = useState([]);

  const [dummy, setDummy] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  // const [subCategoriesLoading, setSubCategoriesLoading] = useState(true);
  const [skillsLoading, setSkillsLoading] = useState(true);

  useEffect(() => {
    // getCategories();
    // getSkills();
  }, []);

  const getCategories = async () => {
    setTimeout(() => {
      setCategoriesLoading(false);
    }, 1000);
    await fetchCategories(
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJuYW1lIjoiTXVoYW1tYWQgSmFsZWVsIEFzbGFtIiwiZW1haWwiOiJmYXplZWwuYnNzZTI4OTRAaWl1LmVkdS5wayIsInBob25lIjoiMDA5MjM0MjU0OTU3NDcifSwiaWF0IjoxNjE0MzM1ODUzLCJleHAiOjE3OTQzMzU4NTN9.I_Qf57UxPt7CZkzemkISFRz85NXfWULPOYeQEJFQz3c"
    )
      .then((response) => {
        setCategories(response.data.trainingCategory.rows);
      })
      .catch((err) => {
        console.log("error =", err.msg);
      });
    console.log("categories =", categories);
  };

  const getSubCategories = async (item) => {
    // setTimeout(() => {
    //   setSubCategoriesLoading(false);
    // }, 1000);
    await fetchSubCategories(
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJuYW1lIjoiTXVoYW1tYWQgSmFsZWVsIEFzbGFtIiwiZW1haWwiOiJmYXplZWwuYnNzZTI4OTRAaWl1LmVkdS5wayIsInBob25lIjoiMDA5MjM0MjU0OTU3NDcifSwiaWF0IjoxNjE0MzM1ODUzLCJleHAiOjE3OTQzMzU4NTN9.I_Qf57UxPt7CZkzemkISFRz85NXfWULPOYeQEJFQz3c",
      item.id
    )
      .then((response) => {
        setSubCategories(response.data.subCategories);
      })
      .catch((err) => {
        console.log("error =", err.msg);
      });
    console.log("subCategories =", subCategories);
  };

  const getSkills = async (item) => {
    setTimeout(() => {
      setSkillsLoading(false);
    }, 1000);
    await fetchSkills(
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJlbWFpbCI6ImZhemVlbC5ic3NlMjg5NEBpaXUuZWR1LnBrIiwicGhvbmUiOiIwMDkyMzQyNTQ5NTc0NyIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2MTk2ODM1MzUsImV4cCI6MTc5OTY4MzUzNX0.WUrphl2cLbMz7X8QJnFju12hPl_N8_tUtQlKcA5VDX8",
      item.id
    )
      .then((response) => {
        var skill = response.data.skills;
        console.log("skill level", skill);
        for (let index = 0; index < response.data.skills.length; index++) {
          skill[index].selected = false;
        }
        setCoachSkills(skill);
      })
      .catch((err) => {
        console.log("error =", err.msg);
      });
    console.log("skill level is =", skill);
  };

  const checkNetwork = async () => {
    console.log("internet called");
    try {
      let state = await NetInfo.fetch();
      if (state.isConnected == true) {
        // call your function here
        // checkValidations();
        getCoachDetails();
      } else {
        alert("Please check your internet connection and try again");
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const checkValidations = () => {
    if (instructor == "") {
      setCheckInstructorTypes(true);
    } else if (instruction == "") {
      setCheckInstructionTypes(true);
    } else if (age == "") {
      setCheckAgeGroup(true);
    } else {
      getCoachDetails();
    }
  };

  const getCoachDetails = async () => {
    var selectedSkill = [];
    for (let index = 0; index < coachSkills.length; index++) {
      if (coachSkills[index].selected == true) {
        selectedSkill.push(coachSkills[index]);
      }
    }
    // alert("bye");

    var trainingType = {
      TrainingTypeId: selectInstruction.id,

      SubCategoryIds: [
        {
          TrainingSubCategoryId: selectInstruction.id,
          SkillId: selectedSkill[0].id,
        },
      ],
    };

    let ageObject = [
      {
        ageGroup: age,
        skillLevel: selectedSkill[0].skill,
      },
    ];

    let userData = JSON.stringify({
      firstName: route.params.firstName,
      lastName: route.params.lastName,
      email: route.params.email,
      password: route.params.password,
      phone: route.params.phone,
      address: route.params.address,
      dob: route.params.dob,
      role: route.params.role,
      country: route.params.country,
      ageGroupCoach: ageObject,
      trainingType: trainingType,
    });
    console.log("userdata is", userData);

    try {
      let response = await coachRegister.coachRegisterService(userData);
      if (response.data.success != undefined && response.data.success == true) {
        console.log("response", response);
        navigation.navigate("EmailSent");
      } else {
        console.log("error in service");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const settingValue = (item) => {
    setSelectInstruction(item);
    getSkills(item);
  };
  const settingInstructor = (item) => {
    setSelectInstructor(item);
    getSubCategories(item);
  };

  const selectingSkills = (iteration) => {
    var skill = coachSkills;
    for (let index = 0; index < skill.length; index++) {
      skill[index].selected = false;
    }
    skill[iteration].selected = true;
    console.log("skill level is ", skill);
    setCoachSkills(skill);
    setDummy(!dummy);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={"transparent"}
      />
      <View style={styles.completeProfileContainer}>
        <View style={styles.backIconView}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Ionicons
              name="arrow-back"
              size={height > 667 ? 20 : 16}
              style={{ paddingLeft: 20, marginTop: 5 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>REGISTRATION</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: "10%" }}
        style={styles.bottom}
      >
        <View style={styles.profile}>
          <Image
            source={require("../../assets/avatar.png")}
            style={styles.avatar}
          />
          <View style={styles.icon}>
            <Ionicons
              name="add-outline"
              size={22}
              color="#fff"
              style={{ textAlign: "center", marginLeft: height > 667 ? 2 : 1 }}
            />
          </View>
        </View>
        <Text style={styles.text}>Instructor Type</Text>
        <View style={styles.outerView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => {
              setInstructorModalVisible(true);
              setCategoriesLoading(true);
              getCategories();
            }}
          >
            {selectInstructor != undefined &&
            Object.keys(selectInstructor).length > 0 ? (
              // setCheckInstructorTypes(false)
              <Text style={styles.innertext}>{selectInstructor.title}</Text>
            ) : (
              <Text style={styles.innertext}>Select</Text>
            )}
            <Image
              source={require("../../assets/drop-down.png")}
              style={styles.dropImage}
            />
          </TouchableOpacity>
        </View>
        {checkInstructorTypes == true && (
          <Text style={styles.errorStyle}>Instructor Type cannot be empty</Text>
        )}
        <Text style={styles.text}>Instruction Types</Text>

        <View style={styles.outerView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => {
              setInstructionModalVisible(true);
              // setSubCategoriesLoading(true);
            }}
          >
            {selectInstruction.title != undefined &&
            Object.keys(selectInstruction).length > 0 ? (
              <Text style={styles.innertext}>{selectInstruction.title}</Text>
            ) : (
              <Text style={styles.innertext}>Select</Text>
            )}
            <Image
              source={require("../../assets/drop-down.png")}
              style={styles.dropImage}
            />
          </TouchableOpacity>
        </View>
        {checkInstructionTypes == true && (
          <Text style={styles.errorStyle}>
            Instruction Type cannot be empty
          </Text>
        )}
        <Text style={[styles.text, { marginTop: 5 }]}>Skill Level</Text>

        <FlatList
          data={coachSkills}
          // showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.outerView}>
                <View style={[styles.innerView1]}>
                  {/* <RadioButton
                    size={20}
                    color={Colors.blackColor}
                    uncheckedColor={Colors.blackColor}
                    value={item.selected}
                    // status={item.selected == true ? "checked" : "unchecked"}
                    onPress={() => {
                      // item.skill ? "checked" : "unchecked";
                      selectingSkills(index);
                    }}
                  /> */}

                  {/* <CheckBox
                    // center
                    // title="Click Here"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={item.selected}
                    onPress={() => selectingSkills(index)}
                  /> */}

                  <TouchableOpacity
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: "grey",
                      marginHorizontal: 10,
                      backgroundColor: item.selected == true ? "red" : "white",
                    }}
                    onPress={() => selectingSkills(index)}
                  ></TouchableOpacity>

                  <Text style={styles.innertext}>{item.skill}</Text>
                </View>
              </View>
            );
          }}
        />

        {/* <View style={styles.outerView}>
          <View style={[styles.innerView1]}>
            <RadioButton
              size={20}
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value={coachSkills}
              status={coachSkills.skill === "Expert" ? "checked" : "unchecked"}
              // onPress={() => setCoachSkills("Expert")}
              onPress={() => setRadioButtonValue()}
            />
            <Text style={styles.innertext}>Expert</Text>
          </View>
          <View style={[styles.innerView1]}>
            <RadioButton
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value={coachSkills}
              status={coachSkills.skill === "Mediaker" ? "checked" : "unchecked"}
              onPress={() => setCoachSkills("Mediaker")}
            />
            <Text style={styles.innertext}>Mediaker</Text>
          </View>
          <View style={[styles.innerView1]}>
            <RadioButton
              color={Colors.blackColor}
              uncheckedColor={"#000"}
              value="collegiate"
              status={coachSkills === "collegiate" ? "checked" : "unchecked"}
              onPress={() => setCoachSkills("collegiate")}
            />
            <Text style={styles.innertext}>Collegiate</Text>
          </View>
        </View> */}
        {/* <View style={[styles.outerView1]}>
          <View style={[styles.innerView1]}>
            <RadioButton
              size={20}
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value="division"
              status={coachSkills === "division" ? "checked" : "unchecked"}
              onPress={() => setCoachSkills("division")}
            />
            <Text style={styles.innertext}>Division-1</Text>
          </View>
          <View style={styles.innerView1}>
            <RadioButton
              size={20}
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value="professional"
              status={coachSkills === "professional" ? "checked" : "unchecked"}
              onPress={() => setCoachSkills("professional")}
            />
            <Text style={styles.innertext}>Professional</Text>
          </View>
        </View> */}

        <Text style={styles.text}>Age Group Qualified to Coach</Text>
        <View style={styles.outerView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => setAgeModalVisible(true)}
          >
            {age == "" ? (
              <Text style={styles.innertext}>Select</Text>
            ) : (
              <Text style={styles.innertext}>{age}</Text>
            )}
            <Image
              source={require("../../assets/drop-down.png")}
              style={styles.dropImage}
            />
          </TouchableOpacity>
        </View>
        {checkAgeGroup == true && (
          <Text style={styles.errorStyle}>Age group cannot be empty</Text>
        )}
        <Button
          text={"Register"}
          onPress={() => {
            // setModalVisible(!modalVisible);
            checkNetwork();
          }}
        />
        <View style={{ marhinBottom: 20 }}></View>
      </ScrollView>

      <AgeGroupModal
        modalVisible={ageModalVisible}
        setModalVisible={setAgeModalVisible}
        setAge={setAge}
        // setGroupAge={categories}
        // selectInstruction={settingValue}
      />
      <RegisterationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
      <InstructorTypeModal
        modalVisible={instructorModalVisible}
        setModalVisible={setInstructorModalVisible}
        setInstructorType={categories}
        selectedItem={settingInstructor}
        isLoaderActive={categoriesLoading}
      />
      <InstructionTypeModal
        modalVisible={instructionModalVisible}
        setModalVisible={setInstructionModalVisible}
        setInstructionType={subCategories}
        selectInstruction={settingValue}
        // isLoaderActive={subCategoriesLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  completeProfileContainer: {
    height: "7%",
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  backIconView: {
    width: "15%",
    // justifyContent: 'center',
  },
  titleView: {
    width: "85%",
    // justifyContent: 'center',
  },
  titleText: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 13,
  },
  bottom: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    // marginTop: '30%',
    paddingHorizontal: 20,
  },
  profile: {
    height: height > 667 ? 120 : 100,
    width: height > 667 ? 120 : 100,
    borderRadius: height > 667 ? 60 : 50,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    alignSelf: "center",
    marginVertical: 20,
  },
  avatar: {
    height: 30,
    width: 30,
  },
  avatar1: {
    height: 12,
    width: 12,
  },
  icon: {
    height: height > 667 ? 25 : 20,
    width: height > 667 ? 25 : 20,
    borderRadius: height > 667 ? 12.5 : 10,
    backgroundColor: "red",
    position: "absolute",
    alignSelf: "flex-end",
    left: height > 667 ? 95 : 75,
    top: height > 667 ? 80 : 70,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    color: Colors.textColor,
    fontFamily: FontFamily.helveticaLight,
  },
  outerView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  outerView1: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 15,
  },
  innerView: {
    height: 40,
    width: "48%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.textColor,
    alignItems: "center",
    flexDirection: "row",
  },
  innertext: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 12 : 9,
    // paddingRight: 25,
  },

  innerView1: {
    height: 40,
    // width: '33%',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: "3%",
    borderColor: Colors.textColor,
    // borderColor: 'red',
    paddingRight: 10,
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: 'red',
  },
  dropDown: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 10,
    // marginTop: 10,\
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  dropImage: {
    height: 14,
    width: 14,
  },
  errorStyle: {
    fontSize: 12,
    color: "red",
    paddingLeft: 0,
  },
});

export default CompleteProfile;
