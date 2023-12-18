import React from 'react';
import {RootStackScreen} from './RootStack';
import {getGlobalInstance} from '../../tsyringe/diUtils';
import ErrorService from '../../services/ErrorService/ErrorService';
import ServiceInterface from '../../tsyringe/ServiceInterface';
import {Stack} from "expo-router";

const RootStackScreenNavigator = (): JSX.Element => {
    const errorService = getGlobalInstance<ErrorService>(
        ServiceInterface.ErrorService,
    );

    errorService.useListenError();

    return (
        <Stack>
            <Stack.Screen name={RootStackScreen.SPLASH} options={{headerShown: false}}/>
            <Stack.Screen name={RootStackScreen.AUTH_HOME} options={{headerShown: false}}/>
            <Stack.Screen name={RootStackScreen.OAUTH_SCREEN} options={{headerShown: false}}/>
            <Stack.Screen name={RootStackScreen.WELCOME_SCREEN} options={{headerShown: false}}/>
            <Stack.Screen name={RootStackScreen.HOME} options={{headerShown: false}}/>
            <Stack.Screen name={RootStackScreen.LOGIN_SUCCESSFUL} options={{headerShown: false}}/>
            <Stack.Screen name={RootStackScreen.FIRST_STEP} options={{headerShown: false}}/>
            <Stack.Screen name={RootStackScreen.SECOND_STEP} options={{headerShown: false}}/>
            <Stack.Screen name={RootStackScreen.THIRD_STEP} options={{headerShown: false}}/>
        </Stack>
    )
};
export default RootStackScreenNavigator;
