import React from 'react';
import {Image, ImageStyle, Text, View} from 'react-native';
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

type AuthScreenProps = {}

export default function AuthScreen({}: AuthScreenProps): JSX.Element {
    const languageService = getGlobalInstance<LanguageService>(
        ServiceInterface.LanguageServiceI,
    );
    const I18n = languageService.useTranslation();
    const styles = useEStyles({
        mainContainer: {
            flex: 1,
            backgroundColor: '$backgroundColor',
        },
        logoContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        girlBackground: {
            top: 0,
        },
        logoImageText: {
            width: '3rem',
            height: '3rem',
            marginRight: '$spacer4',
        },
        contentContainer: {
            position: 'absolute',
            bottom: '$spacer6',
            right: '$spacer6',
            left: '$spacer6',
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
        router.push(`/${RootStackScreen.OAUTH_SCREEN}`);
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                style={styles.girlBackground as ImageStyle}
                source={girlBackground}
            />
            <View style={styles.contentContainer}>
                <Logo/>
                <Text style={styles.text}>{I18n.t('screen.SignInScreen.title')}</Text>
                <LueurButton
                    onPress={authenticate}
                    style={styles.button}
                    iconPosition={BaseButtonIconPosition.LEFT}
                    icon={IconName.SPOTIFY}
                    content={I18n.t('screen.SignInScreen.spotifySignInButtonLabel')}
                />
            </View>
        </SafeAreaView>
    );
};
