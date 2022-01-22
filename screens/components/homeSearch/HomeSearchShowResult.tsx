import * as React from 'react';
import { SafeAreaView, StyleSheet, 
        TextInput, ScrollView, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../../../components/Themed';
import { RootTabScreenProps } from '../../../types';

export default function HomeSearchShowResult({ indexData,closeNote}: {indexData:any,closeNote: () => void}) {
  const win = Dimensions.get('window');
  return (
    <View style={[styles.homePopularView,{flexDirection:'row',backgroundColor:'#297EE4'}]} >
      <Text style={[styles.homeTitleText2,{color:'white'}]}>Found:&nbsp;{indexData.resultNum}&nbsp;results</Text>
      <TouchableOpacity style={{marginLeft:'auto',marginRight:20}} onPress={()=>closeNote()}>
        <Text style={[styles.homeTitleText1,{color:'white',backgroundColor:'#30C0E9'}]}>Show</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  homePopularView:{
    width:'98%',
    marginLeft:'1%',
    marginTop:5,
    marginBottom:5,
    flexDirection:'row',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,  
    elevation: 5
  },


  // homeTitleArrow:{width:20,height:20,marginRight:10,marginTop:13},
  homeTitleText1:{fontSize:14,fontWeight:'400',color:'#ACB7C2',padding:7,paddingLeft:15,paddingRight:15,borderRadius:15},
  homeTitleText2:{fontSize:14,fontWeight:'400',color:'#ACB7C2',padding:7,paddingLeft:20},
  // homeTitleText:{fontSize:18,fontWeight:'400'},
  // homeTitleImage:{width:42,height:42,marginRight:10},
  // homeTitleView:{flexDirection:'row',width:'100%',marginTop:10,marginBottom:20},
});
