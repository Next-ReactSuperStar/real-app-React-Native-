import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Text, Image,Dimensions, ScrollView } from 'react-native';
// import MapView, { ILocationProps, IDrawResult, TouchPoint, Marker,PROVIDER_GOOGLE } from '../component';
import { TextInput } from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
// import { MarkerLocation } from '../assets';
// import AnimatedPolygon from '../components/polygon';
import HomeSearchResult from '../../components/homeSearch/HomeSearchResult';
import HomeSearchShowResult from '../../components/homeSearch/HomeSearchShowResult';
import { RootTabScreenProps } from '../../../types';
import axios from 'axios'
// import {fetchApi} from '../../service'
import HomePopularItem from '../../components/home/HomePopularItem';
import HomeLookingImage from '../../components/home/HomeLookingImage';
import LocationLookingImage from '../../components/home/LocationLookingImage';
import HomeNearItem from '../../components/home/HomeNearItem';
import HomeNearItem_1 from '../../components/home/HomeNearItem_1';
import { menuBtn } from '../../../constants/menuBtn';

const FavoriteScreen = ({ navigation }: RootTabScreenProps<any>) => {
    
    const mapRef = useRef<any>(null);

    const initialPolygon:any = useRef({
        polygons: [],
        distance: 0,
        lastLatLng: undefined,
        initialLatLng: undefined,
        centerLatLng: undefined,
    });


    useEffect(() => {
        // fetchUsers()
      },[FavoriteScreen]);

    const [showMap, setShowMap]=useState<boolean>(false)
    const [mapData, setMapData]=useState<any>([])
    const [modePolygon, setPolygonCreated] = useState<boolean>(false);

    const [isActiveDraw, setDrawMode] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(false);
    // const [points, setPoints] = useState<TouchPoint[]>([]);
    const win = Dimensions.get('window');
    // const [polygon, setPolygon] = useState<IDrawResult>(initialPolygon.current);
    const [markerNum, setMarkerNum] = useState<any>(0);
    const [noteShow, setNoteShow] = useState<boolean>(false);
    const [chooseMarker, setChooseMarker] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>(0);
    const handleMapReady = useCallback(() => mapRef.current && setIsReady(true), []);

    const [initRegion, setInitRegion] = useState({
        latitude: 29.861145,
        longitude: -95.44252,
        latitudeDelta: 0.15,
        longitudeDelta: 0.0421,
    });
    // const [text, onChangeText] = React.useState('');
    // const [number, onChangeNumber] = React.useState(null);
    // const [getBtninfo, onBtnPress] = React.useState(null)
    
    // const [getMenuBtn, setMenuBtn] = React.useState(menuBtn)
  
    // const setMenubutton=(data:any)=>{
    //   menuBtn.forEach((item:any,index:any) => {
    //     getMenuBtn[index]={title:item.title, state:index==data?true:false}
    //   })
    //   setMenuBtn([...getMenuBtn])
    // }


    const fetchUsers = async () => {

        // console.log('fetch mapdata start:-----',mapData)
        await fetch('http://ec2-3-144-42-178.us-east-2.compute.amazonaws.com:5000/api/user/089c839e-5a55-471f-ac5d-62dba5f4fa65/getFilteredListingsAtLocation?latitude=29.858924&longitude=-95.587894&radius=0.02',
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
            setMapData(responseJson)
        }).catch((error) => {
        })

      };

    // const handleRemovePolygon = useCallback(() => {
    //     setPolygon(initialPolygon.current);
    //     setPolygonCreated(false);
    // }, []);

    // const handleClear = useCallback(() => {
    //     setPolygon(initialPolygon.current);
    //     setPolygonCreated(false);
    //     setPoints([]);
    // }, []);

    // const handleIsDraw = useCallback(() => {
    //     setChooseMarker(false)
    //     if (!mapRef.current) return;
    //     if (!isActiveDraw) {
    //         handleClear()
    //     }
    //     setDrawMode((prevMode) => !prevMode);
    // }, [handleClear, isActiveDraw]);

    // const handleCanvasEndDraw = useCallback((locations) => {
           
    //     setNoteShow(true)
    //     zoomCenterPolygon(locations.centerLatLng).then(() => {
    //         setPolygon(locations);
    //         setPolygonCreated(true);
    //     });
    //     setDrawMode((prevMode) => !prevMode);
    //     console.log('locations:',noteShow)
    // }, []);

    // const zoomCenterPolygon = async (center: ILocationProps) => {
    //     if (!mapRef.current) return;
    //     const camera = await mapRef.current.getCamera();
    //     if (Platform.OS === 'ios') {
    //         mapRef.current.animateCamera({
    //             center: center,
    //         });
    //     }
    //     if (Platform.OS === 'android') {
    //     }
    // };

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

    const hasMarkerClose = ()=>(
        mapData.map((item:any,index:any)=>{
        return <Marker key={index} coordinate={{ latitude:mapData[index].latitude, longitude:mapData[index].longitude }} onPress={() => markerClick(index)}>
            <Image source={require('../../../assets/icons/maker_custom.png')} style={{width: 39, height: 84 }} resizeMode="contain"></Image>
        </Marker>}))
    // const handlePolygon = useCallback(
    //     (item, index) => <AnimatedPolygon key={index} coordinates={polygon.polygons} />,
    //     [polygon.polygons],
    // );

    // const onChangePoints = useCallback((value) => {
    //     setPoints(value);
    // }, []);

    const closeNote = () => {
        setNoteShow(false)
    }

    const chooseItem = (num:any) =>{
      console.log(num)
      setShowMap(true)
      setChooseMarker(true)
      setInitRegion({latitude:mapData[num].latitude,
                    longitude:mapData[num].longitude,
                    latitudeDelta:initRegion.latitudeDelta,
                    longitudeDelta:initRegion.longitudeDelta})
      setSelectedItem(num)
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',padding:20,paddingBottom:5,backgroundColor:'white'}}>
              <Text style={styles.title}>My Favorites</Text>
              <View style={{flexDirection:'row',marginLeft:'auto'}}>
                <TouchableOpacity style={{}} onPress={() => setShowMap(!showMap)}>
                    <Image style={{width:20,height:20,marginTop:15,marginLeft:10,marginRight:10}} source={showMap?require('../../../assets/icons/Group.png'):require('../../../assets/icons/Group_(2).png')}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={{width:20,height:20,marginTop:15,marginRight:5}} source={require('../../../assets/icons/sliders.png')}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1}}>
                {showMap?<View style={{flex: 1}}>
                    <MapView
                        ref={mapRef}
                        style={{ flex: 1 }}
                        // points={points}
                        // widthLine={5}
                        // onEndDraw={handleCanvasEndDraw}
                        // isDrawMode={isActiveDraw}
                        onMapReady={handleMapReady}
                        // onStartDraw={handleClear}
                        // createdPolygon={modePolygon}
                        // onChangePoints={onChangePoints}
                        // backgroundCanvas={'rgba(0, 0, 0, 0.0)'}
                        provider={'google'}
                        showsMyLocationButton={true}
                        showsUserLocation={true}
                        zoomControlEnabled={true}
                        zoomEnabled={true}
                        zoomTapEnabled={true}
                        showsScale={true}
                        initialRegion={initRegion}
                    >
                      {/* {mapData.map((item:any, index:any)=><Marker key={index}
                            coordinate={{latitude: item.latitude, longitude: item.longitude}}
                            onPress={() => markerClick(index)}
                            >
                          <Image source={require('../../../assets/icons/maker_custom.png')} style={{width: 39, height: 84 }} resizeMode="contain"></Image>
                        </Marker>)
                      } */}
                        {/* {
                        isReady &&
                            modePolygon &&
                            polygon.polygons &&
                            polygon.polygons.length > 0 && (
                                <> */}
                                    {hasMarkerClose}
                                    {/* {polygon.polygons.map(handlePolygon)} */}
                                {/* </>
                            ) 
                            } */}
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
                    {/* <View style={{position:'absolute',top:163,right:20,borderRadius:40}}>
                        <TouchableOpacity onPress={handleIsDraw}>
                            {isActiveDraw ? (
                                <Image style={{width:45,height:45,borderRadius:18}} source={require('../../../assets/icons/fluent_hand-draw-24-regular_(1).png')}/>
                            ) : (
                                <Image style={{width:45,height:45,borderRadius:18}} source={require('../../../assets/icons/fluent_hand-draw-24-regular.png')}/>
                            )}
                            
                        </TouchableOpacity>
                    </View> */}
                    <View style={{position:'absolute',marginLeft:win.width/2-130,marginTop:(win.height-60)/4}}>
                      {chooseMarker && <LocationLookingImage indexData={mapData[selectedItem]}></LocationLookingImage>  }
                    </View>
                    <View style={{width:win.width-30,marginLeft:15,position:'absolute',bottom:90}}>
                        {noteShow && <HomeSearchShowResult indexData={{resultNum:mapData.length}} closeNote={closeNote}/>}
                    </View>
                </View>
                :

                <View style={styles.homeview}>
                    <View style={{flex:18,backgroundColor:'white',width:'99%'}}>
                        <ScrollView>
                            <View style={{padding:20}}>
                                {mapData.map((item:any,index:any)=>{return<HomePopularItem key={index} indexData={item} num={index} chooseItem={()=>chooseItem(index)}/>})}
                            </View>
                        </ScrollView>
                    </View>
                  <View style={{height:95}}>

                  </View>
                </View>}
            </View>
        </View>
    );
};

export default FavoriteScreen;

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
      fontSize: 28,
      fontWeight: '600',
      paddingRight:'15%',
      color:'black'
    },
    homeview:{
      flex:1,
        // padding:20,
        // paddingTop:0,
        // paddingBottom:0,
        backgroundColor:'white'
    },
});
