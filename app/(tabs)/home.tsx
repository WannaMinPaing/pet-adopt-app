import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PetListByCategory from "@/components/Home/PetListByCategory";
import Slider from "@/components/Home/Slider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "@/components/Home/Header";

export default function Home() {
  return (
    <SafeAreaView className="p-4">
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* PetList + Category */}
      <PetListByCategory />
      {/* List Of Pets */}
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row justify-center items-center py-[20x] bg-light_seondary mt-[20px] h-[50px] border-2 border-primary rounded-lg border-dashed	"
      >
        <MaterialIcons name="pets" size={24} color="#E8B20E" />
        <Text className="ml-[7px] font-outfitmedium text-primary text-[16px]">
          Add New Pet
        </Text>
      </TouchableOpacity>
      {/* Add New Pet Option */}
    </SafeAreaView>
  );
}
