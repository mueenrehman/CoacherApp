import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {Colors} from '../../style/colors';
import {FontFamily} from '../../style/typograpy';
import Button from '../../common/Button';
import {RadioButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RegisterationModal from '../../common/RegisterationModal';
import AgeGroupModal from '../../common/ageGroupModal';
import InstructorTypeModal from '../../common/instructorTypeModal';
import InstructionTypeModal from '../../common/instructionTypeModal';
import * as ImagePicker from 'react-native-image-picker';
// import {Checkbox} from '../../common/Checkbox';

import NetInfo from '@react-native-community/netinfo';
import {coachRegister} from '../../../services/registerCoach';
import {debug} from 'react-native-reanimated';

const height = Dimensions.get('window').height;

function CompleteProfile({navigation, route}) {
  const data = route.params;
  console.log('data is', data);

  const [checked, setChecked] = useState('baseBall');
  const [skillLevel, setSkillLevel] = useState('recreational');
  const [ageGroup, setAgeGroup] = useState('9');
  const [modalVisible, setModalVisible] = useState(false);
  const [ageModalVisible, setAgeModalVisible] = useState(false);
  const [age, setAge] = useState('');
  const [instructorModalVisible, setInstructorModalVisible] = useState(false);
  const [instructionModalVisible, setInstructionModalVisible] = useState(false);
  const [instructor, setInstructor] = useState('');
  const [instruction, setInstruction] = useState('');

  const [checkInstructionTypes, setCheckInstructionTypes] = useState(false);
  const [checkAgeGroup, setCheckAgeGroup] = useState(false);

  const [state, setState] = useState({
    resourcePath: {},
  });

  console.log('age is', age);
  console.log('instruction is', instruction);

  const checkNetwork = async () => {
    try {
      let state = await NetInfo.fetch();
      if (state.isConnected == true) {
        // call your function here
        checkValidations();
        // getCoachDetails();
      } else {
        alert('Please check your internet connection and try again');
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const checkValidations = () => {
    // let validation = true;

    if (instruction == '') {
      // validation = false;
      setCheckInstructionTypes(true);
    } else if (age == '') {
      // validation = false;
      setCheckAgeGroup(true);
    } else {
      getCoachDetails();
    }
  };

  const getCoachDetails = async () => {
    console.log('instructions are here', instruction);
    let userData = {
      firstName: route.params.first_name,
      lastName: route.params.last_name,
      email: route.params.email,
      password: route.params.password,
      phone: route.params.phone,
      address: route.params.address,
      dob: route.params.dob,
      role: route.params.role,
      country: route.params.country,
      ageGroupCoach: age,
      trainingType: instruction,
    };

    // setModalVisible(!modalVisible);

    console.log('user data =', userData);

    // let response = '';
    await coachRegister(userData)
      .then(response => {
        console.log('response', response);
        setModalVisible(!modalVisible);
      })
      .catch(err => {
        console.log('error', err);
      });
    // console.log('response =', response);
  };

  // let response;
  // await coachRegister(data)
  //   .then(response => {
  //     // if (response == 200) {
  //     //   alert('Success', response);
  //     //   props.navigation.navigate('CompleteProfile');
  //     // }
  //     console.log('response', response);
  //   })
  //   .catch(err => {
  //     // alert('this is error', err);
  //     console.log('error', err);
  //   });
  // console.log('response =', response);

  // try {
  //   let response = await coachRegister(userData);
  //   debugger;
  //   console.log('response is this :', response);

  //   if (response == 200) {
  //     setModalVisible(!modalVisible);
  //     // props.navigation.navigate('LoginScreen');
  //   }
  // } catch (error) {
  //   alert('this is error', error.msg);
  //   console.log('error', error);
  // }

  // const [filePath, setFilePath] = useState({});

  // const chooseFile = () => {
  //   let options = {
  //     title: 'Select Image',
  //     customButtons: [
  //       {
  //         name: 'customOptionKey',
  //         title: 'Choose Photo from Custom Option',
  //       },
  //     ],
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchImageLibrary(options, response => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       let source = response;
  //       setFilePath(source);
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.completeProfileContainer}>
        <View style={styles.backIconView}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Ionicons
              name="arrow-back"
              size={height > 667 ? 20 : 16}
              style={{paddingLeft: 20, marginTop: 5}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>REGISTRATION</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{paddingBottom: '10%'}}
        style={styles.bottom}>
        <View style={styles.profile}>
          <Image
            source={require('../../assets/avatar.png')}
            style={styles.avatar}
          />
          <View style={styles.icon}>
            <Ionicons
              name="add-outline"
              size={22}
              color="#fff"
              style={{textAlign: 'center', marginLeft: height > 667 ? 2 : 1}}
            />
          </View>
        </View>
        <Text style={styles.text}>Instructor Type</Text>
        <View style={styles.outerView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => setInstructorModalVisible(true)}>
            {instructor == '' ? (
              <Text style={styles.innertext}>Select</Text>
            ) : (
              <Text style={styles.innertext}>{instructor}</Text>
            )}
            <Image
              source={require('../../assets/drop-down.png')}
              style={styles.dropImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.text, {marginTop: 5}]}>Skill Level</Text>
        <View style={styles.outerView}>
          <View style={[styles.innerView1]}>
            <RadioButton
              size={20}
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value="recreational"
              status={skillLevel === 'recreational' ? 'checked' : 'unchecked'}
              onPress={() => setSkillLevel('recreational')}
            />
            <Text style={styles.innertext}>Recreational</Text>
          </View>
          <View style={[styles.innerView1]}>
            <RadioButton
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value="travel"
              status={skillLevel === 'travel' ? 'checked' : 'unchecked'}
              onPress={() => setSkillLevel('travel')}
            />
            <Text style={styles.innertext}>Travel</Text>
          </View>
          <View style={[styles.innerView1]}>
            <RadioButton
              color={Colors.blackColor}
              uncheckedColor={'#000'}
              value="collegiate"
              status={skillLevel === 'collegiate' ? 'checked' : 'unchecked'}
              onPress={() => setSkillLevel('collegiate')}
            />
            <Text style={styles.innertext}>Collegiate</Text>
          </View>
        </View>
        <View style={[styles.outerView1]}>
          <View style={[styles.innerView1]}>
            <RadioButton
              size={20}
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value="division"
              status={skillLevel === 'division' ? 'checked' : 'unchecked'}
              onPress={() => setSkillLevel('division')}
            />
            <Text style={styles.innertext}>Division-1</Text>
          </View>
          <View style={styles.innerView1}>
            <RadioButton
              size={20}
              color={Colors.blackColor}
              uncheckedColor={Colors.blackColor}
              value="professional"
              status={skillLevel === 'professional' ? 'checked' : 'unchecked'}
              onPress={() => setSkillLevel('professional')}
            />
            <Text style={styles.innertext}>Professional</Text>
          </View>
        </View>
        <Text style={styles.text}>Instruction Types</Text>
        <View style={styles.outerView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => setInstructionModalVisible(true)}>
            {instruction == '' ? (
              <Text style={styles.innertext}>Select</Text>
            ) : (
              <Text style={styles.innertext}>{instruction}</Text>
            )}
            <Image
              source={require('../../assets/drop-down.png')}
              style={styles.dropImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Age Group Qualified to Coach</Text>
        <View style={styles.outerView}>
          <TouchableOpacity
            style={styles.dropDown}
            onPress={() => setAgeModalVisible(true)}>
            {age == '' ? (
              <Text style={styles.innertext}>Select</Text>
            ) : (
              <Text style={styles.innertext}>{age}</Text>
            )}
            <Image
              source={require('../../assets/drop-down.png')}
              style={styles.dropImage}
            />
          </TouchableOpacity>
        </View>

        <Button
          text={'Register'}
          onPress={() => {
            setModalVisible(!modalVisible);
            // checkNetwork();
          }}
        />
        <View style={{marhinBottom: 20}}></View>
      </ScrollView>

      <AgeGroupModal
        modalVisible={ageModalVisible}
        setModalVisible={setAgeModalVisible}
        setAge={setAge}
      />
      <RegisterationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
      <InstructorTypeModal
        modalVisible={instructorModalVisible}
        setModalVisible={setInstructorModalVisible}
        setInstructorType={setInstructor}
      />
      <InstructionTypeModal
        modalVisible={instructionModalVisible}
        setModalVisible={setInstructionModalVisible}
        setInstructionType={setInstruction}
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
    height: '7%',
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIconView: {
    width: '15%',
    // justifyContent: 'center',
  },
  titleView: {
    width: '85%',
    // justifyContent: 'center',
  },
  titleText: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 13,
  },
  bottom: {
    height: '100%',
    width: '100%',
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
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor,
    alignSelf: 'center',
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
    backgroundColor: 'red',
    position: 'absolute',
    alignSelf: 'flex-end',
    left: height > 667 ? 95 : 75,
    top: height > 667 ? 80 : 70,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    color: Colors.textColor,
    fontFamily: FontFamily.helveticaLight,
  },
  outerView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  outerView1: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 15,
  },
  innerView: {
    height: 40,
    width: '48%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.textColor,
    alignItems: 'center',
    flexDirection: 'row',
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
    marginRight: '3%',
    borderColor: Colors.textColor,
    // borderColor: 'red',
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  dropDown: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.textColor,
    borderRadius: 10,
    // marginTop: 10,\
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  dropImage: {
    height: 14,
    width: 14,
  },
});

export default CompleteProfile;
