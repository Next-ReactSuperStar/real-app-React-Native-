import * as React from 'react';
import {   StyleSheet,  Image,  Dimensions, TouchableOpacity } from 'react-native';
import { Text, View } from '../../../components/Themed';

export default function LocationLookingImage({ indexData }: any) {
  const win = Dimensions.get('window');
  return (
    <TouchableOpacity>
      <View style={styles.homeNearImageView}>
        <View style={{borderRadius:8,marginLeft:8,marginRight:8,marginTop:8,position:'relative'}}>
          <Image style={styles.backgroundImg}source={indexData.img}/>
            {indexData.isNew?<Text style={styles.newSymboltext}>New</Text>:null}
        </View>
        <View style={{paddingLeft:8}}>
          <Text style={{fontWeight:'400',fontSize:18}}>{indexData.name}</Text>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:11,fontWeight:'400',color:'#A1A4B2'}}>${indexData.price}</Text>
            <View style={{width:3,height:3,backgroundColor:'#A1A4B2',borderRadius:1.5,margin:7}}></View>
            <Text style={{fontSize:11,fontWeight:'400',color:'#A1A4B2'}}>{indexData.distance}Miles</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backgroundImg:{
    // width:((Dimensions.get('window').height-40)*5/19-100)*10/7,
    // height:(Dimensions.get('window').height-40)*5/19-100,
    width:140,
    height:110,
    borderRadius:10
  },
  homeNearImageView:{
    // width:((Dimensions.get('window').height-40)*5/19-100)*10/7,
    // width:290,
    // height:140,
    borderRadius:10,
    marginRight:8
  },
  newSymboltext:{
    position:'absolute',
    color:'white',
    fontSize:15,
    fontWeight:'700',
    backgroundColor:'#297EE4',
    paddingLeft: 5,
    paddingRight: 5,
    borderTopLeftRadius:8,
    borderBottomRightRadius:11,
    borderBottomColor:'white',
    borderRightColor:'white',
    borderBottomWidth:3,
    borderRightWidth:3,
  },

});
