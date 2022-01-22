
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, Text, Image,Dimensions, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps'
import HomeSearchResult from '../homeSearch/HomeSearchResult';
import HomeSearchShowResult from '../homeSearch/HomeSearchShowResult';
import { NavigationProp } from '@react-navigation/native';
import HomeListItem from '../home/HomeListItem';
import { CarouselComponent } from "../../../components/Carousel";
import { DATA } from "../../../utils";

const ShowDetailScreen = ({ navigation, route, value }: {navigation: NavigationProp<any>,data:any,route:any, value:any}) => {
    
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
    const { data } = route.params;

    const [initRegion, setInitRegion] = useState({
        latitude: 29.861145,
        longitude: -95.44252,
        latitudeDelta: 0.15,
        longitudeDelta: 0.0421,
    });
// console.log('data::',data)
    useEffect(() => {
        settingMapView()
      },[ShowDetailScreen]);

    const settingMapView = async() => {
        const camera = await mapRef.current.getCamera();
        if (Platform.OS === 'ios') {
            mapRef.current.animateCamera({ altitude: camera.altitude * 1.3 });
        }

        if (Platform.OS === 'android') {
            mapRef.current.animateCamera({ zoom: camera.zoom + 2 });
        }
    }
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',padding:20,paddingBottom:5,backgroundColor:'white'}}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    {/*  */}
                    <Image style={{width:30,height:30,marginTop:15,}} source={require('../../../assets/icons/IC_Back.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:'auto',marginRight:10}}>
                    <Image style={{width:20,height:20,marginTop:15}} source={showMap?require('../../../assets/icons/Group.png'):require('../../../assets/icons/Group_(2).png')}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={{padding:20,paddingTop:0}}>
                    <CarouselComponent layout={"default"} data={data.photosUrl}/>
                    <View style={{paddingLeft:15}}>
                        <Text style={[styles.homeTitleText2,{color:'#000000',paddingTop:10}]}>Price</Text>

                        {data.price?<Text style={[styles.homeTitleText2,{color:'#297EE4',paddingTop:10}]}>${data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>:null}

                        <Text style={[styles.homeTitleText2,{color:'#000000',paddingTop:10}]}>Info</Text>
                        <View style={{flexDirection:'row',paddingTop:10}}>
                            <Image style={{height:30,width:30,marginRight:10,padding:5}}source={require('../../../assets/icons/IC_Bedroom.png')}/>
                            <Text style={styles.homeTitleText1}>{data.numBed}&nbsp;Bads</Text>
                        </View>
                        <View style={{flexDirection:'row',paddingTop:10}}>
                            <Image style={{height:30,width:30,marginRight:10,padding:5}}source={require('../../../assets/icons/IC_Bathroom.png')}/>
                            <Text style={styles.homeTitleText1}>{data.numBath}&nbsp;Baths</Text>
                        </View>
                        <View style={{flexDirection:'row',paddingTop:10,paddingBottom:15}}>
                            <Text style={[styles.homeTitleText2,{color:'#000000'}]}>Location</Text>
                            <Text style={[styles.homeTitleText2,{marginLeft:'auto',fontSize:12,color:'#000000',paddingTop:5}]}>{data.address}</Text>
                        </View>
                        <View style={{ height:130,width:'100%',borderRadius:10 }}>
                            <MapView
                                ref={mapRef}
                                style={{flex:1}}
                                onMapReady={handleMapReady}
                                // provider={'google'}
                                showsMyLocationButton={false}
                                showsUserLocation={false}
                                zoomControlEnabled={true}
                                zoomEnabled={true}
                                zoomTapEnabled={false}
                                showsScale={false}
                                initialRegion={{latitude:data.latitude,
                                                longitude:data.longitude,
                                                latitudeDelta:0.15,
                                                longitudeDelta:0.0421}}
                            >
                                { Platform.OS != 'web' &&<Marker coordinate={{ latitude:data.latitude, longitude:data.longitude }} >
                                    <View style={{width:16,height:16,backgroundColor:'#0A8ED955'}}>

                                    </View>
                                    {/* <Image source={require('../../../assets/icons/maker_custom.png')} style={{width: 39, height: 84 }} resizeMode="contain"></Image> */}
                                </Marker>}
                            </MapView>
                        </View>
                    </View>
                    </View>
                </ScrollView>

                
            </View>
        </View>
    );
};

export default ShowDetailScreen;

const styles = StyleSheet.create({
    homeTitleText2:{fontSize:16,fontWeight:'300',color:'#ACB7C2',marginRight:10},
    homeTitleText1:{fontSize:12,fontWeight:'300',color:'#000000',margin:8},



    container: {
        flex: 1,
        backgroundColor:'white'
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
