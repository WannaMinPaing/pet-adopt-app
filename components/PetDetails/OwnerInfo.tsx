import { View, Text, Image } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export type PetListProps = {
  userImage: string;
  userName: string;
};

export default function OwnerInfo(props: PetListProps) {
  return (
    <View className="mx-[20px] mt-[10px] p-[10px] flex-row justify-between px-[20px] items-center border-2 rounded-xl border-primary bg-white">
      <View className="flex-row items-center">
        <Image
          source={{ uri: props.userImage }}
          className="w-[40px] h-[40px] rounded-full mr-[10px]"
        />
        <View>
          <Text className="font-outfitmedium text-[17px]">
            {props.userName}
          </Text>
          <Text className="font-outfit text-gray">Pet Owner</Text>
        </View>
      </View>
      <FontAwesome name="send" size={24} color="#E8B20E" />
    </View>
  );
}
