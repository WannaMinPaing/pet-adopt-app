import { View, FlatList, Image,Dimensions, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import images from '@/constants/images';

export default function Slider() {

  const [sliderList, setSliderList] = useState<any[]>([]);

  const GetSlider = async () => {
    try {
      setSliderList([]);
      const snapshot = await getDocs(collection(db, 'Slider'));
      const newSliderList = snapshot.docs.map(doc => doc.data());
      setSliderList(prevSliderList => [...(prevSliderList || []), ...newSliderList]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetSlider();
  }, []);

  return (
    <View className='w-15/16'> 
      <FlatList 
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
              <Image
                source={{ uri: item.imageUrl }}
                style = {styles?.sliderImage}
                resizeMode='stretch'
              /> 
          </View>
        )}
        ListEmptyComponent={() => (
          <View>
            <Image
              source={images.bannerLoading}
              style = {styles?.sliderImage}
              resizeMode='stretch'
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage : {
    width : Dimensions.get('screen').width*0.9,
    height : 160,
    borderRadius : 15,
    marginRight : 4
  }
})