import React from "react";
import { View, StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

function ArtistScreen() {
  return (
    <View style={styles.containerWrapper}>
      
    </View>
  )
}

const styles = StyleSheet.create({
  containerWrapper: {
    width: width,
    height: height,
    paddingVertical: 45,
    backgroundColor: '#151520',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ArtistScreen;