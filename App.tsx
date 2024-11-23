import * as React from 'react';
import { View, Text, Button } from 'react-native';
import {
  StaticParamList,
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Animated from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

function HomeScreen() {
  const navigation = useNavigation();

  const gesture = Gesture.LongPress()
    .onStart(() => {
      console.log('start');
    })
    .onEnd(() => {
      console.log('end');
    });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate('Detail')}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={{ height: 100, width: 100, backgroundColor: 'red' }}
        />
      </GestureDetector>
    </View>
  );
}

function DetailScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Detail Screen</Text>
    </View>
  );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Detail: DetailScreen,
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}
