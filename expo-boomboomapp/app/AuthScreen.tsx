import React, {useEffect, useRef} from 'react';
import {Animated, ImageStyle, Text, View} from 'react-native';
import girlBackground from '../src/assets/girl.png';
import {router} from "expo-router";
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import LanguageService from "../src/services/LanguageService/LanguageService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import useEStyles from "../src/hooks/useEStyles";
import {RootStackScreen} from "../src/navigation/RootStackScreenNavigator/RootStack";
import {Logo} from "../src/components/Logo";
import {LueurButton} from "../src/components/Buttons/LueurButton";
import {BaseButtonIconPosition} from "../src/components/Buttons/BaseButton";
import {IconName} from "../src/components/Icons/IconName";
import {SafeAreaView} from "react-native-safe-area-context";
import {LueurBackground} from "../src/components/LueurBackground";
import ConfigurationService from "../src/services/ConfigurationService/ConfigurationService";
import AuthService from "../src/services/AuthService/AuthService";

type AuthScreenProps = {}

export default function AuthScreen({}: AuthScreenProps): JSX.Element {
    const languageService = getGlobalInstance<LanguageService>(
        ServiceInterface.LanguageServiceI,
    );
    const configurationService = getGlobalInstance<ConfigurationService>(
        ServiceInterface.ConfigurationService,
    );
    const authService = getGlobalInstance<AuthService>(
        ServiceInterface.AuthService,
    );
    const I18n = languageService.useTranslation();
    const styles = useEStyles({
        mainContainer: {
            flex: 1,
            backgroundColor: '$backgroundColor'
        },
        logoContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        girlBackgroundContainer: {
            flex: 4,
            position: 'relative',
            alignItems: 'center',
        },
        girlBackground: {
            resizeMode: "contain",
            width: '100%',
            height: '100%',
        },
        logoImageText: {
            width: '3rem',
            height: '3rem',
            marginRight: '$spacer4',
        },
        contentContainer: {
            flex: 1,
            paddingHorizontal: '$spacer6',
            justifyContent: 'flex-end',
            bottom: '$spacer6',
        },
        text: {
            color: '$secondaryColor',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: '$spacer5',
        },
        button: {},
    });

    const authenticate = async () => {
        if (configurationService.isAppInMockMode()) {
            await authService.authenticateUser()
            router.replace(`/${RootStackScreen.LOGIN_SUCCESSFUL}`);
            return
        }
        router.push(`/${RootStackScreen.OAUTH_SCREEN}`);
    };

    const fadeInAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeInAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeInAnim]);

    const translateYImage = fadeInAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0]
    });

    const translateYText = fadeInAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0]
    });

    const translateYButton = fadeInAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [120, 0]
    });

    const opacity = fadeInAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.girlBackgroundContainer}>
                <Animated.Image source={girlBackground} style={{ ...styles.girlBackground, opacity, transform: [{translateY: translateYImage}] } as ImageStyle}/>
            </View>
            <LueurBackground/>
            <Animated.View style={{ ...styles.contentContainer, opacity, transform: [{translateY: translateYText}] }}>
                <Logo/>
                <Text style={styles.text}>{I18n.t('screen.SignInScreen.title')}</Text>
                <LueurButton
                    onPress={authenticate}
                    style={styles.button}
                    iconPosition={BaseButtonIconPosition.LEFT}
                    icon={IconName.SPOTIFY}
                    content={I18n.t('screen.SignInScreen.spotifySignInButtonLabel')}
                />
            </Animated.View>
        </SafeAreaView>
    );
};
