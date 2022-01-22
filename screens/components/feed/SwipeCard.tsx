import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, 
        TextInput, ScrollView, Image, Animated, TouchableOpacity,Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { Feather } from '@expo/vector-icons';
// import EditScreenInfo from '../../../components/EditScreenInfo';
import { Text, View } from '../../../components/Themed';
import { RootTabScreenProps } from '../../../types';
import { isTranslateTextInput } from '@aws-amplify/predictions';

export default function SwipeCard({ indexData }: any) {
  // const animation = React.useState(new Animated.Value(0))[0];
  const win = Dimensions.get('window');
  console.log(indexData)
  // const RotateData = animation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '90deg'],
  // });
  return (
    <View style={[styles.image_card_view,{zIndex:indexData.index,marginLeft:indexData.animationVal,transform:[{"rotate": indexData.rotateVal}]
        }]}>
      <Image style={styles.image_card} source={require('../../../assets/images/Image.png')}/>
      <View style={{marginLeft:15,marginRight:15}}>
        <Text style={styles.homeTitleText}>Dreamsville House</Text>
        <Text style={[styles.homeTitleText1,{color:'#297EE4',marginTop:4}]}>Jl. Sultan Iskandar Muda, Jakarta selatan</Text>
        <View style={{flexDirection:'row',marginTop:4}}>
          <View style={{flexDirection:'row'}}>
            <Image style={{width:15,height:15,marginRight:5}}source={require('../../../assets/icons/Vector_(2).png')}/>
            <Text style={[styles.homeTitleText1,{width:80}]}>6 Bedroom</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Image style={{width:15,height:15,marginRight:5}}source={require('../../../assets/icons/Group_1.png')}/>
            <Text style={styles.homeTitleText1}>4 Bathroom</Text>
          </View>
        </View>
      </View>
      
      {indexData.swapState?<View style={[styles.image_card_view_over,{backgroundColor:'#FF737F44'}]}>
        <View style={{transform:[{"rotate": '20deg'}],marginTop:20,marginLeft:win.width-180,width:130,borderRadius:7,borderColor:'#FF737F',borderWidth:2,backgroundColor:'##FF737F66'}}>
          <Text style={{fontSize:40,color:'#DD4653',padding:10}}>NOPE</Text>
        </View>
      </View>:null}
    </View>
  );
}

const styles = StyleSheet.create({
  
  homeTitleArrow:{width:20,height:20,marginRight:10,marginTop:13},
  homeTitleText1:{fontSize:12,fontWeight:'400',color:'#ACB7C2'},
  homeTitleText:{fontSize:16,fontWeight:'500'},
  homeTitleImage:{width:42,height:42,marginRight:10},
  homeTitleView:{flexDirection:'row',width:'100%',marginTop:10,marginBottom:20},
  image_card:{
    width:(Dimensions.get('window').width-40)-30,
    height:(Dimensions.get('window').height-395),
    maxHeight:Dimensions.get('window').width*0.95,
    marginTop:15,
    marginLeft:15,
    marginBottom:5,
    borderRadius:5,
  },
  image_card_view:{
    position:'absolute',
    height:(Dimensions.get('window').height-300),
    maxHeight:Dimensions.get('window').width*1.2,
    width:'100%',
    borderRadius:15,
    // borderWidth:1,
    // borderColor:'#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,  
    elevation: 5
  },
    image_card_view_over:{
    position:'absolute',
    height:(Dimensions.get('window').height-300),
    maxHeight:Dimensions.get('window').width*1.2,
    width:'100%',
    borderRadius:15,
  },
});
