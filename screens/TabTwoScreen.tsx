import {StyleSheet} from 'react-native'

import {ARScene} from './ar'

import {ViroARSceneNavigator} from '@viro-community/react-viro/components/AR/ViroARSceneNavigator'

export default function TabTwoScreen() {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: ARScene,
      }}
    />
  )
}
