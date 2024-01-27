import song from "@assets/PickSong/song.png";
import { SerializedTrack, SpotifyApiInterface } from "@swagger/api";
import { buildKey } from "@utils/keys.utils";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BaseButton } from "./Buttons/BaseButton";
import { SongCard } from "./SongCard";
import useEStyles from "../hooks/useEStyles";
import LanguageService from "../services/LanguageService/LanguageService";
import { useCoreStyles } from "../services/StyleService/styles";
import ServiceInterface from "../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../tsyringe/diUtils";
import { SpotifyApiServiceI } from "../api/SpotifyApiService/SpotifyApiServiceI";

export type SongPickerProps = {
  mySongs: SerializedTrack[];
  setMySongs: Dispatch<SetStateAction<SerializedTrack[]>>;
  onBack: () => void;
  debounceTime?: number;
};

const DEFAULT_DEBOUNCE_TIME: number = 300;

export function SongPicker({
  onBack,
  mySongs,
  setMySongs,
  debounceTime = DEFAULT_DEBOUNCE_TIME,
}: SongPickerProps) {
  const spotifyApi = getGlobalInstance<SpotifyApiServiceI>(
    ServiceInterface.SpotifyApiInterface,
  );
  const languageService = getGlobalInstance<LanguageService>(
    ServiceInterface.LanguageServiceI,
  );
  const I18n = languageService.useTranslation();
  const onSearch = (searchString?: string): void => {
    if (!searchString) {
      return;
    }
    spotifyApi
      .fetchTracksNyName(searchString)
      .then((tracks): void => {
        setFetchedSongs(tracks.data.data);
      })
      .catch((error) => {
        // TODO handle error better
        console.log("spotifyApiService : ", error);
      });
  };

  useEffect(() => {
    onSearch();
  }, []);

  const debouncedSearch = debounce(onSearch, debounceTime);

  const [fetchedSongs, setFetchedSongs] = useState<SerializedTrack[]>([]);

  function cancel() {
    onBack();
  }

  function pick(song: SerializedTrack) {
    setMySongs((old) => [...old, song]);
    onBack();
  }

  const styles = useEStyles({
    screen: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      paddingHorizontal: "$spacer6",
    },
    view: {
      flex: 1,
      borderColor: "$borderColor",
      borderBottomWidth: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    searchBarContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: "$spacer6",
      gap: "$spacer6",
    },
    searchBarTextInput: {
      flex: 1,
      paddingVertical: "$spacer3",
    },
    textInput: {
      color: "$lightGray",
    },
    fetchedSongsContainer: {
      marginTop: "$spacer6",
      gap: "$spacer2",
    },
    emptyFetchedSongsContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    imageContainer: {
      flex: 1,
      width: 200,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  const coreStyles = useCoreStyles();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.mainContainer}>
        <View style={styles.searchBarContainer}>
          <View style={styles.view}>
            <TextInput
              placeholderTextColor={(styles.textInput as TextStyle).color}
              autoFocus
              placeholder={I18n.t("screen.SongPicker.searchBarPlaceholder")}
              onChangeText={debouncedSearch}
              style={{ ...coreStyles.FONT_INPUT, ...styles.searchBarTextInput }}
            />
          </View>
          <TouchableOpacity onPress={cancel}>
            <Text style={coreStyles.P}>{I18n.t("common.cancel")}</Text>
          </TouchableOpacity>
        </View>

        {fetchedSongs.length ? (
          <ScrollView>
            <View style={styles.fetchedSongsContainer}>
              {fetchedSongs
                .filter(
                  (song) =>
                    !mySongs.find((mySong) => mySong.name === song.name),
                )
                .map((song) => (
                  <SongCard
                    song={song}
                    key={buildKey(song.trackId)}
                    icon={() => (
                      <BaseButton icon="plus" onPress={() => pick(song)} />
                    )}
                  />
                ))}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.emptyFetchedSongsContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={song}
                style={{
                  width: 301 / 2,
                  height: 300 / 2,
                  marginVertical: 5,
                  opacity: 0.5,
                }}
              />
              {/*// TODO I18N*/}
              <Text style={{ textAlign: "center", ...coreStyles.P }}>
                Your mate will love your songs. Choose wisely!
              </Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
