import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import PetInfo from "@/components/PetDetails/PetInfo";
import PetSubInfo from "@/components/PetDetails/PetSubInfo";
import AboutPet from "@/components/PetDetails/AboutPet";
import OwnerInfo from "@/components/PetDetails/OwnerInfo";

export type PetListProps = {
  id: string;
  age: string;
  breed: string;
  category: string;
  imageUrl: string;
  name: string;
  sex?: string;
  address: string;
  about: string;
  weight: string;
  userImage: string;
  userName: string;
};

export default function PetDetails() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const pet: PetListProps = {
    id: params.id as string,
    age: params.age as string,
    breed: params.breed as string,
    category: params.category as string,
    imageUrl: params.imageUrl as string,
    name: params.name as string,
    sex: params.sex as string | undefined,
    address: params.address as string,
    about: params.about as string,
    weight: params.weight as string,
    userImage: params.userImage as string,
    userName: params.userName as string,
  };

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View className="h-screen">
      <ScrollView>
        {/* Pet Info  */}
        <PetInfo {...pet} />

        {/* Pet Properties */}
        <PetSubInfo {...pet} />
        {/* about  */}
        <AboutPet {...pet} />
        {/* owner */}
        <View className="h-[170px]">
          <OwnerInfo {...pet} />
        </View>
      </ScrollView>
      {/* Adopt me button */}
      <View className="bg-primary p-[15px] absolute bottom-0 w-full">
        <TouchableOpacity>
          <Text className="text-center text-base font-outfitmedium">
            Adopt Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
