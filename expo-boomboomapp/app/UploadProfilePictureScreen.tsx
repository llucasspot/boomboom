import React from 'react';
import {Image, ImageStyle, View} from 'react-native';
import pfp from '../src/assets/pfp.png';
import * as ImagePicker from "expo-image-picker";
import {router} from "expo-router";
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import UserService from "../src/services/UserService/UserService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import useEStyles from "../src/hooks/useEStyles";
import {RootStackScreen} from "../src/navigation/RootStackScreenNavigator/RootStack";
import {StepScreenLayout} from "../src/components/StepScreenLayout";
import {IconName} from "../src/components/Icons/IconName";
import {BaseButton} from "../src/components/Buttons/BaseButton";

type UploadProfilePictureScreenProps = {}

export default function UploadProfilePictureScreen({}: UploadProfilePictureScreenProps): JSX.Element {
    const userService = getGlobalInstance<UserService>(
        ServiceInterface.UserService,
    );
    const user = userService.useUser();
    const styles = useEStyles({
        content: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        pickButton: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: '$spacer1',
        },
        editButton: {
            position: 'absolute',
            bottom: 0,
        },
        editText: {
            fontSize: '1rem',
        },
        roundedImage: {
            width: 120,
            height: 120,
            borderRadius: 60,
        },
    });

    const choosePhotoFromLibrary = (): void => {
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        })
            .then(result => {
                if (!result.canceled) {
                    const image = result.assets[0]
                    // TODO to see if we keep type & name in state
                    userService.updateUserState({
                        profilePicture: {
                            uri: image.uri,
                            type: image.type ?? "image",
                            name: image.fileName ?? ""
                        }
                    });
                }
            })
            // TODO handle catch better
            .catch(err => console.log("UploadProfilePictureScreen : ", err));
    };

    const handleNextStep = async () => {
        router.push(`/${RootStackScreen.SECOND_STEP}`);
    };

    return (
        <StepScreenLayout
            handleNextStep={handleNextStep}
            stepNumber={1}
            contentStyle={styles.content}>
            <View style={styles.pickButton}>
                <Image
                    source={user.profilePicture ? {uri: user.profilePicture.uri} : pfp}
                    style={styles.roundedImage as ImageStyle}
                />
                <BaseButton
                    onPress={choosePhotoFromLibrary}
                    style={styles.editButton}
                    textStyle={styles.editText}
                    icon={IconName.EDIT}
                    color={'$secondaryColor'}
                />
            </View>
        </StepScreenLayout>
    );
};
