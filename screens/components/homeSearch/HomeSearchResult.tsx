import * as React from 'react';
import { SafeAreaView, StyleSheet, 
        TextInput, ScrollView, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { Feather } from '@expo/vector-icons';
// import EditScreenInfo from '../../../components/EditScreenInfo';
import { Text, View } from '../../../components/Themed';
import { RootTabScreenProps } from '../../../types';

export default function HomeSearchResult({ indexData}: {indexData:any}) {
  const win = Dimensions.get('window');
  return (
  <TouchableOpacity>
    <View style={styles.homePopularView} >
      <Image style={{width:win.width*0.35,height:win.width*0.27,borderRadius:10,marginRight:10,marginLeft:10}}source={{uri:indexData.photosUrl[0]}}/>
      <View style={{width:win.width*0.5}}>
        <Text style={[styles.homeTitleText,{marginTop:3}]}>{indexData.address}</Text>
        <View style={{flexDirection:'row',marginTop:4}}>
          <View>
            <Text style={[styles.homeTitleText1,{width:50}]}>{indexData.numBed}&nbsp;Beds</Text>
          </View>
          <View>
            <Text style={[styles.homeTitleText1,{width:50}]}>{indexData.numBath}&nbsp;Baths</Text>
          </View>
          <View>
            {indexData.sqft? <Text style={styles.homeTitleText1}>{indexData.sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;Sq.Ft</Text>:null}
          </View>
        </View>
        {indexData.price? <Text style={[styles.homeTitleText2,{color:'#297EE4'}]}>${indexData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>:null}
      </View>
    </View>
  </TouchableOpacity>
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


  homeTitleArrow:{width:20,height:20,marginRight:10,marginTop:13},
  homeTitleText1:{fontSize:12,fontWeight:'400',color:'#ACB7C2'},
  homeTitleText2:{fontSize:19,fontWeight:'400',color:'#ACB7C2',marginLeft:'auto',marginRight:10},
  homeTitleText:{fontSize:18,fontWeight:'400'},
  homeTitleImage:{width:42,height:42,marginRight:10},
  homeTitleView:{flexDirection:'row',width:'100%',marginTop:10,marginBottom:20},
});
