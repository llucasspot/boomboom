import React from 'react';
import {Image, ImageStyle, Text, View} from 'react-native';
import successLogo from '../src/assets/success.png';
import {router} from "expo-router";
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import LanguageService from "../src/services/LanguageService/LanguageService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import useEStyles from "../src/hooks/useEStyles";
import {RootStackScreen} from "../src/navigation/RootStackScreenNavigator/RootStack";
import {Logo} from "../src/components/Logo";
import {LueurButton} from "../src/components/Buttons/LueurButton";
import {SafeAreaView} from "react-native-safe-area-context";

type SignInSuccessfulProps = {}

export default function SignInSuccessfulScreen({}: SignInSuccessfulProps): JSX.Element {
    const languageService = getGlobalInstance<LanguageService>(
        ServiceInterface.LanguageServiceI,
    );
    const I18n = languageService.useTranslation();
    const styles = useEStyles({
        mainContainer: {
            flex: 1,
            backgroundColor: '$backgroundColor',
            paddingHorizontal: '$spacer6',
            paddingVertical: '$spacer6',
        },
        footer: {},
        header: {},
        content: {
            flex: 1,
            // padding: '$spacer6',
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            color: '$secondaryColor',
            fontSize: '1.2rem',
            fontWeight: 'bold',
        },
        subtitle: {
            color: '$secondaryColor',
            textAlign: 'center',
        },
        successLogo: {},
    });

    const handleNextStep = async () => {
        router.replace(`/${RootStackScreen.FIRST_STEP}`);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.header}>
                <Logo/>
            </View>
            <View style={styles.content}>
                <Image style={styles.successLogo as ImageStyle} source={successLogo}/>
                <Text style={styles.title}>
                    {I18n.t('screen.SignInSuccessfulScreen.title')}
                </Text>
                <Text style={styles.subtitle}>
                    {I18n.t('screen.SignInSuccessfulScreen.subtitle')}
                </Text>
            </View>
            <View style={styles.footer}>
                <LueurButton onPress={handleNextStep} content={I18n.t('common.next')}/>
            </View>
        </SafeAreaView>
    );
};
