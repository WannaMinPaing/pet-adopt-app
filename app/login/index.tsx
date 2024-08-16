import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import images from "../../constants/images";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen() {
  return (
    <View className="h-full bg-white">
      <StatusBar backgroundColor="#e3d29d" />
      <Image
        source={images.login}
        className="w-full h-1/2"
        resizeMode="cover"
      />
      <View className="h-1/2 px-10">
        <View className="h-1/2">
          <Text className="text-2xl px-3 mt-6 font-outfitbold text-center">
            Ready to Make a new friend?
          </Text>
          <Text className="mt-4 text-center text-base font-outfit text-gray">
            Let's adopt the pet which you like and make there life happy again.
          </Text>
        </View>
        <View className="h-1/2 flex-1 justify-start items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            className="p-4 bg-primary w-full rounded-lg items-center"
          >
            <Text className="text-center font-outfitbold">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
