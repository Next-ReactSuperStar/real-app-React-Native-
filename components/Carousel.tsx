import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from "react-native";

// import Carousel from "react-native-snap-carousel";
import Carousel from "./carosel";
// import { DATA } from "../utils";
import { CardProps, Card } from "./Card";
const win = Dimensions.get('window');

type LayoutProps = { layout?: "default" | "stack" | "tinder" | undefined };

export const CarouselComponent = ({ layout, data }: { layout: any, data: any }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [itemid, setItemid] = useState<any>('');
  const [carouselStyle, setCarouselStyle] = useState<any>({ sliderWidth: win.width - 40, itemWidth: win.width - 60 });
  const carouselEl = useRef(null);
  useEffect(() => {
    console.log(data)
    layout != 'default' ? setCarouselStyle({ sliderWidth: win.width - 25, itemWidth: win.width - 50 }) : setCarouselStyle({ sliderWidth: win.width - 40, itemWidth: win.width - 60 })
  }, []);

  const handleSnapToItem = (index: number) => {
    console.log("Index item", index)
    setActiveIndex(index);
  };

  const renderItem = ({ item, index }: { item: CardProps; index: number }) => {
    // setItemid(item);
    return layout == 'default' ?
      <Card key={index} type={layout} id={item.id} image={item} title={item.title} address={item.address} bedroom={item.numBed} bathroom={item.numBath} checked={item.checked} /> : (
        <Card key={index} type={layout} id={item.id} image={item.photosUrl[0]} title={item.title} address={item.address} bedroom={item.numBed} bathroom={item.numBath} checked={item.checked} />
      );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", marginBottom: 30 }}>
      {/* <ScrollView> */}
      <View >
        <Carousel
          autoplay={layout == 'default' ? true : false}
          loop={true}
          layout={layout}
          ref={carouselEl}
          data={data}
          sliderWidth={carouselStyle.sliderWidth}
          itemWidth={carouselStyle.itemWidth}
          renderItem={renderItem}
          onSnapToItem={(index: number) => handleSnapToItem(index)}
          layoutCardOffset={18}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          initialNumToRender={3}
        />
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
});

