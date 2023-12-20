import React from 'react';
import {View} from 'react-native';
import useEStyles from "../../src/hooks/useEStyles";

type SplashScreenProps = {}

export default function SplashScreen({}: SplashScreenProps): JSX.Element {
    const styles = useEStyles({
        mainContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '$primaryColor',
        },
    });

    return (
        <View style={styles.mainContainer}></View>
    );
};
