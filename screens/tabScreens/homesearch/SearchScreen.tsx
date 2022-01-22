
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Text, Image,Dimensions, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps'
import HomeSearchResult from '../../components/homeSearch/HomeSearchResult';
import HomeSearchShowResult from '../../components/homeSearch/HomeSearchShowResult';
import { RootTabScreenProps } from '../../../types';
import HomeListItem from '../../components/home/HomeListItem';
import Geolocation from 'react-native-geolocation-service';
import { menuBtn } from '../../../constants/menuBtn';
import { NavigationProp } from '@react-navigation/native';

const SearchScreen = ({ navigation, route, value }: { navigation: NavigationProp<any>, route: any, value: any }) => {
    
    const mapRef = useRef<any>(null);

    const initialPolygon:any = useRef({
        polygons: [],
        distance: 0,
        lastLatLng: undefined,
        initialLatLng: undefined,
        centerLatLng: undefined,
    });




    const [showMap, setShowMap]=useState<boolean>(true)
    const [mapData, setMapData]=useState<any>([])
    const [isReady, setIsReady] = useState<boolean>(false);
    const win = Dimensions.get('window');
    const [markerNum, setMarkerNum] = useState<any>(0);
    const [noteShow, setNoteShow] = useState<boolean>(false);
    const [chooseMarker, setChooseMarker] = useState<boolean>(false);
    const handleMapReady = useCallback(() => mapRef.current && setIsReady(true), []);

    const [initRegion, setInitRegion] = useState({
        latitude: 29.861145,
        longitude: -95.44252,
        latitudeDelta: 0.15,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        
        fetchUsers()
      },[SearchScreen]);

    const fetchUsers = () => {
        fetchData({latitude:29.861145,longitude: -95.44252})
        // Geolocation.getCurrentPosition(
        //     (position) => {
                
        //         fetchData({latitude:29.861145,longitude: -95.44252})
        //         // fetchData(position.coords)
        //         // setInitRegion({
        //         //     latitude: position.coords.latitude,
        //         //     longitude: position.coords.longitude,
        //         //     latitudeDelta: 0.15,
        //         //     longitudeDelta: 0.0421,
        //         // })
        //     },
        //     (error) => {
        //         // See error code charts below.
        //         console.log(error.code, error.message);
        //     },
        //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        //   );
      };
    const fetchData = (location:any)=>{
        
        fetch('http://ec2-3-144-42-178.us-east-2.compute.amazonaws.com:5000/api/user/089c839e-5a55-471f-ac5d-62dba5f4fa65/getFilteredListingsAtLocation?latitude='+location.latitude+'&longitude='+location.longitude+'&radius=0.02',
        
        {
            method: 'get',
            headers: {
                'Content-Type': "application/json",
                'password': 'passwordAUA'
            },

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('responseJson:----',responseJson)
            setMapData([...replaceImageUrl(responseJson)])
        }).catch((error) => {
            fetchData(location)
        })
    }
    const replaceImageUrl = (data:any) => {
        data.map((item:any,index:any)=>{item.photosUrl.map((item1:any,index1:any)=>
            item1[0]=='S' || item1[0]=='s'?data[index].photosUrl[index1]='https://zillowbucket.s3.us-east-2.amazonaws.com/'+data[index].photosUrl[index1].slice(18)
            :data[index].photosUrl[index1]=data[index].photosUrl[index1]
        )})
        console.log(data)
        return data
    }

    const zoomOut = async () => {
        if (!mapRef.current) return false;

        const camera = await mapRef.current.getCamera();
        if (Platform.OS === 'ios') {
            mapRef.current.animateCamera({ altitude: camera.altitude * 0.9 });
        }

        if (Platform.OS === 'android') {
            mapRef.current.animateCamera({ zoom: camera.zoom - 1 });
        }
        setChooseMarker(false)
    };

    const zoomIn = async () => {
        const camera = await mapRef.current.getCamera();
        if (Platform.OS === 'ios') {
            mapRef.current.animateCamera({ altitude: camera.altitude * 1.1 });
        }

        if (Platform.OS === 'android') {
            mapRef.current.animateCamera({ zoom: camera.zoom + 1 });
        }
        setChooseMarker(false)
    }

    const markerClick = (num:any) => {
        setMarkerNum(num)
        setChooseMarker(true)
    }

    const closeNote = () => {
        setNoteShow(false)
    }

    const chooseItem = (num:any) => {
        console.log(num)
        setShowMap(true)
        setChooseMarker(true)
        setMarkerNum(num)
        setInitRegion({latitude:mapData[num].latitude,
                      longitude:mapData[num].longitude,
                      latitudeDelta:initRegion.latitudeDelta,
                      longitudeDelta:initRegion.longitudeDelta})
    }

    const showDetail=()=>{
        console.log(markerNum)
        
        navigation.navigate('ShowDetail', { data:mapData[markerNum] })
        // setIsDetail(true)
        // onPress={}
    }

    const closewDetail=()=>{
        // setIsDetail(false)
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',padding:20,paddingBottom:5,backgroundColor:'white'}}>
                <TextInput
                        autoComplete={'pass'}
                        mode="outlined"
                        placeholder='Search address, or near you'
                        outlineColor='#F2F3F7'
                        activeOutlineColor='#888888'
                        style={{height:40,borderRadius:10,fontSize:14,
                            width:win.width-110}}
                        right={<TextInput.Icon style={{marginTop:15}} name="microphone" color='#D0D8E0'/>}
                    />
                <TouchableOpacity  onPress={() => setShowMap(!showMap)}>
                    <Image style={{width:20,height:20,marginTop:15,marginLeft:10,marginRight:10}} source={showMap?require('../../../assets/icons/Group.png'):require('../../../assets/icons/Group_(2).png')}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={{width:20,height:20,marginTop:15,marginRight:5}} source={require('../../../assets/icons/sliders.png')}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                {showMap?<View style={{flex: 1}}>
                    <MapView
                        ref={mapRef}
                        style={{ flex: 1 }}
                        onMapReady={handleMapReady}
                        provider={'google'}
                        showsMyLocationButton={true}
                        showsUserLocation={true}
                        zoomControlEnabled={true}
                        zoomEnabled={true}
                        zoomTapEnabled={true}
                        showsScale={true}
                        initialRegion={initRegion}
                    >
                       { Platform.OS != 'web' && mapData.map((item:any,index:any)=>{
                        return <Marker key={index} coordinate={{ latitude:mapData[index].latitude, longitude:mapData[index].longitude }} onPress={() => markerClick(index)}>
                            <Image source={require('../../../assets/icons/maker_custom.png')} style={{width: 39, height: 84 }} resizeMode="contain"></Image>
                        </Marker>})
                        }
                    </MapView>
                    <View style={{position:'absolute',top:20,right:20,backgroundColor:'white',borderRadius:30}}>
                        <View style={{padding:5,paddingTop:5,paddingBottom:5}}>
                            <TouchableOpacity style={{borderRadius:30}} onPress={zoomIn}>
                                <Image style={{width:35,height:35,borderRadius:30}} source={ require('../../../assets/icons/Vector_(7).png')}/>
                            </TouchableOpacity> 
                        </View>
                        <View style={{padding:5,paddingTop:5,paddingBottom:13}}>
                            <TouchableOpacity style={{borderRadius:30}} onPress={zoomOut}>
                                <Image style={{width:35,height:20,borderRadius:30}} source={require('../../../assets/icons/Vector_(8).png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{position:'absolute',top:110,right:20}}>
                        <TouchableOpacity style={{padding:8,backgroundColor:'white',borderRadius:30}}>
                            <Image style={{width:28,height:28}} source={ require('../../../assets/icons/Group_(3).png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:win.width-30,marginLeft:15,position:'absolute',bottom:90}}>
                        {chooseMarker&&<HomeSearchResult indexData={mapData[markerNum]} chooseItem={showDetail}/>}
                        {noteShow && <HomeSearchShowResult indexData={{resultNum:mapData.length}} closeNote={closeNote}/>}
                    </View>
                </View>
                :

                <View style={{flex:1}}>
                    <ScrollView>
                        <View style={styles.homeview}>
                            <View style={{flex:18,backgroundColor:'white',width:'100%'}}>
                                <ScrollView>
                                    {mapData.map((item:any,index:any)=>{return<HomeListItem key={index} indexData={item} num={index} chooseItem={()=>chooseItem(index)}/>})}
                                </ScrollView>
                            </View>
                            <View style={{height:100}}>

                            </View>
                        </View>
                    </ScrollView>
                </View>
                }
            </View>
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        top: '10%',
        right: '10%',
        position: 'absolute',
        backgroundColor: 'tomato',
        padding: 16,
        zIndex: 4,
        borderRadius: 18,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    homeview:{
        padding:15,
        paddingTop:0,
        paddingBottom:0,
        backgroundColor:'white'
    },
});
