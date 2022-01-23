import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { RootTabScreenProps } from '../../../types';
import { menuBtn } from '../../../constants/menuBtn';
import { CarouselComponent } from "../../../components/Carousel";

export default function HomeScreen({ navigation }: RootTabScreenProps<any>) {
  const [getMenuBtn, setMenuBtn] = React.useState(menuBtn)
  const [mapData, setMapData] = useState<any>([])

  const win = Dimensions.get('window');

  const setMenubutton = (data: any) => {
    menuBtn.forEach((item: any, index: any) => {
      getMenuBtn[index] = { title: item.title, state: index == data ? true : false }
    })
    setMenuBtn([...getMenuBtn])
  }

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    fetch('http://ec2-3-144-42-178.us-east-2.compute.amazonaws.com:5000/api/user/089c839e-5a55-471f-ac5d-62dba5f4fa65/getFilteredListingsAtLocation?latitude=29.858924&longitude=-95.587894&radius=0.05',
      {
        method: 'get',
        headers: {
          'Content-Type': "application/json",
          'password': 'passwordAUA'
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson:----', responseJson)
        setMapData([...replaceImageUrl(responseJson)])
      }).catch((error) => {
        fetchData()
      })
  }


  const replaceImageUrl = (data: any) => {
    data.map((item: any, index: any) => {
      item.photosUrl.map((item1: any, index1: any) =>
        item1[0] == 'S' || item1[0] == 's' ? data[index].photosUrl[index1] = 'https://zillowbucket.s3.us-east-2.amazonaws.com/' + data[index].photosUrl[index1].slice(18)
          : data[index].photosUrl[index1] = data[index].photosUrl[index1]
      )
    })
    console.log(data)
    return data
  }

  return (

    <View style={styles.container}>
      <View style={styles.separator}>
        <View>
          <Text style={styles.title}>Choose house to live</Text>
        </View>
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
      {/* <View style={{ display: 'flex', alignItems: 'center', flex: 1 }}></View> */}
      <View style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <CarouselComponent layout="stack" data={mapData} />
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
    padding: 20,
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
