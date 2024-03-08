import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SerializedTrack, SpotifyApiInterface } from "swagger-boomboom-backend";

import { BaseButton } from "../../Buttons/BaseButton";
import { SongCard } from "../../SongCard";
import { SongPicker } from "../../SongPicker";
import { StepProps } from "../RegisterStepper";

import { ProfileApiServiceI } from "#api/ProfileApiService/ProfileApiServiceI";
import useEStyles from "#hooks/useEStyles";
import {
  RegisterStackParamsList,
  RegisterStackScreen,
} from "#navigation/RegisterStackScreenNavigator/RegisterStack";
import { useCoreStyles } from "#services/StyleService/styles";
import UserService from "#services/UserService/UserService";
import { UserStateConnected } from "#services/UserService/userServiceI";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { getGlobalInstance } from "#tsyringe/diUtils";
import { buildKey } from "#utils/keys.utils";

export default function FavoriteSongs({
  setStepperLayoutCallback,
  setDisableSubmit,
  navigation,
}: StepProps<RegisterStackParamsList>) {
  const userService = getGlobalInstance<UserService>(
    ServiceInterface.UserService,
  );
  const profileApiService = getGlobalInstance<ProfileApiServiceI>(
    ServiceInterface.ProfileApiServiceI,
  );
  const spotifyApi = getGlobalInstance<SpotifyApiInterface>(
    ServiceInterface.SpotifyApiInterface,
  );
  const [mySongs, setMySongs] = useState<SerializedTrack[]>([]);
  const { data: top5Tracks } = useQuery({
    queryKey: [spotifyApi.apiSpotifyTopFiveTracksGet.name],
    queryFn: () => spotifyApi.apiSpotifyTopFiveTracksGet(),
  });

  useEffect(() => {
    if (top5Tracks) {
      setMySongs(top5Tracks.data);
    }
  }, [top5Tracks]);

  const [pickSongModalVisible, setPickSongModalVisible] = useState(false);

  const maxSongsReached = mySongs.length >= 5;

  const coreStyles = useCoreStyles();
  const styles = useEStyles({
    touchableOpacity: {
      borderColor: "$borderColor",
      borderBottomWidth: 1,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      opacity: maxSongsReached ? 0.3 : 1,
    },
  });

  // @ts-ignore TODO useUser
  const user: UserStateConnected = userService.useUser();

  function searchSong() {
    setPickSongModalVisible(true);
  }

  function removeSong(title: string) {
    setMySongs(mySongs.filter((song) => song.name !== title));
  }

  function formatDate(date: Date): string {
    // Padding function to ensure day and month are always two digits
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    return `${year}-${month}-${day}`;
  }

  setStepperLayoutCallback(async () => {
    try {
      await profileApiService.createProfile({
        dateOfBirth: formatDate(user.dateOfBirth),
        description: user.description,
        preferedGenderId: user.preferedGenderId,
        genderId: user.genderId,
        trackIds: mySongs.map((song) => song.trackId),
        name: user.fullName,
      });
      await profileApiService.uploadAvatarByUri(
        user.profilePicture.uri as string,
      );
      navigation.navigate(RegisterStackScreen.WELCOME_SCREEN);
    } catch (err) {
      // TODO handle error better
      console.log("FavoriteSongs : ", err);
    }
  });

  useEffect(() => {
    setDisableSubmit(true);
  }, []);

  useEffect(() => {
    if (mySongs.length === 5) {
      setDisableSubmit(false);
    }
  }, [mySongs]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={pickSongModalVisible}
        onRequestClose={() => setPickSongModalVisible(false)}
      >
        <SongPicker
          mySongs={mySongs}
          setMySongs={setMySongs}
          onBack={() => setPickSongModalVisible(false)}
        />
      </Modal>
      <View
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity
          disabled={maxSongsReached}
          onPress={searchSong}
          style={styles.touchableOpacity}
        >
          <Text
            // TODO add I18n
            style={{ flex: 1, ...coreStyles.FONT_INPUT }}
          >
            {!maxSongsReached
              ? "Add a new song..."
              : "Remove a song before adding a new one"}
          </Text>
          <BaseButton color="$primaryColor" icon="magnify" />
        </TouchableOpacity>

        <ScrollView style={{ marginTop: 15 }}>
          <View style={{ marginTop: 5, gap: 8 }}>
            {mySongs.map((song) => (
              <SongCard
                song={song}
                key={buildKey(song.trackId)}
                icon={() => (
                  <BaseButton
                    color="$primaryColor"
                    icon="check"
                    onPress={() => removeSong(song.name)}
                  />
                )}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
