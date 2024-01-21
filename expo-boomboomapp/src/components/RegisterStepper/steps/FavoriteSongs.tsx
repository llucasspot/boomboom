import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { ProfileApiServiceI } from "../../../api/ProfileApiService/ProfileApiServiceI";
import {
  SpotifyApiServiceI,
  Track,
} from "../../../api/SpotifyApiService/SpotifyApiServiceI";
import useEStyles from "../../../hooks/useEStyles";
import {
  RegisterStackParamsList,
  RegisterStackScreen,
} from "../../../navigation/RegisterStackScreenNavigator/RegisterStack";
import { useCoreStyles } from "../../../services/StyleService/styles";
import UserService from "../../../services/UserService/UserService";
import { UserStateConnected } from "../../../services/UserService/userServiceI";
import ServiceInterface from "../../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../../tsyringe/diUtils";
import { BaseButton } from "../../Buttons/BaseButton";
import { SongCard } from "../../SongCard";
import { SongPicker } from "../../SongPicker";
import { StepProps } from "../RegisterStepper";

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
  const spotifyApiService = getGlobalInstance<SpotifyApiServiceI>(
    ServiceInterface.SpotifyApiServiceI,
  );
  const [mySongs, setMySongs] = useState<Track[]>([]);
  const { data: top5Tracks } = useQuery({
    queryKey: [spotifyApiService.fetchTop5Tracks.name],
    queryFn: () => spotifyApiService.fetchTop5Tracks(),
  });

  useEffect(() => {
    if (top5Tracks) {
      setMySongs(top5Tracks);
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

  setStepperLayoutCallback(async () => {
    try {
      await profileApiService.uploadAvatar(user.profilePicture.uri as string);
      await profileApiService.createProfile({
        dateOfBirth: user.dateOfBirth,
        description: user.description,
        preferedGenderId: user.gender,
        trackIds: mySongs.map((song) => song.trackId),
        name: user.fullName,
      });
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
                key={song.trackId}
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
