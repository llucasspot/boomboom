import React, {useEffect, useState} from 'react';
import {router} from "expo-router";
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import ConfigurationService from "../src/services/ConfigurationService/ConfigurationService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import AuthService from "../src/services/AuthService/AuthService";
import {RootStackScreen} from "../src/navigation/RootStackScreenNavigator/RootStack";
import { WebView } from 'react-native-webview';

type WebViewScreenProps = {}

export default function OauthViewScreen({}: WebViewScreenProps) {
    const [token, setToken] = useState<string | null>(null);
    const configurationService = getGlobalInstance<ConfigurationService>(
        ServiceInterface.ConfigurationService,
    );
    const authService = getGlobalInstance<AuthService>(
        ServiceInterface.AuthService,
    );

    const onNavigationStateChange = (navState: { url: string }) => {
        if (navState.url.includes('signin-success')) {
            const jwtToken = extractTokenFromUrl(navState.url);
            if (jwtToken) {
                setToken(jwtToken);
            }
        }
    };

    const extractTokenFromUrl = (url: string) => {
        const match = url.match(/userToken=([^&]+)/);
        return match ? match[1] : null;
    };

    useEffect(() => {
        if (token) {
            authService
                .setToken(token)
                .then(() => {
                    router.push(`/${RootStackScreen.SPLASH}`);
                })
                // TODO handle catch better
                .catch(err => console.log("OauthViewScreen : ", err));
        }
    }, [token]);

    return (
        <WebView
            source={{uri: `${configurationService.getApiUrl()}/signin`}}
            onNavigationStateChange={onNavigationStateChange}
            style={{flex: 1}}
        />
    );
};
