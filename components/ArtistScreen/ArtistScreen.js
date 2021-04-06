import React from "react";
import { View, StyleSheet, Dimensions, Text } from 'react-native';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

function ArtistScreen({ route }) {
  const { artistId } = route.params;

  return (
    <View style={styles.containerWrapper}>
      <Text style={styles.showText}>{artistId}</Text>
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
  showText: {
    color: '#ffffff',
    fontSize: 20,
  }
});

export default ArtistScreen;