import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Home/header'
import Slider from '@/components/Home/slider'

export default function Home() {
  return (
    <SafeAreaView>
      {/* Header */}
        <Header />
      {/* Slider */}
        <Slider />
      {/* Category */}

      {/* List Of Pets */}

      {/* Add New Pet Option */}
    </SafeAreaView>
  )
}