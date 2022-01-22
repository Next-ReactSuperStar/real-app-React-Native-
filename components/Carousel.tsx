import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from "react-native";

// import Carousel from "react-native-snap-carousel";
import Carousel from "./carosel";
import { DATA } from "../utils";
import { CardProps, Card } from "./Card";
const win = Dimensions.get('window');

type LayoutProps = { layout?: "default" | "stack" | "tinder" | undefined };

export const CarouselComponent = ({ layout }: LayoutProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [itemid, setItemid] = useState<any>('');
  const carouselEl = useRef(null);
  useEffect(() => {

  }, []);

  const handleSnapToItem = (index: number) => {
    console.log("Index item", index)
    setActiveIndex(index);
  };

  const renderItem = ({ item, index }: { item: CardProps; index: number }) => {
    setItemid(item);
    return (
      <Card key={index} id={item.id} image={item.image} title={item.title} address={item.address} bedroom={item.bedroom} bathroom={item.bathroom} checked={item.checked} />
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center",marginBottom:30 }}>
      {/* <ScrollView> */}
      <View >
        <Carousel
          autoplay={true}
          loop={true}
          layout={layout}
          ref={carouselEl}
          data={DATA}
          sliderWidth={365}
          itemWidth={320}
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

