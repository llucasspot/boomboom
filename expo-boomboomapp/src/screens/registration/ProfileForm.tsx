import {Text, TextInput, View} from "react-native";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useCoreStyles} from "../../services/StyleService/styles";
import {getGlobalInstance} from "../../tsyringe/diUtils";
import LanguageService from "../../services/LanguageService/LanguageService";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import UserService from "../../services/UserService/UserService";
import {Gender} from "../../services/UserService/userServiceI";
import {BaseButton, BaseButtonTheme} from "../../components/Buttons/BaseButton";
import {IconName} from "../../components/Icons/IconName";
import useEStyles from "../../hooks/useEStyles";
import {StepProps} from "../../components/ScreenStepperLayout";
import {router} from "expo-router";
import {RootStackScreen} from "../../navigation/RootStackScreenNavigator/RootStack";

export function ProfileForm({setStepperLayoutCallback}: StepProps) {
    const languageService = getGlobalInstance<LanguageService>(
        ServiceInterface.LanguageServiceI,
    );
    const userService = getGlobalInstance<UserService>(
        ServiceInterface.UserService,
    );
    const I18n = languageService.useTranslation();

    const coreStyles = useCoreStyles()
    const styles = useEStyles({
        selectGenderContainer: {
            flexDirection: 'row',
            paddingTop: '0.8rem',
        },
    })

    const updateRefValue = (ref: React.MutableRefObject<TextInput | undefined>) => {
        return (value: string) => {
            // TODO use lib like 'react hook form'
            // @ts-ignore
            ref.current.value = value
        }
    }

    const getValueFromRef = (ref: React.MutableRefObject<TextInput | undefined>) => {
        // TODO use lib like 'react hook form'
        // @ts-ignore
        return ref.current.value
    }

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

    setStepperLayoutCallback(() => {
        userService.updateUserState({
            fullName: getValueFromRef(fullNameTextInputRef),
            description: getValueFromRef(descriptionTextInputRef),
            dateOfBirth: getValueFromRef(dateOfBirthTextInputRef),
            gender: selectedGender,
        });
    })

    return (
        <View style={{gap: 20}}>
            <View>
                <Text style={{...coreStyles.P}}>{I18n.t('common.fullName')}</Text>
                <TextInput
                    style={{...coreStyles.INPUT_TEXT}}
                    // TODO use lib like 'react hook form'
                    // @ts-ignore
                    ref={fullNameTextInputRef}
                    onChangeText={updateRefValue(fullNameTextInputRef)}
                    placeholder={'John Doe'}
                />
            </View>
            <View>
                <Text style={{...coreStyles.P}}>{I18n.t('common.dateOfBirth')}</Text>
                <TextInput
                    style={{...coreStyles.INPUT_TEXT}}
                    // TODO use lib like 'react hook form'
                    // @ts-ignore
                    ref={dateOfBirthTextInputRef}
                    onChangeText={updateRefValue(dateOfBirthTextInputRef)}
                    placeholder={'MM/DD/YY'}
                />
            </View>
            <View>
                <Text style={{...coreStyles.P}}>{I18n.t('common.gender')}</Text>
                <View style={styles.selectGenderContainer}>
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
            </View>
            <View>
                <Text style={{...coreStyles.P}}>{I18n.t('common.description')}</Text>
                <TextInput
                    style={{...coreStyles.INPUT_TEXT}}
                    // TODO use lib like 'react hook form'
                    // @ts-ignore
                    ref={descriptionTextInputRef}
                    onChangeText={updateRefValue(descriptionTextInputRef)}
                    placeholder={I18n.t('common.description')}
                />
            </View>
        </View>
    )

}
