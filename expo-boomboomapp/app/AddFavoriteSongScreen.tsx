import React, {useEffect, useState} from 'react';
import {Image, ImageStyle, Text, View} from 'react-native';
import damso from '../src/assets/damso.png';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {router} from "expo-router";
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import UserService from "../src/services/UserService/UserService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import {SpotifyApiService} from "../src/api/SpotifyApiService";
import {ProfileApiService, Track} from "../src/api/ProfileApiService";
import useEStyles from "../src/hooks/useEStyles";
import {RootStackScreen} from "../src/navigation/RootStackScreenNavigator/RootStack";
import {StepScreenLayout} from "../src/components/StepScreenLayout";
import {IconName} from "../src/components/Icons/IconName";
import {BaseButton} from "../src/components/Buttons/BaseButton";

type AddFavoriteSongScreenProps = {}

export default function AddFavoriteSongScreen({}: AddFavoriteSongScreenProps): JSX.Element {
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
            .catch(err => console.log("AddFavoriteSongScreenProps : ", err));
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
        router.replace(`/${RootStackScreen.WELCOME_SCREEN}`);
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
