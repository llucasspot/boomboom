/* eslint-disable prettier/prettier */

import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import TopMatchScreen from './TopMatchScreen';
import { useCoreStyles } from '../../../services/StyleService/styles';
import { CustomButton } from '../common/CustomButton';
import MainAnimationsMatchScreen from './MainAnimationsMatchScreen';



const CONTENT_PADDING = 20;

export default function MatchScreen({matchedUser, onClose}) {
    const coreStyles = useCoreStyles();

    function btnContact() {}
    return (
        <View style={styles.container}>

            {/* <View style={styles.topScreen}>
                <TopMatchScreen />
            </View> */}

            <View style={styles.matchAnimationSection}>
                <MainAnimationsMatchScreen matchedUser={matchedUser} />
            </View>

            <View style={styles.buttonsSection}>

                <CustomButton title="Contact your match" onPress={btnContact} />

                <Pressable onPress={onClose}>
                    <Text style={{ ...coreStyles.P, textDecorationLine: "underline" }}>
                        Or continue to match
                    </Text>
                </Pressable>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20
    },
    topScreen: {},
    matchAnimationSection: {
        flex: 1,
    },
    buttonsSection: {
        alignItems: "center",
        padding: CONTENT_PADDING,
        gap: 16
      }
})