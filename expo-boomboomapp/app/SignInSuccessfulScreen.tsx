import React, {useEffect, useRef} from 'react';
import {Animated, ImageStyle, Text, View} from 'react-native';
import {router} from "expo-router";
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import LanguageService from "../src/services/LanguageService/LanguageService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import useEStyles from "../src/hooks/useEStyles";
import {RootStackScreen} from "../src/navigation/RootStackScreenNavigator/RootStack";
import {LueurButton} from "../src/components/Buttons/LueurButton";
import {SafeAreaView} from "react-native-safe-area-context";
import logoWithTextLogoHorizontally from "../src/assets/logos/logo-with-text-logo-horizontally.png";
import successLogo from "../src/assets/LoggedSuccess/check.png";
import {useCoreStyles} from "../src/services/StyleService/styles";

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
            padding: '$spacer6',
        },
        footer: {},
        header: {
            alignItems: 'center'
        },
        logo: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '10rem',
            height: '2.8rem',
        },
        content: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            textAlign: 'center',
        },
        subtitle: {
            alignItems: 'center',
            marginTop: '1rem',
        },
        successLogo: {
            width: 442 / 2,
            height: 442 / 2
        },
    });
    const coreStyles = useCoreStyles()

    const logoAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(logoAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [logoAnim]);

    const translateY = logoAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 0],
    });

    const scale = logoAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.2, 1],
    });

    const handleNextStep = async () => {
        router.replace(`/${RootStackScreen.REGISTRATION_SCREEN}`);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.header}>
                <Animated.Image source={logoWithTextLogoHorizontally} style={{...styles.logo, transform: [{translateY}], opacity: logoAnim} as ImageStyle}/>
            </View>
            <View style={styles.content}>
                <Animated.Image source={successLogo} style={{...styles.successLogo, transform: [{scale}]} as ImageStyle}/>
                <Text style={{...styles.title, ...coreStyles.H2}}>{
                    I18n.t('screen.SignInSuccessfulScreen.title')}
                </Text>
                <Text style={{...styles.subtitle, ...coreStyles.P}}>
                    {I18n.t('screen.SignInSuccessfulScreen.subtitle')}
                </Text>
            </View>
            <View style={styles.footer}>
                <LueurButton onPress={handleNextStep} content={I18n.t('common.next')}/>
            </View>
        </SafeAreaView>
    );
};
