import * as React from 'react';
import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import StackNavigator from './StackNavigator';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

function App() {

  let [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'Abhaya-Libre': require('./assets/fonts/AbhayaLibre-ExtraBold.ttf'),
    'ABeeZee-Italic': require('./assets/fonts/ABeeZee-Italic.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <StackNavigator/>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
});

export default App;