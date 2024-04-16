import { SerializedTrack } from "@boumboum/swagger-backend";
import { useEffect, useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";

import { IconName } from "#components/buttons/IconName";
import { ThemedButton } from "#components/buttons/ThemedButton";
import { BaseText } from "#components/texts/BaseText";
import { MeProfileApiServiceI } from "#modules/api/services/ProfileApi/me-profile-api.serviceI";
import { SpotifyTracksApiServiceI } from "#modules/api/services/SpotifyApi/spotify-tracks-api.serviceI";
import { diService } from "#modules/core/di/di-utils";
import { LoggerService } from "#modules/core/logger/logger.service";
import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";
import { RegisterStackScreen } from "#modules/registration/Register.stack";
import { StepProps } from "#modules/registration/components/RegisterStepper";
import { SongCard } from "#modules/registration/components/song/SongCard";
import { SongPicker } from "#modules/registration/components/song/SongPicker";
import { RegistrationStateManager } from "#modules/registration/services/RegistrationState.manager";

const logger = LoggerService.create("FavoriteSongs");

export function FavoriteSongs({
  setStepperLayoutCallback,
  rootNavigation,
  stateManager,
}: StepProps) {
  const registrationStateService = diService.getInstance(
    RegistrationStateManager,
  );
  // @ts-ignore interface
  const profileApiService = diService.getInstance(MeProfileApiServiceI);
  const { mutate: createProfile } = profileApiService.useCreateProfile();
  const spotifyTracksApiService = diService.getInstance(
    // @ts-ignore interface
    SpotifyTracksApiServiceI,
  );
  const [mySongs, setMySongs] = useState<SerializedTrack[]>([]);
  const { data: top5Tracks } =
    spotifyTracksApiService.useSpotifyUserTopFiveTracks();

  useEffect(() => {
    if (top5Tracks) {
      setMySongs(top5Tracks.data.data);
    }
  }, [top5Tracks]);

  const [pickSongModalVisible, setPickSongModalVisible] = useState(false);

  const maxSongsReached = mySongs.length >= 5;

  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;
  const styles = useAppThemeStyle((appTheme: AppTheme) =>
    createStyleSheet({
      touchableOpacity: {
        borderColor: appTheme.colors.onSurfaceVariant,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        opacity: maxSongsReached ? 0.3 : 1,
      },
    }),
  );

  const registrationState = registrationStateService.useRegistrationState();

  function searchSong() {
    setPickSongModalVisible(true);
  }

  function removeSong(title?: string) {
    if (!title) {
      return;
    }
    setMySongs(mySongs.filter((song) => song.name !== title));
  }

  setStepperLayoutCallback(async () => {
    try {
      createProfile({
        name: registrationState.fullName!,
        dateOfBirth: registrationState.dateOfBirth!,
        description: registrationState.description!,
        gender: registrationState.gender!,
        gendersToShow: registrationState.gendersToShow!,
        trackIds: mySongs.map((song) => song.trackId!),
      });
      await profileApiService.uploadAvatarByUri(
        registrationState.profilePictureUri as string,
      );
      rootNavigation.navigate(RegisterStackScreen.WELCOME_SCREEN);
    } catch (err) {
      // TODO handle error better
      logger.debug("FavoriteSongs : ", err);
    }
  });

  useEffect(() => {
    stateManager.updateStepperState({ isSubmitDisabled: true });
  }, []);

  useEffect(() => {
    if (mySongs.length === 5) {
      stateManager.updateStepperState({ isSubmitDisabled: false });
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
          <BaseText
            i18nKey={
              !maxSongsReached
                ? "register.FavoriteSongs.addSong"
                : "register.FavoriteSongs.removeSong"
            }
            style={[tagStyles.INPUT_TEXT, { flex: 1 }]}
          />
          <ThemedButton colorName="primary" icon={IconName.SEARCH} />
        </TouchableOpacity>

        <ScrollView style={{ marginTop: 15 }}>
          <View style={{ marginTop: 5, gap: 8 }}>
            {mySongs.map((song) => (
              <SongCard
                song={song}
                key={song.trackId}
                icon={() => (
                  <ThemedButton
                    colorName="primary"
                    icon={IconName.CHECK}
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
