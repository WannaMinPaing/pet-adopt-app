import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";

export type PetListProps = {
  name: string;
  about: string;
};

export default function AboutPet(props: PetListProps) {
  const [readMore, setReadMore] = useState<boolean>(true);

  return (
    <View className="px-[20px] pt-[10px]">
      <Text className="font-outfitmedium text-base">About {props.name}</Text>
      <Pressable
        onPress={() => {
          setReadMore(true);
        }}
      >
        <Text
          numberOfLines={readMore ? 3 : undefined}
          className="font-outfit font-[14px]"
        >
          {props.about}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setReadMore(false);
        }}
      >
        {readMore && (
          <Text className="font-outfitmedium font-[14px] text-secondary">
            Read More
          </Text>
        )}
      </Pressable>
    </View>
  );
}
