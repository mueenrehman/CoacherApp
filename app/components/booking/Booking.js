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
  FlatList,
} from 'react-native';
import {Colors} from '../../style/colors';
import {FontFamily} from '../../style/typograpy';
import BookingCard from './BookingCard';
import NotificationCard from '../notifications/NotificationsCard';

const height = Dimensions.get('window').height;
const BookingScreen = props => {
  // useEffect(() => {
  //   setModalVisible(true);
  // }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState(true);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        <Text style={styles.text}>COACHER</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('AccountSettings');
            }}>
            <Image
              source={require('../../assets/splash.jpg')}
              style={styles.image1}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <NotificationCard item={item} navigation={props.navigation} /> */}
      <View style={styles.bottom}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 5,
            justifyContent: 'space-between',
            height: 50,
            width: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setActive(true);
            }}>
            <Text
              style={[
                styles.text1,
                {color: !active ? Colors.textColor : Colors.blackColor},
              ]}>
              Active Bookings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActive(false);
            }}>
            <Text
              style={[
                styles.text1,
                {
                  color: active ? Colors.textColor : Colors.blackColor,
                  // paddingRight: height > 667 ? 45 : 45,
                },
              ]}>
              Previous Bookings
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{paddingBottom: '20%'}}
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <BookingCard navigation={props.navigation} active={active} />
            );
          }}
        />
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
    marginTop: '4%',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    height: '7%',
    marginTop: height > 667 ? '10%' : '7%',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 12,
  },
  previousBookingsText: {
    color: Colors.textColor,
    paddingRight: height > 667 ? 25 : 45,
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 16 : 12,
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: 35,
  },
  image1: {
    height: 25,
    width: 25,
    borderRadius: 25,
  },
  text1: {
    fontFamily: FontFamily.helveticaBold,
    fontSize: height > 667 ? 14 : 12,
  },
});

export default BookingScreen;
