import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, Text, Animated, Easing, Pressable } from "react-native";

import Carousel from "./carosel";
import { CardProps, Card } from "./Card";
const win = Dimensions.get('window');

type LayoutProps = { layout?: "default" | "stack" | "tinder" | undefined };

export const CarouselComponent = ({ layout, data }: { layout: any, data: any }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [realdata, setRealdata] = useState<any>(data);
  const [fakerstate, setFakerstate] = useState<boolean>(true);
  const [carouselStyle, setCarouselStyle] = useState<any>({ sliderWidth: win.width - 40, itemWidth: win.width - 60 });
  const carouselEl = useRef(null);
  useEffect(() => {
    setRealdata(data);
    layout != 'default' ? setCarouselStyle({ sliderWidth: win.width - 25, itemWidth: win.width - 50 }) : setCarouselStyle({ sliderWidth: win.width - 40, itemWidth: win.width - 60 })
  }, [data]);

  const handleSnapToItem = (index: number) => {
    console.log('real index', index);
    setActiveIndex(index);
  };

  const decline = () => {
    console.log("index", activeIndex, (realdata.length - 1))
    setFakerstate(false);
    setTimeout(() => {
      if ((realdata.length - 1) == activeIndex) {
        let cnt = realdata.length - 2;
        setActiveIndex(cnt);
        console.log("datadatadata", cnt)
      }
      realdata.splice(activeIndex, 1);
      setActiveIndex(activeIndex);
      // setRealdata([...realdata]);
      // let re_data = {
      //   id: realdata[activeIndex].listingId,
      //   checked: realdata[activeIndex].isFavorite,
      //   title: realdata[activeIndex].address,
      //   address: realdata[activeIndex].address,
      //   numBed: realdata[activeIndex].numBed,
      //   numBath: realdata[activeIndex].numBath,
      //   photosUrl: realdata[activeIndex].photoUrl
      // }
      // renderItem;
      setFakerstate(true);
    }, 50);
  };

  const renderItem = ({ item, index }: { item: CardProps; index: number }) => {
    return layout == 'default' ?
      <Card key={index} type={layout} id={item.listingId} image={item} title={item.address} address={item.address} bedroom={item.numBed} bathroom={item.numBath} checked={item.isFavorite} /> : (
        <Card key={index} type={layout} id={item.listingId} image={item.photosUrl[0]} title={item.address} address={item.address} bedroom={item.numBed} bathroom={item.numBath} checked={item.isFavorite} />
      );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", marginBottom: 30 }}>
      {/* <ScrollView> */}
      <View >
        {
          fakerstate ?
            <Carousel
              firstItem={activeIndex}
              autoplay={layout == 'default' ? true : false}
              loop={layout == 'default' ? true : false}
              layout={layout}
              enableSnap={true}
              ref={carouselEl}
              data={realdata}
              sliderWidth={carouselStyle.sliderWidth}
              itemWidth={carouselStyle.itemWidth}
              renderItem={renderItem}
              onSnapToItem={(index: number) => handleSnapToItem(index)}
              layoutCardOffset={18}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              initialNumToRender={3}
              lockScrollWhileSnapping={true}
            /> :
            <>
              <View style={[styles.container, { transform: [{ "rotate": '330deg' }] }]}>
                <View style={[styles.item, { height: win.width + 20, width: win.width - 40 }]}>
                  <Image style={[styles.image, { height: win.width - 90, width: win.width - 70 }]} source={{ uri: realdata[activeIndex].photosUrl[0] }} />
                  {
                    realdata[activeIndex].checked ? <View style={{ position: 'absolute', right: 20, bottom: 80 }}>
                      <Image style={{ width: 15, height: 15, marginRight: 5 }} source={require('../assets/icons/Favorite1(1).png')} />
                    </View>
                      : <View style={{ position: 'absolute', right: 20, bottom: 80 }}>
                        <Image style={{ width: 25, height: 25, marginRight: 5 }} source={require('../assets/icons/Favorite1(2).png')} />
                      </View>
                  }
                  <View style={{ borderColor: 'red', borderStyle: 'solid', borderWidth: 2, borderRadius: 10, paddingHorizontal: 15, margin: 25, position: 'absolute', right: 60, top: 30, transform: [{ "rotate": '35deg' }] }}>
                    <Text style={{ color: 'red', fontSize: 34, fontWeight: 'bold' }}>NOPE</Text>
                  </View>

                  <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                    <Text style={styles.homeTitleText}>{realdata[activeIndex].title}</Text>
                    <Text style={[styles.homeTitleText, { color: '#297EE4', marginTop: 4 }]}>{realdata[activeIndex].address}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 4 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 15, height: 15, marginRight: 5 }} source={require('../assets/icons/bedroom_icon.png')} />
                        <Text style={[styles.homeTitleText1, { width: 80 }]}>{realdata[activeIndex].bedroom}&nbsp;Bedroom</Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 15, height: 15, marginRight: 5 }} source={require('../assets/icons/bathroom_icon.png')} />
                        <Text style={styles.homeTitleText1}>{realdata[activeIndex].bathroom}&nbsp;Bathroom</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </>
        }

      </View>
      {layout != 'default' &&
        <View style={{ flex: 4, justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <View style={{ width: (Dimensions.get('window').height - 40) * 9 / 37, flexDirection: 'row', }}>
            <TouchableOpacity style={{ marginRight: 'auto' }} onPress={() => decline()}>
              <Image style={styles.swip_icon} source={require('../assets/icons/dislike_icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => { console.log("I like it.") }}>
              <Image style={styles.swip_icon_1} source={require('../assets/icons/like_icon.png')} />
            </TouchableOpacity>
          </View>
        </View>
      }

      <View style={{ display: 'flex', alignItems: 'center', flex: 1 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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

  image: {
    flex: 1,
    borderRadius: 20,
    width: win.width - 80,
  },

  item: {
    borderRadius: 30,
    backgroundColor: "white",
    padding: 15,
    marginVertical: 24,
    marginHorizontal: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 2,
  },

  homeTitleText: {
    fontSize: 16,
    fontWeight: '500'
  },

  homeTitleText1: {
    fontSize: 12,
    fontWeight: '300',
    color: '#000'
  },
});

