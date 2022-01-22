import * as React from 'react';
import {
  SafeAreaView, StyleSheet,
  TextInput, ScrollView, Image, TouchableOpacity, Animated, Dimensions
} from 'react-native';
import { Text, View } from '../../../components/Themed';
import { RootTabScreenProps } from '../../../types';
import { menuBtn } from '../../../constants/menuBtn';
import { CarouselComponent } from "../../../components/Carousel";

export default function HomeScreen({ navigation }: RootTabScreenProps<any>) {
  const [getMenuBtn, setMenuBtn] = React.useState(menuBtn)

  const win = Dimensions.get('window');

  const setMenubutton = (data: any) => {
    menuBtn.forEach((item: any, index: any) => {
      getMenuBtn[index] = { title: item.title, state: index == data ? true : false }
    })
    setMenuBtn([...getMenuBtn])
  }

  return (

    <View style={styles.container}>
      <View style={styles.separator}>
        <View>
          <Text style={styles.title}>Choose house to live</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center', flex: 1 }}></View>
        <View>
          <ScrollView horizontal={true}>
            {
              getMenuBtn.map((item, index) => {
                return <View key={index}>
                  <TouchableOpacity style={{ marginBottom: 7 }} onPress={e => { e.preventDefault(); setMenubutton(index) }} >
                    <Text style={[styles.btnStyle, { backgroundColor: item.state ? '#30C0E9' : '#F2F3F7', color: item.state ? 'white' : '#ACB7C2' }]} >{item.title}</Text>
                  </TouchableOpacity>
                </View>
              })
            }
          </ScrollView>
        </View>
      </View>
      <View style={{ display: 'flex', alignItems: 'center', flex: 1 }}></View>
      <View style={{ display: 'flex', alignItems: 'center', flex: 50 }}>
        <CarouselComponent layout="tinder" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({


  swip_icon: {
    width: (Dimensions.get('window').height - 40) * 3 / 37,
    height: (Dimensions.get('window').height - 40) * 3 / 37,
  },
  swip_icon_1: {
    width: (Dimensions.get('window').height - 40) * 3 / 37,
    height: (Dimensions.get('window').height - 40) * 3 / 37,
    marginLeft: 'auto'
  },

  btnStyle: {
    backgroundColor: '#F2F3F7',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    textAlign: 'center',
    marginRight: 15,
    color: '#ACB7C2'
  },
  homeview: {
    padding: 20,
    flex: 1
  },
  homeBtns: {
    paddingBottom: 5
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  container: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    backgroundColor: "white",
  },
  separator: {
    width: "100%",
    // height: 80,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
