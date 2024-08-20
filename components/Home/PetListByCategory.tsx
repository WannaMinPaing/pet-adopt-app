import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import PetListItem from "./PetListItem";
import Category from "./category";

export type PetListProps = {
  age: string;
  breed: string;
  category: string;
  imageUrl: string;
  name: string;
  sex?: string;
};

export default function PetListByCategory() {
  const [petList, setPetList] = useState<PetListProps[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const GetPetList = async (name: string) => {
    setLoader(true);
    setPetList([]);
    const q = query(collection(db, "Pets"), where("category", "==", name));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as PetListProps;
      setPetList((prevPetList) => [...prevPetList, data]);
    });
    setLoader(false);
  };

  return (
    <View>
      <Category getCategoryType={(name: string) => GetPetList(name)} />
      <View className="items-center w-full mt-2">
        <FlatList
          data={petList}
          horizontal={true}
          refreshing={loader}
          onRefresh={() => GetPetList("Dogs")}
          renderItem={({ item, index }) => <PetListItem {...item} />}
        />
      </View>
    </View>
  );
}
