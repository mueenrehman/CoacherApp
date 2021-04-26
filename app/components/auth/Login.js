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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Colors} from '../../style/colors';
import {Container, Header, Content, Tab, Tabs} from 'native-base';
import Input from '../../common/Input';
import {FontFamily} from '../../style/typograpy';
import Button from '../../common/Button';
import {useKeyboard} from './../index';

import {TextInputMask} from 'react-native-masked-text';

import NetInfo from '@react-native-community/netinfo';
import {coachRegister} from '../../../services/registerCoach';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
var keyheight = '';

const SplashScreen = props => {
  const [state, setState] = useState({
    email: '',
  });

  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');

  const [checkFirst_name, setCheckFirstname] = useState(false);
  const [checkLast_name, setCheckLastname] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  const [checkAddress, setCheckAddress] = useState(false);
  const [checkDob, setCheckDob] = useState(false);
  const [checkCountry, setCheckCountry] = useState(false);
  const [checkRole, setCheckRole] = useState(false);

  _onHandleChange = (name, value) => {
    if (name == 'first_name') {
      setCheckFirstname(false);
      setFirstname(value);
    } else if (name == 'last_name') {
      setCheckLastname(false);
      setLastname(value);
    } else if (name == 'email') {
      setCheckEmail(false);
      setState({
        email: value,
      });
    } else if (name == 'password') {
      setCheckPassword(false);
      setPassword(value);
    }
    // else if (name == 'confirmPassword') {
    //   setCheckConfirmPassword(false);
    //   setConfirmPassword(value);
    // }
    else if (name == 'phone') {
      setCheckPhone(false);
      setPhone(value);
    } else if (name == 'address') {
      setCheckAddress(false);
      setAddress(value);
    } else if (name == 'dob') {
      setCheckDob(false);
      setDob(value);
    } else if (name == 'country') {
      setCheckCountry(false);
      setCountry(value);
    } else if (name == 'role') {
      setCheckRole(false);
      setRole(value);
    }
  };

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

    if (first_name == '') {
      // validation = false;
      setCheckFirstname(true);
    } else if (last_name == '') {
      // validation = false;
      setCheckLastname(true);
    } else if (state.email == '') {
      // validation = false;
      setCheckEmail(true);
    } else if (password == '') {
      // validation = false;
      setCheckPassword(true);
    }
    // else if (confirmPassword == '') {
    //   // validation = false;
    //   setCheckConfirmPassword(true);
    // }
    else if (phone == '') {
      // validation = false;
      setCheckPhone(true);
    } else if (address == '') {
      // validation = false;
      setCheckAddress(true);
    } else if (country == '') {
      // validation = false;
      setCheckCountry(true);
    } else if (dob == '') {
      // validation = false;
      setCheckDob(true);
    } else if (role == '') {
      // validation = false;
      setCheckRole(true);
    } else if (String(first_name).length <= 2) {
      // validation = false;
      alert('firstname must be atleast 3 characters');
    } else if (String(last_name).length <= 2) {
      // validation = false;
      alert('lastname must be atleast 3 characters');
    } else if (!validateEmail()) {
      // validation = false;
      alert('Please enter a proper email');
    } else if (String(password).length <= 7) {
      // validation = false;
      alert('Password must be between 8 to 16 characters');
    } else if (String(phone).length <= 10) {
      // validation = false;
      alert('Phone number must be 11 digits');
    } else if (String(address).length <= 5) {
      // validation = false;
      alert('Address must be atleast 6 characters');
    } else {
      // getCoachDetails();
      navigateToNextScreen();
    }
  };

  const validateEmail = () => {
    let email = state.email;
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  };

  const navigateToNextScreen = () => {
    let data = {
      firstName: first_name,
      lastName: last_name,
      email: state.email,
      password: password,
      phone: phone,
      address: address,
      dob: dob,
      country: country,
      role: role,
    };
    props.navigation.navigate('CompleteProfile', data);
  };

  // const getCoachDetails = async () => {
  //   console.log('first name is', first_name);
  //   let data = {
  //     firstName: first_name,
  //     lastName: last_name,
  //     email: state.email,
  //     password: password,
  //     phone: phone,
  //     address: address,
  //     dob: dob,
  //     country: country,
  //     role: role,
  //   };

  //   console.log('data =', data);
  //   let response;
  //   await coachRegister(data)
  //     .then(response => {
  //       // if (response == 200) {
  //       //   alert('Success', response);
  //       //   props.navigation.navigate('CompleteProfile');
  //       // }
  //       console.log('response', response);
  //     })
  //     .catch(err => {
  //       // alert('this is error', err);
  //       console.log('error', err);
  //     });
  //   console.log('response =', response);

  //   // try {
  //   //   let response = await coachRegister(data);
  //   //   if (response == 200) {
  //   //     props.navigation.navigate('LoginScreen');
  //   //   }
  //   // } catch (error) {
  //   //   alert('this is error', error);
  //   //   console.log('error', error);
  //   // }
  // };

  //   if (response == 200) {
  //     alert('Success', response);
  //     props.navigation.navigate('CompleteProfile');
  //   }
  // } catch (error) {
  //   alert('this is error', error);
  //   console.log('error', error.msg);
  // }

  const didShow = height => {
    // console.log('Keyboard show. Height is ' + height);
    setViewHeight(screenHeight - height);
  };

  const didHide = () => {
    console.log('Keyboard hide');
    setViewHeight(screenHeight);
  };
  const [keyboardHeigth] = useKeyboard(
    didShow,
    didHide,
  ); /* initialize the hook (optional parameters) */

  const [viewHeight, setViewHeight] = useState(
    screenHeight,
  ); /* for example with didShow and didHide */

  useEffect(() => {
    console.log(keyboardHeigth);
    keyheight = keyboardHeigth;
  }, [keyboardHeigth]);

  return (
    // <KeyboardAvoidingView
    //   style={{flex: 1}}§
    //   behavior="padding"
    //   keyboardVerticalOffset={screenHeight > 667 ? -100 : 0}>
    /* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <Image
        source={require('../../assets/coacherlogo.png')}
        style={[
          styles.logo,
          {
            marginTop:
              keyboardHeigth != 0
                ? screenHeight > 667
                  ? '-20%'
                  : '-30%'
                : screenHeight > 667
                ? '20%'
                : '15%',
          },
        ]}
      />

      <View style={styles.bottom}>
        <Tabs
          tabBarUnderlineStyle={[styles.tabUnderline]}
          tabContainerStyle={{
            elevation: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 70,
            borderWidth: 0,
            borderBottomColor: 'white',
          }}>
          <Tab
            heading="Login"
            tabStyle={[
              styles.tab,
              {
                borderTopLeftRadius: 30,
              },
            ]}
            activeTabStyle={[styles.activeTab, {borderTopLeftRadius: 30}]}
            textStyle={styles.tabText}
            activeTextStyle={styles.activeTabText}>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View style={{height: 380}}>
              <Input text={'Email-Address'} />
              <Input secureTextEntry={true} text={'Password'} />
              <View style={{paddingHorizontal: 20}}>
                <Button
                  text={'Login'}
                  onPress={() => {
                    props.navigation.navigate('TabContainer');
                  }}
                />
              </View>
            </View>
            {/* </ScrollView> */}
          </Tab>
          <Tab
            heading="Register"
            tabStyle={[styles.tab, {borderTopRightRadius: 30}]}
            activeTabStyle={[styles.activeTab, {borderTopRightRadius: 30}]}
            textStyle={styles.tabText}
            activeTextStyle={styles.activeTabText}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: screenHeight > 667 ? '190%' : '15%',
              }}
              showsVerticalScrollIndicator={false}>
              <View style={{height: 610}}>
                <Input
                  text={'First Name'}
                  value={first_name}
                  onChangeText={value => {
                    _onHandleChange('first_name', value);
                    setCheckFirstname(false);
                  }}
                />
                {checkFirst_name == true && (
                  <Text style={styles.errorStyle}>
                    First Name cannot be empty
                  </Text>
                )}
                <Input
                  text={'Last Name'}
                  value={last_name}
                  onChangeText={value => {
                    _onHandleChange('last_name', value);
                    setCheckLastname(false);
                  }}
                />
                {checkLast_name == true && (
                  <Text style={styles.errorStyle}>
                    Last Name cannot be empty
                  </Text>
                )}
                <Input
                  text={'Email-Address'}
                  value={state.email}
                  onChangeText={value => {
                    _onHandleChange('email', value);
                    setCheckEmail(false);
                  }}
                />
                {checkEmail == true && (
                  <Text style={styles.errorStyle}>Email cannot be empty</Text>
                )}
                <Input
                  secureTextEntry={true}
                  text={'Password'}
                  value={password}
                  onChangeText={value => {
                    _onHandleChange('password', value);
                    setCheckPassword(false);
                  }}
                />
                {checkPassword == true && (
                  <Text style={styles.errorStyle}>
                    Password cannot be empty
                  </Text>
                )}
                <Input
                  text={'Phone No.'}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={value => {
                    _onHandleChange('phone', value);
                    setCheckPhone(false);
                  }}
                />
                {checkPhone == true && (
                  <Text style={styles.errorStyle}>
                    Phone no. cannot be empty
                  </Text>
                )}
                <Input
                  text={'Address'}
                  value={address}
                  onChangeText={value => {
                    _onHandleChange('address', value);
                    setCheckAddress(false);
                  }}
                />
                {checkAddress == true && (
                  <Text style={styles.errorStyle}>Address cannot be empty</Text>
                )}

                <Input
                  text={'Country'}
                  value={country}
                  onChangeText={value => {
                    _onHandleChange('country', value);
                    setCheckCountry(false);
                  }}
                />
                {checkCountry == true && (
                  <Text style={styles.errorStyle}>Country cannot be empty</Text>
                )}
                <View style={styles.dateTimeContainer}>
                  <Text style={styles.dateTimeText}>Date of Birth</Text>
                  <TextInputMask
                    placeholder="DD/MM/YYYY"
                    type={'datetime'}
                    style={styles.dateTimeStyle}
                    options={{
                      format: 'DD/MM/YYYY',
                    }}
                    value={dob}
                    onChangeText={value => {
                      _onHandleChange('dob', value);
                    }}
                  />
                </View>
                {checkDob == true && (
                  <Text style={styles.errorStyle}>
                    Date of birth cannot be empty
                  </Text>
                )}
                <Input
                  text={'Role'}
                  value={role}
                  onChangeText={value => {
                    _onHandleChange('role', value);
                    setCheckRole(false);
                  }}
                />
                {checkRole == true && (
                  <Text style={styles.errorStyle}>Role cannot be empty</Text>
                )}

                <View style={{paddingHorizontal: 20}}>
                  <Button
                    text={'Next'}
                    onPress={() => props.navigation.navigate('CompleteProfile')}
                    // onPress={() => checkNetwork()}
                  />
                </View>
                <Text style={[styles.text, {textAlign: 'center'}]}>
                  By signing up, you agree to ECHO's Terms of Use & Privacy
                  Policy
                </Text>
                <View style={{marginBottom: 150}}></View>
              </View>
            </ScrollView>
          </Tab>
        </Tabs>
      </View>
    </View>
    /* </TouchableWithoutFeedback> */
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  tab: {
    backgroundColor: Colors.whiteColor,
    // paddingTop:20
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textColor,
    fontFamily: FontFamily.helveticaBold,
  },
  tabUnderline: {
    borderBottomColor: Platform.OS == 'android' ? '#030E2D' : '#fff',
    borderBottomWidth: 2,
  },
  activeTabText: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    fontFamily: FontFamily.helveticaBold,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: '23%',
    marginBottom: '10%',
  },
  text: {
    fontSize: 11,
    color: Colors.blackColor,
    fontFamily: FontFamily.helveticaBold,
    marginHorizontal: 25,
    marginTop: 10,
  },
  bottom: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  errorStyle: {
    fontSize: 12,
    color: 'red',
    paddingLeft: 20,
  },
  dateTimeContainer: {
    paddingHorizontal: 20,
    marginTop: 17,
  },
  dateTimeStyle: {
    height: screenHeight > 667 ? 50 : 40,
    borderWidth: 1,
    borderColor: '#e0dede',
    borderRadius: 10,
    backgroundColor: Colors.whiteColor,
    color: Colors.blackColor,
    paddingLeft: 10,
    fontFamily: FontFamily.helveticaBold,
    fontSize: 13,
  },
  dateTimeText: {
    fontFamily: FontFamily.helveticaLight,
    color: Colors.textColor,
    fontSize: 13,
    marginBottom: 12,
  },
});

export default SplashScreen;