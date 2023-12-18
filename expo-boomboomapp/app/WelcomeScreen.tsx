import React from 'react';
import {Text, View} from 'react-native';
import {router} from "expo-router";
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import LanguageService from "../src/services/LanguageService/LanguageService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import useEStyles from "../src/hooks/useEStyles";
import {RootStackScreen} from "../src/navigation/RootStackScreenNavigator/RootStack";
import {LogoVertical} from "../src/components/LogoVertical";
import {LueurButton} from "../src/components/Buttons/LueurButton";
import { SafeAreaView } from 'react-native-safe-area-context'

type WelcomeScreenProps = {}

export default function WelcomeScreen({}: WelcomeScreenProps): JSX.Element {
    const languageService = getGlobalInstance<LanguageService>(
        ServiceInterface.LanguageServiceI,
    );
    const I18n = languageService.useTranslation();
    const styles = useEStyles({
        mainContainer: {
            flex: 1,
            backgroundColor: '$backgroundColor',
        },
        footer: {
            marginHorizontal: '$spacer6',
            marginVertical: '$spacer6',
        },
        header: {
            marginHorizontal: '$spacer6',
            marginVertical: '$spacer6',
        },
        content: {
            flex: 1,
            paddingHorizontal: '$spacer6',
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
    });

    const handleNextStep = async () => {
        router.replace(`/${RootStackScreen.HOME}`);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.header}>
                <LogoVertical/>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{I18n.t('screen.WelcomeScreen.title')}</Text>
                <Text style={styles.subtitle}>
                    {I18n.t('screen.WelcomeScreen.subtitle')}
                </Text>
            </View>
            <View style={styles.footer}>
                <LueurButton onPress={handleNextStep} content={I18n.t('common.next')}/>
            </View>
        </SafeAreaView>
    );
};
