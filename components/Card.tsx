import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { DATA } from "../utils";
const win = Dimensions.get('window');
export type CardProps = typeof DATA[0];

export const Card = ({ type, title, image, id, address, bedroom, bathroom, checked }:
  { type: any, title: any, image: any, id: any, address: any, bedroom: any, bathroom: any, checked: string }) => {
  return <>
    {type != 'default' ?
      <View key={id} style={styles.container}>
        <View key={id} style={[styles.item, { width: win.width - 40, height: win.width - 50 }]}>
          <Image style={[styles.image, { height: win.width - 150, width: win.width - 70 }]} source={{ uri: image }} />
          {
            checked ? <View style={{ position: 'absolute', right: 20, bottom: 76 }}>
              <Image style={{ width: 25, height: 25, marginRight: 5 }} source={require('../assets/icons/Favorite1(1).png')} />
            </View>
              : <View style={{ position: 'absolute', right: 20, bottom: 76 }}>
                <Image style={{ width: 25, height: 25, marginRight: 5 }} source={require('../assets/icons/Favorite1(2).png')} />
              </View>
          }
          <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            {/* <Text style={styles.homeTitleText}>{title}</Text> */}
            <Text style={[styles.homeTitleText, { color: '#297EE4', marginTop: 4 }]}>{address}</Text>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image style={{ width: 15, height: 15, marginRight: 5 }} source={require('../assets/icons/bedroom_icon.png')} />
                <Text style={[styles.homeTitleText1, { width: 80 }]}>{bedroom}&nbsp;Bedroom</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image style={{ width: 15, height: 15, marginRight: 5 }} source={require('../assets/icons/bathroom_icon.png')} />
                <Text style={styles.homeTitleText1}>{bathroom}&nbsp;Bathroom</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      :
      <View key={id} style={styles.container1}>
        <View key={id} style={[styles.item]}>
          <Image style={[styles.image, { width: win.width - 60, height: win.width / 1.3 }]} source={{ uri: image }} />
        </View>
      </View>
    }
  </>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  container1: {
    flex: 1,
    alignItems: "center",
    margin: 10
  },

  item: {
    borderRadius: 30,
    backgroundColor: "white",
    padding: 15,
    marginTop:0,
    marginVertical: 24,
    marginHorizontal: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 2,
  },

  image: {
    borderRadius: 20,
  },

  swip_icon: {
    width: (Dimensions.get('window').height - 40) * 3 / 37,
    height: (Dimensions.get('window').height - 40) * 3 / 37,
  },

  swip_icon_1: {
    width: (Dimensions.get('window').height - 40) * 3 / 37,
    height: (Dimensions.get('window').height - 40) * 3 / 37,
    marginLeft: 'auto'
  },

  homeTitleText1: {
    fontSize: 12,
    fontWeight: '300',
    color: '#000'
  },

  homeTitleText: {
    fontSize: 16,
    fontWeight: '500'
  },
});
