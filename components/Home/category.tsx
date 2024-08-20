import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import images from "@/constants/images";

export type categoryListProps = {
  name: string;
  imageUrl: string;
};

export default function Category({
  getCategoryType,
}: {
  getCategoryType: (name: string) => void;
}) {
  const [categoryList, setCategoryList] = useState<categoryListProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const GetCategories = async () => {
    try {
      setCategoryList([]);
      const snapshot = await getDocs(collection(db, "Category"));

      snapshot.docs.forEach((doc, index) => {
        const data = doc.data() as categoryListProps;
        index === 0 &&
          (setSelectedCategory(data.name), getCategoryType(data.name));
        setCategoryList((prevCategoryList) => [...prevCategoryList, data]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetCategories();
  }, []);

  return (
    <View className="mt-4 font-outfitmedium">
      <Text className="text-base">Category</Text>

      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(item.name);
              getCategoryType(item.name);
            }}
            className="flex-1"
          >
            <View
              className={`bg-light_seondary items-center border-[1px] rounded-lg border-primary m-1 ${
                selectedCategory === item.name
                  ? "bg-secondary border-secondary"
                  : ""
              }`}
            >
              <Image
                source={{ uri: item.imageUrl }}
                className="w-[40px] h-[50px]"
                resizeMode="stretch"
              />
            </View>
            <Text className="text-center font-outfit">{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View className="flex-row flex-wrap justify-between">
            {[...Array(4)].map((_, index) => (
              <View
                key={index}
                className="bg-light_seondary items-center border-[1px] rounded-lg border-primary m-1"
              >
                <Image
                  source={images.categoryLoading}
                  className="w-[40px] h-[50px]"
                  resizeMode="cover"
                />
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}
