import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
export default function Profile() {

  const Menu = [
    {
      id:1,
      name:'Add New Pet',
      icon : 'add-circle',
      path : '/add-new-pet'
    },
    {
      id:2,
      name:'My Post',
      icon : 'bookmark',
      path : 'user-post'
    },
    {
      id:3,
      name:'Favourites',
      icon : 'heart',
      path : '/(tabs)/favourite'
    },
    {
      id:4,
      name:'Inbox',
      icon : 'chatbubble',
      path : '/(tabs)/inbox'
    },
    {
      id:5,
      name:'Logout',
      icon : 'exit',
      path : 'logout'
    }
  ];

  const {user} = useUser();
  const {signOut} = useAuth();
  const onPressMenu = (menu : string ) => {
    if(menu == 'logout'){
      signOut();
      return ;
    }
    router.push(menu)
  }

  return (
    <SafeAreaView className='p-[20px] bg-white h-full'>
      <StatusBar backgroundColor="#e3d29d" />
      <Text className='font-outfitmedium text-2xl'>Profile</Text>
      <View className='items-center my-[25px]'>
        <Image source={{uri:user?.imageUrl}} className='w-[100px] h-[100px] rounded-full' />
        <Text className='font-outfitbold text-lg mt-[16px]'>{user?.fullName}</Text>
        <Text className='font-outfit text-base text-gray'>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>
      <Text className='mt-[20px]'></Text>
      <FlatList 
        data={Menu}
        renderItem={({item,index})=>(
          <TouchableOpacity onPress={()=>onPressMenu(item.path)}  key={index} className='p-[10px] bg-light_seondary rounded-lg my-[7px] flex flex-row items-center'>
            <Ionicons name={item?.icon} size={30} color="#E8B20E"  />
            <Text className='pl-[5px] font-outfit text-lg'>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}