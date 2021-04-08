import { LinearGradient } from "expo-linear-gradient";
import React, {useState, useEffect, useRef} from "react";
import { View, StyleSheet, Dimensions, Text, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from '@expo/vector-icons'; 

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const halfHeight = Dimensions.get("window").height/2;

function SongScreen({ route }) {
  const { songId } = route.params;
  const [songTitle, setSongTitle] = useState("");
  const [songImage, setSongImage] = useState("");
  const [songArtist, setSongArtist] = useState("");

  const fetchSong = () => {
    let songs = [];
    fetch(`https://genius.p.rapidapi.com/songs/${songId}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "27595eae91mshede4da0832066b8p162e0ajsn0420de00fe20",
        "x-rapidapi-host": "genius.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(json => {
      setSongTitle(json.response.song.full_title);
      setSongImage(json.response.song.header_image_url);
      setSongArtist(json.response.song.primary_artist.name);
    })
    .catch(err => {
      console.error(err);
    });
  }
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      fetchSong();
      return;
    }
  })

  return (
    <View style={styles.containerWrapper}>
    <ImageBackground source={{uri:songImage}} style={styles.backgroundImg}>
      <LinearGradient colors={['rgba(26, 23, 32, 0.77)', '#1A1720', '#1A1720']} style={styles.backgroundGradient}>
        <View style={styles.headerBox}>
          <Image source={{uri:songImage}} style={styles.songImage}/>
          <Text style={styles.songTitle}>{songTitle}</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <Text style={styles.artistName}>singiel by {songArtist}</Text>
        </View>
        <View style={styles.wrapperBox}>
          <Text style={styles.downloadText}>Download</Text>
          <View style={styles.downloadCheckbox}></View>
        </View>
        <View style={styles.wrapperBox}>
          <View style={styles.currentSongPlayer}>
            <Text style={styles.currentSongTitle}>{songTitle}</Text>
            <View style={styles.currentSongInfo}>
              <Text style={styles.currentsongExplicit}>Explicit</Text>
              <Text style={styles.currentsongArtist}>{songArtist}</Text>
            </View>
          </View>
          <Entypo name="dots-three-vertical" size={19} color="#757575" />
        </View>
      </LinearGradient>
    </ImageBackground>
  </View>
  )
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#151520',
  },
  backgroundImg: {
    left: 0,
    right: 0,
    top: 0,
    height: halfHeight,
    resizeMode: 'cover'
  },
  backgroundGradient: {
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  headerBox: {
    height: halfHeight,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  songTitle: {    
    letterSpacing: 2,
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 33,
    textAlign: 'center',
  },
  songImage: {
    width: 166,
    height: 166,
  },
  saveButton: {
    width: 82,
    height: 23,
    fontSize: 12,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 14,
  },
  saveButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  artistName: {
    textTransform: 'uppercase',
    fontSize: 14,
    color: '#9CA5AF',
    paddingVertical: 18,
  },
  wrapperBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  downloadText: {
    fontSize: 16,
    color: '#ffffff',
  },
  downloadCheckbox: {
    backgroundColor: '#454545',
    width: 39,
    height: 17,
    borderRadius: 12,
  },
  currentSongTitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  currentSongInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  currentsongExplicit: {
    backgroundColor: '#636363',
    color: '#1A1720',
    fontSize: 9,
    borderRadius: 3,
    textTransform: 'uppercase',
    width: 51,
    height: 13,
    textAlign: 'center',
  },
  currentsongArtist: {
    marginLeft: 10,
    fontSize: 12,
    color: '#636363',
  },
});

export default SongScreen;