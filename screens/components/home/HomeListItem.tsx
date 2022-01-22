import * as React from 'react';
import { SafeAreaView, StyleSheet, 
        TextInput, ScrollView, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { Feather } from '@expo/vector-icons';
// import EditScreenInfo from '../../../components/EditScreenInfo';
import { Text, View } from '../../../components/Themed';
import { RootTabScreenProps } from '../../../types';

export default function HomeListItem({ indexData,num,chooseItem}: {indexData:any,num:any,chooseItem:()=>void}) {
  const win = Dimensions.get('window')
  return (
  <TouchableOpacity onPress={()=>{chooseItem()}}>
    <View style={styles.homePopularView} >
      <Image style={{backgroundColor:'#869470',height:win.width/3.7,borderRadius:10,marginRight:'2.5%',marginLeft:'2.5%'}}source={{uri:indexData.photosUrl[0]}}/>
        <View style={{flexDirection:'row',marginRight:'2.5%',marginLeft:'2.5%',marginTop:10}}>
          {indexData.price?<Text style={[styles.homeTitleText1,{color:'#297EE4',fontSize:14}]}>$.{indexData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>:null}
          {indexData.sqft?<Text style={[styles.homeTitleText1,{fontSize:14,marginLeft:'auto',marginRight:'auto'}]}>{indexData.sqft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}Sqft</Text>:null}
          <View style={{flexDirection:'row',marginLeft:'auto'}}>
            <Image style={{height:15,width:15,marginRight:5}}source={require('../../../assets/icons/Vector_(2).png')}/>
            <Text style={styles.homeTitleText1}>{indexData.numBed}&nbsp;Beds</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Image style={{height:15,width:15,marginRight:5}}source={require('../../../assets/icons/Group_1.png')}/>
            <Text style={styles.homeTitleText1}>{indexData.numBath}&nbsp;Baths</Text>
          </View>
        </View>
      <View style={{flexDirection:'row',marginRight:'2.5%',marginLeft:'2.5%'}}>
        <Text style={[styles.homeTitleText1,{marginTop:4,fontSize:14}]}>{indexData.address}</Text>
        <View style={{width:30,height:30,marginLeft:'auto'}}>
          <Image style={{width:20,height:16,marginRight:5}}source={indexData.isFavorite==1?require('../../../assets/icons/heart_red.png'):require('../../../assets/icons/heart_white.png')}/>
        </View>
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
  homeTitleText1:{fontSize:12,fontWeight:'400',color:'#ACB7C2',marginRight:10},
  homeTitleText:{fontSize:16,fontWeight:'500'},
  homeTitleImage:{width:42,height:42,marginRight:10},
  homeTitleView:{flexDirection:'row',width:'100%',marginTop:10,marginBottom:20},
});
