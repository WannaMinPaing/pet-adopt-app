import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export type PetListProps = {
  age: string;
  breed: string;
  category: string;
  imageUrl: string;
  name: string;
  sex?: string;
};

export default function PetListItem(props: PetListProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: props,
        })
      }
      activeOpacity={0.7}
      className="p-[10px] mr-[15px] bg-white rounded-lg"
    >
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
    </TouchableOpacity>
  );
}
