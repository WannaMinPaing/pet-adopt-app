import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

type userInfo = {
  imageUrl: string;
  name: string;
  docId: string;
};

export default function UserItem({ userInfo }: { userInfo: userInfo }) {
  return (
    <Link href={"/chat?id=" + userInfo.docId}>
      <View className="my-[7px] flex flex-row gap-3 items-center">
        <Image
          source={{ uri: userInfo.imageUrl }}
          className="w-[44px] h-[44px] rounded-full"
        />
        <Text className="text-lg font-outfit">{userInfo.name}</Text>
      </View>
      <View className="border-[0.5px] border-gray"></View>
    </Link>
  );
}
