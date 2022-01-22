import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, Text, Animated, Easing, Pressable } from "react-native";

// import Carousel from "react-native-snap-carousel";
import Carousel from "./carosel";
// import { DATA } from "../utils";
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
    console.log("data", data)
    setRealdata(data);
    layout != 'default' ? setCarouselStyle({ sliderWidth: win.width - 25, itemWidth: win.width - 50 }) : setCarouselStyle({ sliderWidth: win.width - 40, itemWidth: win.width - 60 })
  }, [data]);

  const handleSnapToItem = (index: number) => {
    setActiveIndex(index);
  };
  // const decline = () => {
  //   alert(activeIndex);
  //   realdata.splice(activeIndex, 1);
  //   setRealdata([...realdata]);
  // }
  const decline = () => {
    setFakerstate(false);
    setTimeout(() => {
      realdata.splice(activeIndex, 1);
      setRealdata([...realdata]);
      setFakerstate(true);

    }, 500);
  };

  const renderItem = ({ item, index }: { item: CardProps; index: number }) => {

    return layout == 'default' ?
      <Card key={index} type={layout} id={item.id} image={item} title={item.title} address={item.address} bedroom={item.numBed} bathroom={item.numBath} checked={item.checked} /> : (
        <Card key={index} type={layout} id={item.id} image={item.photosUrl[0]} title={item.title} address={item.address} bedroom={item.numBed} bathroom={item.numBath} checked={item.checked} />
      );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", marginBottom: 30 }}>
      {/* <ScrollView> */}
      <View >
        {
          fakerstate ?
            <Carousel
              autoplay={layout == 'default' ? true : false}
              loop={layout == 'default' ? true : false}
              layout={layout}
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
            /> :
            <>
              <View style={styles.container}>
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
                  <Text style={{ color: 'red', fontSize: 34, fontWeight: 'bold', position: 'absolute', right: 60, top: 20 }}>NOPE</Text>
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

