/* eslint-disable prettier/prettier */

import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import AnimatedSectionButton from './Animated/AnimatedSectionButton';
import MainAnimationsMatchScreen from './MainAnimationsMatchScreen';



export default function MatchScreen({matchedUser, onClose}) {

    return (
        <View style={styles.container}>

            {/* <View style={styles.topScreen}>
                <TopMatchScreen />
            </View> */}

            <View style={styles.matchAnimationSection}>
                <MainAnimationsMatchScreen matchedUser={matchedUser} />
            </View>
            
            <AnimatedSectionButton onClose={onClose} />

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
})