import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { GetFavList } from "@/shared/shared";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import PetListItem from "@/components/Home/PetListItem";

export type FavPetListProps = {
  id: string;
  age: string;
  breed: string;
  category: string;
  imageUrl: string;
  name: string;
  sex?: string;
};

export default function Favourite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState<string[]>([]);
  const [favPetList, setFavPetList] = useState<FavPetListProps[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const GetFavPetIds = async () => {
    setLoader(true);
    const result = await GetFavList(user);
    setFavIds(result?.favourites);
    setLoader(false);
    GetFavPetList();
  };

  const GetFavPetList = async () => {
    setLoader(true);
    const q = query(collection(db, "Pets"), where("id", "in", favIds));
    const querySnapshot = await getDocs(q);

    setFavPetList([]);
    querySnapshot.forEach((doc) => {
      const data = doc.data() as FavPetListProps;
      setFavPetList((prevPetList) => [...prevPetList, data]);
    });
    setLoader(false);
  };

  useEffect(() => {
    user && GetFavPetIds();
  }, [user]);

  return (
    <View className="p-[20px] mt-[20px]">
      <Text className="font-outfitmedium text-xl">Favourites</Text>
      <FlatList
        data={favPetList}
        numColumns={2}
        onRefresh={GetFavPetIds}
        refreshing={loader}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem {...item} />
          </View>
        )}
      />
    </View>
  );
}
