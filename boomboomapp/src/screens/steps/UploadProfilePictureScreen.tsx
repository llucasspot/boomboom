import React from 'react';
import {Image, ImageStyle, View} from 'react-native';
import {getGlobalInstance} from '../../tsyringe/diUtils';
import ServiceInterface from '../../tsyringe/ServiceInterface';
import useEStyles from '../../hooks/useEStyles';
import {
  RootStackScreen,
  RootStackScreenParamsList,
} from '../../navigation/RootStackScreenNavigator/RootStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BaseButton from '../../components/Buttons/BaseButton';
import {IconName} from '../../components/Icons/IconName';
import ImagePicker from 'react-native-image-crop-picker';
import pfp from '../../assets/pfp.png';
import UserService from '../../services/UserService/UserService';
import {StepScreenLayout} from '../../components/StepScreenLayout';

type UploadProfilePictureScreenProps = NativeStackScreenProps<
  RootStackScreenParamsList,
  RootStackScreen.FIRST_STEP
>;

export const UploadProfilePictureScreen = ({
  navigation,
}: UploadProfilePictureScreenProps): JSX.Element => {
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
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        userService.updateUserState({
          profilePicture: {
            uri: image.path,
            type: image.mime,
            name: image.path.split('/')[image.path.split('/').length - 1],
          },
        });
      })
      .catch(err => {
        //Handling cancel
        if (err.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };

  const handleNextStep = async () => {
    navigation.navigate(RootStackScreen.SECOND_STEP);
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
