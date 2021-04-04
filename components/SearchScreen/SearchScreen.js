import React, {useState, useEffect} from "react";
import { View, StyleSheet, FlatList, Text, TextInput, Dimensions } from 'react-native';
import AppLoading from 'expo-app-loading';
import {useFonts} from 'expo-font';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

let customFonts = {
  'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
};

function SearchScreen() {
  const [query, setQuery] = useState('');
  const [artistsList, setArtistsList] = useState([]);

  useEffect(() => {
    if (query === "") {
      return;
    }
    fetchArtists();
  },[query])

  const fetchArtists = () => {
    let artists = [];
    fetch(`https://genius.p.rapidapi.com/search?q=${query}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "27595eae91mshede4da0832066b8p162e0ajsn0420de00fe20",
        "x-rapidapi-host": "genius.p.rapidapi.com"
      }
    })
    .then(response => response.json()).then(json => {
      Array.prototype.forEach.call(json.response.hits,(el) => {
        if (artists.filter(e => e.id === el.result.primary_artist.id).length === 0) {
          artists.push({id:el.result.primary_artist.id, name:el.result.primary_artist.name});
        }
      })
      setArtistsList(artists);
    })
    .catch(err => {
      console.error(err);
    });
  }

  const ItemView = ({ item }) => {
    return (
      <Text style={styles.itemStyle}>
        {item.name}
      </Text>
    );
  };
  let [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Black': require('../../assets/fonts/Roboto-Black.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
    <View style={styles.containerWrapper}>
      <TextInput style={styles.searchInput} placeholder={'Search...'} placeholderTextColor="#ffffff" onChangeText={setQuery}/>
      <View style={styles.listWrapper}>
        <FlatList data={artistsList} renderItem={ItemView} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
    )
  }
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
  searchInput: {
    fontFamily: 'Roboto-Regular',
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 13,
    color: '#ffffff',
    width: 278,
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 29,
    fontSize: 24,
    letterSpacing: 0.03,
  },
  listWrapper: {
    paddingTop: 28,
  },
  itemStyle: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 58,
    fontFamily: 'Roboto-Black',
  },
});

export default SearchScreen;