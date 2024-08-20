import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";

export type PetSubInfoCardProps = {
  title: string;
  value: string;
  icon: string | number;
};

export default function PetSubInfoCard({
  title,
  value,
  icon,
}: PetSubInfoCardProps) {
  const iconUrl = typeof icon === "string" ? { uri: icon } : icon;

  return (
    <View className="flex-row flex-1 items-center bg-white p-[10px] m-[5px] rounded-lg">
      <Image source={iconUrl} className="w-[40] h-[40] mr-[10px]" />
      <View>
        <Text className="font-outfit text-base text-gray">{title}</Text>
        <Text className="font-outfitmedium text-lg">{value}</Text>
      </View>
    </View>
  );
}
