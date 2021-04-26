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
import Ionicons from 'react-native-vector-icons/Ionicons';

const height = Dimensions.get('window').height;
const BookingCard = props => {
  const [active, setActive] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Image
            source={require('../../assets/splash.jpg')}
            style={styles.image}
          />
          <View>
            <Text style={styles.text}>Porter Shue</Text>
            <Text style={styles.text1}>Started March 7</Text>
          </View>
        </View>
        <View style={styles.act}>
          {props.active ? (
            <Text style={styles.smallText}>Active</Text>
          ) : (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('BookingApproved');
              }}>
              <Text style={styles.smallText}>Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.bar}></View>
      <View style={styles.bottom}>
        <Text style={styles.text2}>Softball Coaching</Text>
        <TouchableOpacity
          style={{alignItems: 'center', flexDirection: 'row'}}
          onPress={() => {
            props.navigation.navigate('Bookingdetails');
          }}>
          <Text style={[styles.text2, {color: 'red'}]}>View</Text>
          <Ionicons
            name="arrow-forward"
            size={height > 667 ? 20 : 16}
            color={'red'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //   height:90,
    borderWidth: 1,
    borderColor: Colors.backgroundColor,
    borderRadius: 10,
    marginTop: 15,
    padding: 5,
  },
  text: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 14 : 13,
  },
  text1: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 12 : 10,
    color: Colors.textColor,
    // marginTop: 5,
  },
  text2: {
    fontFamily: FontFamily.helvetica,
    fontSize: height > 667 ? 14 : 12,
    color: Colors.textColor,
  },
  image: {
    height: height > 667 ? 45 : 35,
    width: height > 667 ? 45 : 35,
    borderRadius: height > 667 ? 45 : 35,
    marginRight: 10,
  },
  image1: {
    height: 18,
    width: 18,
    marginLeft: 5,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  act: {
    height: height > 667 ? 23 : 20,
    borderRadius: 25,
    width: '18%',
    backgroundColor: '#90ee90',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height > 667 ? -7 : -4,
  },
  acyText: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: height > 667 ? 9 : 7,
  },
  outer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bar: {
    height: 2,
    backgroundColor: Colors.backgroundColor,
    marginTop: 5,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  smallText: {
    fontSize: height > 667 ? 12 : 10,
  },
});

export default BookingCard;
