import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import PetInfo from "@/components/PetDetails/PetInfo";
import PetSubInfo from "@/components/PetDetails/PetSubInfo";
import AboutPet from "@/components/PetDetails/AboutPet";
import OwnerInfo from "@/components/PetDetails/OwnerInfo";
import { useUser } from "@clerk/clerk-expo";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

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
  email : string;
};

export default function PetDetails() {
  const params = useLocalSearchParams();
  const navigation = useNavigation(); 
  const {user} = useUser();
  const router = useRouter();

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
    email : params.email as string
  };

  /**
   * Used to Initiate the chat between two users
   */
  const InitiateChat = async () => {
    const docId1 = user?.primaryEmailAddress?.emailAddress+'_'+pet?.email;
    const docId2 = pet?.email+'_'+user?.primaryEmailAddress?.emailAddress;

    const q = query(collection(db,'Chat'),where('id','in',[docId1,docId2]));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( doc => {
      console.log(doc.data());
      router.push({
        pathname : "/chat",
        params : {id:doc.id}
      })
    })

    if(querySnapshot.docs?.length == 0)
    {
      await setDoc(doc(db,'Chat',docId1),{
        id:docId1,
        users: [
          {
            email : user?.primaryEmailAddress?.emailAddress,
            imageUrl : user?.imageUrl,
            name : user?.fullName
          },
          {
            email : pet?.email,
            imageUrl : pet?.userImage,
            name : pet?.userName
          }
        ]
      });

      router.push({
        pathname : "/chat",
        params : {id:docId1}
      })
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View>
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
      <View className="bg-primary p-[15px] absolute bottom-0 w-full ">
        <TouchableOpacity onPress={InitiateChat}>
          <Text className="text-center text-base font-outfitmedium">
            Adopt Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
