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
import {Switch} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const height = Dimensions.get('window').height;
const NotificatinsSettings = props => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isSwitchOn1, setIsSwitchOn1] = React.useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);
  const onToggleSwitch2 = () => setIsSwitchOn2(!isSwitchOn2);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.titleContainer}>
        <View style={styles.backIconView}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Settings')}>
            <Ionicons
              name="arrow-back"
              size={height > 667 ? 20 : 16}
              style={{paddingLeft: 20, marginTop: 3}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>NOTIFICATION SETTINGS</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.inner}>
          <View>
            <Text style={styles.text}>App Notifications</Text>
            <Text style={styles.text1}>Play sound for in-app update</Text>
          </View>
          <Switch
            style={{
              transform: [
                {scaleX: height > 667 ? 1 : 0.7},
                {scaleY: height > 667 ? 1 : 0.7},
              ],
            }}
            trackColor={{true: Colors.buttonColor, false: 'grey'}}
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color={Colors.buttonColor}
          />
        </View>
        <View style={styles.inner}>
          <View>
            <Text style={styles.text}>Push Notifications</Text>
          </View>
          <Switch
            style={{
              transform: [
                {scaleX: height > 667 ? 1 : 0.7},
                {scaleY: height > 667 ? 1 : 0.7},
              ],
            }}
            trackColor={{true: Colors.buttonColor, false: 'grey'}}
            value={isSwitchOn1}
            onValueChange={onToggleSwitch1}
            color={Colors.buttonColor}
          />
        </View>
        <View style={styles.inner}>
          <View>
            <Text style={styles.text}>Vibration</Text>
            <Text style={styles.text1}>On</Text>
          </View>
          <Switch
            style={{
              transform: [
                {scaleX: height > 667 ? 1 : 0.7},
                {scaleY: height > 667 ? 1 : 0.7},
              ],
            }}
            trackColor={{true: Colors.buttonColor, false: 'grey'}}
            value={isSwitchOn2}
            onValueChange={onToggleSwitch2}
            color={Colors.buttonColor}
          />
        </View>
        <View style={styles.inner}>
          <View>
            <Text style={styles.text}>Notifications sound</Text>
            <Text style={styles.text1}>Default [IOS]</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom: {
    height: '90%',
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    // marginTop: '22%',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 14 : 12,
  },
  text1: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: height > 667 ? 12 : 10,
  },
  inner: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    height: '7%',
    marginTop: height > 667 ? '10%' : '7%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  backIconView: {
    width: '15%',
    justifyContent: 'center',
  },
  titleView: {
    width: '85%',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 13,
  },
});

export default NotificatinsSettings;
