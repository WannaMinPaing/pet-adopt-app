import { View, Text, Image } from "react-native";
import React from "react";

export type PetListProps = {
  age: string;
  breed: string;
  category: string;
  imageUrl: string;
  name: string;
  sex?: string;
};

export default function PetListItem(props: PetListProps) {
  return (
    <View className="p-[10px] mr-[15px] bg-white rounded-lg">
      <Image
        source={{ uri: props.imageUrl }}
        className="w-[125px] h-[135px] rounded-lg"
        resizeMode="cover"
      />
      <Text className="font-outfitmedium pt-2">{props.name}</Text>
      <View className="flex-row justify-between items-center">
        <Text className="font-outfit">{props.breed}</Text>
        <Text className="font-outfit text-primary bg-light_seondary p-[3px] text-[10px] rounded-md">
          {props.age} YRS
        </Text>
      </View>
    </View>
  );
}
