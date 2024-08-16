import { View, Text, Image } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';

export default function Header() {

    const { user } = useUser();

    return (
        <View className='flex flex-row justify-between items-center m-3'>
            <View>
                <Text className='font-outfit text-2xl'>Welcome,</Text>
                <Text className='font-outfitmedium text-3xl'>{user?.fullName}</Text>
            </View>
            <Image source={{uri:user?.imageUrl}} className='w-[40] h-[40] rounded-full' />
        </View>
    )
}