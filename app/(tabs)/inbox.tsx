import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import UserItem from "@/components/Inbox/UserItem";

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState<any>([]);
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const [loader, setLoader] = useState<boolean>(false);

  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    try {
      const q = query(
        collection(db, "Chat"),
        where("userIds", "array-contains", userEmail)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserList((prevList: any) => [...prevList, doc.data()]);
      });
    } catch (error) {
      console.error("Error fetching user list: ", error);
    }
    setLoader(false);
  };

  const MapOtherUserList = () => {
    const list: any = [];
    userList.forEach((record: any) => {
      const otherUser = record.users?.filter(
        (user: any) => user?.email != userEmail
      );
      const result = {
        docId: record.id,
        ...otherUser[0],
      };
      list.push(result);
    });
    return list;
  };

  useEffect(() => {
    user && GetUserList();
  }, [user]);

  return (
    <SafeAreaView className="p-[20px]">
      <Text className="font-outfitmedium text-xl mb-4">Inbox</Text>
      <FlatList
        data={MapOtherUserList()}
        onRefresh={() => GetUserList()}
        refreshing={loader}
        renderItem={({ item, index }) => (
          <UserItem userInfo={item} key={index} />
        )}
      />
    </SafeAreaView>
  );
}
