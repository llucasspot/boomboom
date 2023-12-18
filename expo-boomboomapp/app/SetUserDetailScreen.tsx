import React, {useCallback, useRef, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {router} from "expo-router";
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import LanguageService from "../src/services/LanguageService/LanguageService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import UserService from "../src/services/UserService/UserService";
import useEStyles from "../src/hooks/useEStyles";
import {Gender} from "../src/services/UserService/userServiceI";
import {RootStackScreen} from "../src/navigation/RootStackScreenNavigator/RootStack";
import {StepScreenLayout} from "../src/components/StepScreenLayout";
import {IconName} from "../src/components/Icons/IconName";
import {BaseButton, BaseButtonTheme} from "../src/components/Buttons/BaseButton";

type SetUserDetailScreenScreenProps = {}

export default function SetUserDetailScreen({}: SetUserDetailScreenScreenProps): JSX.Element {
    const languageService = getGlobalInstance<LanguageService>(
        ServiceInterface.LanguageServiceI,
    );
    const userService = getGlobalInstance<UserService>(
        ServiceInterface.UserService,
    );
    const I18n = languageService.useTranslation();
    const styles = useEStyles({
        content: {},
        title: {
            color: '$secondaryColor',
            fontSize: '1.2rem',
            fontWeight: 'bold',
        },
        genderContainer: {
            flexDirection: 'row',
        },
    });
    const fullNameTextInputRef = useRef<TextInput>();
    const dateOfBirthTextInputRef = useRef<TextInput>();
    const descriptionTextInputRef = useRef<TextInput>();
    const [selectedGender, setSelectedGender] = useState<Gender>(Gender.MALE);
    const isSelectedGender = useCallback(
        (gender: Gender) => {
            return selectedGender === gender;
        },
        [selectedGender],
    );

    const handleNextStep = async () => {
        userService.updateUserState({
            // @ts-ignore
            fullName: fullNameTextInputRef.current.value,
            // @ts-ignore
            description: descriptionTextInputRef.current.value,
            // @ts-ignore
            dateOfBirth: dateOfBirthTextInputRef.current.value,
            gender: selectedGender,
        });
        router.push(`/${RootStackScreen.THIRD_STEP}`);
    };

    return (
        <StepScreenLayout
            handleNextStep={handleNextStep}
            stepNumber={2}
            contentStyle={styles.content}>
            <Text>{I18n.t('common.fullName')}</Text>
            <TextInput
                // @ts-ignore
                ref={fullNameTextInputRef}
                // @ts-ignore
                onChangeText={e => (fullNameTextInputRef.current.value = e)}
                placeholder={'John Doe'}
            />
            <Text>{I18n.t('common.dateOfBirth')}</Text>
            <TextInput
                // @ts-ignore
                ref={dateOfBirthTextInputRef}
                // @ts-ignore
                onChangeText={e => (dateOfBirthTextInputRef.current.value = e)}
                placeholder={'MM/DD/YY'}
            />
            <Text>{I18n.t('common.gender')}</Text>
            <View style={styles.genderContainer}>
                <BaseButton
                    onPress={() => setSelectedGender(Gender.MALE)}
                    icon={IconName.MALE_GENDER}
                    color={'$secondaryColor'}
                    theme={
                        isSelectedGender(Gender.MALE)
                            ? BaseButtonTheme.CONTAINED
                            : BaseButtonTheme.OUTLINED
                    }
                />
                <BaseButton
                    onPress={() => setSelectedGender(Gender.FEMALE)}
                    icon={IconName.FEMALE_GENDER}
                    color={'$secondaryColor'}
                    theme={
                        isSelectedGender(Gender.FEMALE)
                            ? BaseButtonTheme.CONTAINED
                            : BaseButtonTheme.OUTLINED
                    }
                />
                <BaseButton
                    onPress={() => setSelectedGender(Gender.NO_SPECIFIC)}
                    icon={IconName.NO_SPECIFIC_GENDER}
                    color={'$secondaryColor'}
                    theme={
                        isSelectedGender(Gender.NO_SPECIFIC)
                            ? BaseButtonTheme.CONTAINED
                            : BaseButtonTheme.OUTLINED
                    }
                />
            </View>
            <Text>{I18n.t('common.description')}</Text>
            <TextInput
                // @ts-ignore
                ref={descriptionTextInputRef}
                // @ts-ignore
                onChangeText={e => (descriptionTextInputRef.current.value = e)}
                placeholder={I18n.t('common.description')}
            />
        </StepScreenLayout>
    );
};
