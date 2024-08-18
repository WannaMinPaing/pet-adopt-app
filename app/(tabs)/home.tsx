import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Home/header'
import Slider from '@/components/Home/slider'
import PetListByCategory from '@/components/Home/pet-list-by-category'

export default function Home() {
  return (
    <SafeAreaView className='p-4'>
      {/* Header */}
        <Header />
      {/* Slider */}
        <Slider />
      {/* PetList + Category */}
        <PetListByCategory />
      {/* List Of Pets */}

      {/* Add New Pet Option */}
    </SafeAreaView>
  )
}