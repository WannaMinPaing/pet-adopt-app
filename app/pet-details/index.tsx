import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import PetInfo from "@/components/PetDetails/PetInfo";
import PetSubInfo from "@/components/PetDetails/PetSubInfo";

export type PetListProps = {
  age: string;
  breed: string;
  category: string;
  imageUrl: string;
  name: string;
  sex?: string;
  address: string;
  about: string;
  weight: string;
};

export default function PetDetails() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const pet: PetListProps = {
    age: params.age as string,
    breed: params.breed as string,
    category: params.category as string,
    imageUrl: params.imageUrl as string,
    name: params.name as string,
    sex: params.sex as string | undefined,
    address: params.address as string,
    about: params.about as string,
    weight: params.weight as string,
  };

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View className="h-screen">
      {/* Pet Info  */}
      <PetInfo {...pet} />
      {/* Pet Properties */}
      <PetSubInfo {...pet} />
      {/* about  */}

      {/* owner */}

      {/* Adopt me button */}
    </View>
  );
}
