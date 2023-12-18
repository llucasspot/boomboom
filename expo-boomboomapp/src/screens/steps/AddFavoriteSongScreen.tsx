import React, {useEffect, useState} from 'react';
import {getGlobalInstance} from '../../tsyringe/diUtils';
import ServiceInterface from '../../tsyringe/ServiceInterface';
import useEStyles from '../../hooks/useEStyles';
import {
  RootStackScreen,
  RootStackScreenParamsList,
} from '../../navigation/RootStackScreenNavigator/RootStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StepScreenLayout} from '../../components/StepScreenLayout';
import {SpotifyApiService, Track} from '../../api/SpotifyApiService';
import {Image, ImageStyle, Text, View} from 'react-native';
import damso from '../../assets/damso.png';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import BaseButton from '../../components/Buttons/BaseButton';
import {IconName} from '../../components/Icons/IconName';
import {ProfileApiService} from '../../api/ProfileApiService';
import UserService from '../../services/UserService/UserService';

type AddFavoriteSongScreenProps = NativeStackScreenProps<
  RootStackScreenParamsList,
  RootStackScreen.THIRD_STEP
>;

export const AddFavoriteSongScreen = ({
  navigation,
}: AddFavoriteSongScreenProps): JSX.Element => {
  const userService = getGlobalInstance<UserService>(
    ServiceInterface.UserService,
  );
  const spotifyApiService = getGlobalInstance<SpotifyApiService>(
    ServiceInterface.SpotifyApiService,
  );
  const profileApiService = getGlobalInstance<ProfileApiService>(
    ServiceInterface.ProfileApiService,
  );
  const styles = useEStyles({
    content: {},
    title: {
      color: '$secondaryColor',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    trackItem: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2, // Width of the border
      borderColor: 'black',
      borderRadius: '$smallBorderRadius',
      padding: '$spacer2',
      marginVertical: '$spacer1',
    },
    trackItemImage: {
      borderRadius: '$smallBorderRadius',
    },
    trackCheckButton: {
      fontSize: '0.7rem',
    },
    trackName: {
      flex: 1,
      paddingHorizontal: '$spacer2',
    },
  });
  const user = userService.useUser();
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    spotifyApiService
      .fetchTop5Tracks()
      .then(_tracks => {
        setTracks(_tracks);
      })
      // TODO handle catch better
      .catch(console.log);
  }, []);

  const handleNextStep = async () => {
    const trackIds = tracks.map(track => track.trackId);
    userService.updateUserState({
      trackIds,
    });
    const {description, dateOfBirth, gender, fullName} = user;
    if (!(description && dateOfBirth && gender && fullName)) {
      // TODO HANDLE BETTER FORMS with libs like 'react hook form'
      console.log("TODO HANDLE BETTER FORMS with libs like 'react hook form'");
      return;
    }
    await profileApiService.createProfile({
      dateOfBirth,
      description,
      preferedGenderId: gender,
      trackIds,
    });
    navigation.reset({
      index: 0,
      routes: [{name: RootStackScreen.WELCOME_SCREEN}],
    });
  };

  return (
    <StepScreenLayout
      handleNextStep={handleNextStep}
      stepNumber={2}
      contentStyle={styles.content}>
      {tracks.map(track => {
        return (
          <View key={track.trackId} style={styles.trackItem}>
            <Image
              source={(track.image as ImageSourcePropType) ?? damso}
              style={styles.trackItemImage as ImageStyle}
            />
            <Text style={styles.trackName}>{track.name}</Text>
            <BaseButton
              textStyle={styles.trackCheckButton}
              icon={IconName.CHECK}
            />
          </View>
        );
      })}
    </StepScreenLayout>
  );
};
