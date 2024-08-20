import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export type PetListProps = {
  imageUrl: string;
  name: string;
  address: string;
};

export default function PetInfo(props: PetListProps) {
  return (
    <View>
      <Image
        source={{ uri: props.imageUrl }}
        className="w-full aspect-square"
      />
      <View className="p-[20px] flex-row justify-between items-center">
        <View>
          <Text className="font-outfitbold text-lg">{props.name}</Text>
          <Text className="font-outfit text-sm text-gray">{props.address}</Text>
        </View>
        <View>
          <Ionicons name="heart-outline" size={30} color="black" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 20 / 20,
  },
});
