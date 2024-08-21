import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GetFavList, UpdateFav } from "@/shared/shared";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFav({
  id,
  color = "black",
}: {
  id: string;
  color?: string;
}) {
  const { user } = useUser();
  const [favList, setFavList] = useState<string[]>([]);

  useEffect(() => {
    user && GetFav();
  }, [user]);

  const GetFav = async () => {
    const result = await GetFavList(user);
    result && setFavList(result?.favourites ? result?.favourites : []);
  };

  const AddToFav = async () => {
    const favResult = favList;
    favResult.push(id);
    await UpdateFav(user, favResult);
    GetFav();
  };

  const RemoveFromFav = async () => {
    const favResult = favList.filter((item) => item != id);
    await UpdateFav(user, favResult);
    GetFav();
  };

  return (
    <View>
      {favList?.includes(id) ? (
        <Pressable onPress={() => RemoveFromFav()}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={() => AddToFav()}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
}
