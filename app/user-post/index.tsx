import { View, Text, FlatList, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import PetListItem from '@/components/Home/PetListItem';
import { styled } from 'nativewind';

export default function UserPost() {

    const navigation = useNavigation();
    const {user} = useUser();
    const [userPostList,setUserPostList] = useState<any>([]);
    const [loader,setLoader] = useState<boolean>(false);

    const GetUserPost =async () => {
        setLoader(true);
        setUserPostList([]);
        const q = query(collection(db,"Pets"),where('email','==',user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setUserPostList((prev : any) => [...prev,doc.data()])
        });
        setLoader(false);
    }


    const OnDeletePost = (docId:string) => {
        Alert.alert('Do you want to Delete?','Do you really want to delete this post',[
            {
                text : "Cancel",
                onPress: ()=> console.log("Cancel Click"),
                style : 'cancel'
            },
            {
                text : "Delete",
                onPress: ()=> deletePost(docId),
            }
    ])}

    const deletePost = async (docId:string) => {
        await deleteDoc(doc(db,"Pets",docId));
        GetUserPost();
    }   

    useEffect(()=>{
        navigation.setOptions({
            headerTitle : 'User Post'
        });
        user && GetUserPost();
    },[user])

    return (
        <View className='p-[20px]'>
            <Text className='font-outfitmedium text-3xl'>UserPost</Text>

            <FlatList 
                data={userPostList}
                numColumns={2}
                refreshing={loader}
                onRefresh={()=>GetUserPost()}
                renderItem={({item,index})=>(
                    <View>
                        <PetListItem {...item} key={index} />
                        <Pressable onPress={()=>OnDeletePost(item.id)} className='bg-light_seondary p-[5px] rounded-lg mt-[5px] mr-[12px]'>
                            <Text className='font-outfit text-center'>Delete</Text>
                        </Pressable>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text>No Post Found</Text>
                )}
                />
        </View>
    )
}