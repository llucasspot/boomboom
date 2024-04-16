import { SerializedTrack } from "@boumboum/swagger-backend";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { IconName } from "#components/buttons/IconName";
import { ThemedButton } from "#components/buttons/ThemedButton";
import { BaseText } from "#components/texts/BaseText";
import { SpotifyTracksApiServiceI } from "#modules/api/services/SpotifyApi/spotify-tracks-api.serviceI";
import { diService } from "#modules/core/di/di-utils";
import { LanguageService } from "#modules/core/language/language.service";
import { LoggerService } from "#modules/core/logger/logger.service";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";
import song from "#modules/registration/assets/PickSong/song.png";
import { SongCard } from "#modules/registration/components/song/SongCard";

export type SongPickerProps = {
  mySongs: SerializedTrack[];
  setMySongs: Dispatch<SetStateAction<SerializedTrack[]>>;
  onBack: () => void;
  debounceTime?: number;
};

const DEFAULT_DEBOUNCE_TIME: number = 300;

const logger = LoggerService.create("SongPicker");

export function SongPicker({
  onBack,
  mySongs,
  setMySongs,
  debounceTime = DEFAULT_DEBOUNCE_TIME,
}: SongPickerProps) {
  const languageService = diService.getInstance(LanguageService);
  const I18n = languageService.useTranslation();

  // @ts-ignore
  const spotifyApi = diService.getInstance(SpotifyTracksApiServiceI);

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
        logger.debug("spotifyApiService : ", error);
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

  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;
  const styles = useAppThemeStyle((appTheme: AppTheme) =>
    createStyleSheet({
      screen: {
        flex: 1,
      },
      mainContainer: {
        flex: 1,
        paddingHorizontal: appTheme.spacers.spacer6,
      },
      view: {
        flex: 1,
        borderColor: appTheme.colors.surfaceVariant,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
      },
      searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: appTheme.spacers.spacer6,
        gap: appTheme.spacers.spacer6,
      },
      searchBarTextInput: {
        flex: 1,
        paddingVertical: appTheme.spacers.spacer3,
      },
      textInput: {
        color: appTheme.colors.onSurfaceVariant,
      },
      fetchedSongsContainer: {
        marginTop: appTheme.spacers.spacer6,
        gap: appTheme.spacers.spacer2,
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
    }),
  );

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
              style={[tagStyles.FONT_INPUT, styles.searchBarTextInput]}
            />
          </View>
          <TouchableOpacity onPress={cancel}>
            <BaseText i18nKey="common.cancel" style={tagStyles.p} />
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
                    key={song.trackId}
                    icon={() => (
                      <ThemedButton
                        icon={IconName.PLUS}
                        onPress={() => pick(song)}
                      />
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
              <BaseText
                i18nKey="register.SongPicker.chooseWisely"
                style={[tagStyles.p, { textAlign: "center" }]}
              />
            </View>
            <View style={{ flex: 1 }} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
