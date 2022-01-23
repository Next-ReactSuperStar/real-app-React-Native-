// import { styles } from './styles.js';
import { Image, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text } from '../../../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen = ({ navigation, route, value }: { navigation: NavigationProp<any>, route: any, value: any }) => {
  const win = Dimensions.get('window');
  const [name, setName] = useState('kkk');
  const [email, setEmail] = useState('beaulahschwartingrgq60@gmail.com');
  const [userid, setUserid] = useState('6ffea4d4-9065-4521-a8f5-a239311ad9ef');
  const [category_data, setCategory] = useState([]);
  const [catename_data, setCatename_data] = useState<any>();

  useEffect(() => {
    getData();
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const value: any = await AsyncStorage.getItem('user_data');
      if (value.length > 0) {
        let data = JSON.parse(value);
        setName("kkk");
        setEmail(data.email);
        setUserid(data.userId);
      }
    } catch (error) {
      // Error retrieving data

    }
  };

  const fetchData = () => {
    fetch('http://ec2-3-144-42-178.us-east-2.compute.amazonaws.com:5000/api/question/getCategories',
      {
        method: 'get',
        headers: {
          'Content-Type': "application/json",
          'password': 'passwordAUA'
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.length !== 0) {
          setCategory(responseJson);
          let arr: any = [];
          responseJson.map((item: any, item_key: number) => {
            arr.push(item.name);
          })
          setCatename_data(arr);
        }
      }).catch((error) => {
        alert('error')
      })
  }

  const renderList = () => {
    if (category_data) {
      return category_data.map((category: any, index) => {
        return (
          <View key={index} style={styles.img_wrap}>
            <Image style={{ width: win.width / 2 - 30, height: (win.width / 2 - 30) * 1.2, marginLeft: 5, marginRight: 5, marginBottom: 10 }} source={{
              uri: category.imageUrl,
            }} />
            <Text style={{ position: 'absolute', fontSize: 18, fontWeight: 'bold', top: win.width / 6 + 10, left: 15 }}>{category.name}</Text>
            <Text style={{ position: 'absolute', fontSize: 11, top: win.width / 5 + 25, left: 15, maxWidth: win.width / 4, textAlign: 'left' }}>{category.description}</Text>
            <Text style={{ position: 'absolute', fontSize: 11, top: win.width / 5 + 70, left: 15, maxWidth: win.width / 4, textAlign: 'left' }}>{category.estimate}</Text>
            <View style={{ position: 'absolute', top: win.width / 5 + 60, right: 15, maxWidth: win.width / 4 }} >
              {
                <TouchableOpacity
                  onPress={() => navigation.navigate('Questionnaire', { category_name: category.name, user_id: userid, catename_data })}
                >
                  <Text style={styles.btn_start} accessibilityRole='button' accessibilityLabel='qaStart' >Start</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
        )
      })
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={styles.loginWrap}>
          <View style={{ display: 'flex', alignItems: 'center', height: 40 }}></View>
          <View style={{ flexDirection: 'row', marginBottom: 15, }}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 30 }}
            // onPress={() => navigation.navigate('Questionnaire')}
            >
              <Image style={{ width: 15, height: 15, marginTop: 'auto', marginBottom: 10 }} source={require('../../../assets/icons/Vector_(4).png')} />
            </TouchableOpacity>
          </View>
          <View style={{ display: 'flex', alignItems: 'center', flex: 1 }}></View>
          <View style={styles.profileCard}>
            <View style={{ margin: 20, display: 'flex', justifyContent: 'center' }}>
              <View style={{ width: win.width / 4, height: win.width / 4, borderRadius: win.width / 8, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#512DA8', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ position: 'absolute', fontSize: 35, fontWeight: 'bold', color: '#fff' }} accessibilityLabel='profilesubname'>{name.slice(0, 2).toUpperCase()}</Text>
              </View>
            </View>
            <View >
              <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '600', width: 'auto' }} data-cy="profilename">{name}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingLeft: 10, display: 'flex', justifyContent: 'center' }}>
              <Image style={{ margin: 10, width: 25, height: 25, marginRight: 5 }} source={require('../../../assets/icons/fluent_mail-16-filled.png')} />
              <Text style={{ margin: 10, fontSize: 16, fontWeight: '400' }} data-cy="profileemail">{email}</Text>
            </View>
          </View>
          <View>
            <Text style={{ margin: 20, fontSize: 20, fontWeight: '500' }}>Categories</Text>
          </View>
          <View>
            <TouchableOpacity accessibilityRole='button' accessibilityLabel='toqapage0' onPress={() => navigation.navigate('Questionnaire', { category_name: "Appliances", user_id: '6ffea4d4-9065-4521-a8f5-a239311ad9ef' })}>
              <Text style={{ color: 'white' }}>d</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', width: win.width - 40, marginLeft: 20, marginBottom: 20, display: 'flex', flexWrap: 'wrap' }}>
            {
              renderList()
            }
          </View>
          <View style={{ height: 80 }}></View>
        </View>
      </ScrollView>
    </View>

  );
};

export default UserScreen;

import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  profileCard: {
    width: Dimensions.get('window').width - 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  btnStyle: {
    backgroundColor: '#30C0E9',
    padding: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    textAlign: 'left',
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    flex: 8,
    height: 60
  },
  btnStyle1: {
    backgroundColor: '#30C0E9',
    padding: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    textAlign: 'right',
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    flex: 4,
    height: 60
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 'auto',
    marginLeft: 20
  },
  subText: {
    fontSize: 16,
    color: '#30C0E9',
    marginTop: '2%',
    marginBottom: '2%',
  },
  loginWrap: {
    backgroundColor: 'white',
  },
  loginVerticalPart: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  img_wrap: {
    position: 'relative',
    textAlign: 'center',
  },
  btn_start: {
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 15,
    paddingRight: 14,
    backgroundColor: '#297EE4',
    color: 'white',
    borderRadius: 29,
    width: 75,
  },
});