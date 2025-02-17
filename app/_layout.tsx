import { View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Slot } from 'expo-router'
import { useFonts } from 'expo-font'
import { styles } from '@/styles/global-styles'

const _layout = () => {
  const [] = useFonts({
    Mitr: require('../assets/fonts/Mitr-Regular.ttf')
  });
  return (
    <View style={styles.layout}>
      <Slot />
      <StatusBar style='light' hidden={true} backgroundColor='transparent'/>
    </View>
  )
}

export default _layout