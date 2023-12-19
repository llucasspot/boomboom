import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import boomboomText from '../src/assets/logo_text.svg';
import {router} from "expo-router";
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import AuthService from "../src/services/AuthService/AuthService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import ErrorService from "../src/services/ErrorService/ErrorService";
import ConfigurationService from "../src/services/ConfigurationService/ConfigurationService";
import useEStyles from "../src/hooks/useEStyles";
import {RootStackScreen} from "../src/navigation/RootStackScreenNavigator/RootStack";
import {SvgXml} from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context'
import UserService from "../src/services/UserService/UserService";

type SplashScreenProps = {}

export default function SplashScreen({}: SplashScreenProps): JSX.Element {
    const authService = getGlobalInstance<AuthService>(
        ServiceInterface.AuthService,
    );
    const errorService = getGlobalInstance<ErrorService>(
        ServiceInterface.ErrorService,
    );
    const configurationService = getGlobalInstance<ConfigurationService>(
        ServiceInterface.ConfigurationService,
    );
    const userService = getGlobalInstance<UserService>(
        ServiceInterface.UserService,
    );
    const user = userService.useUser()

    const styles = useEStyles({
        mainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '$primaryColor',
        },
        content: {
            color: '$backgroundColor',
            fontSize: 50,
            fontWeight: 'bold',
        },
        background: {
            ...(StyleSheet.absoluteFill as object),
            height: '100%',
            width: '100%',
        },
    });
    useEffect(() => {
        authService.isUserConnected()
            .then((isUserConnected) => {
                if (
                    isUserConnected ||
                    configurationService.byPassSignInScreen()
                ) {
                    setTimeout(() => {
                        router.replace(`/${RootStackScreen.LOGIN_SUCCESSFUL}`);
                    }, 2000);
                    return;
                }
                setTimeout(() => {
                    router.replace(`/${RootStackScreen.AUTH_HOME}`);
                }, 2000);
            })
            // TODO handle catch better
            .catch(err => console.log("SplashScreen : ", err));
    }, [user]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <SvgXml height={32} xml={boomboomText}/>
        </SafeAreaView>
    );
};
