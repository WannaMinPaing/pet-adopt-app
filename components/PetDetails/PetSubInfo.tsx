import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import PetSubInfoCard from "./PetSubInfoCard";

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

export default function PetSubInfo(props: PetListProps) {
  return (
    <View className="p-[20px]">
      <View className="flex-row">
        <PetSubInfoCard
          title="Age"
          value={props.age + " Years"}
          icon={images.calendar}
        />
        <PetSubInfoCard title="Breed" value={props.breed} icon={images.bone} />
      </View>
      <View className="flex-row">
        <PetSubInfoCard
          title="Sex"
          value={props?.sex ?? "-"}
          icon={images.sex}
        />
        <PetSubInfoCard
          title="Weight"
          value={props.weight + " Kg"}
          icon={images.weight}
        />
      </View>
    </View>
  );
}
