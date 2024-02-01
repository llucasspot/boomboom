/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Animated, { Easing, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';

import { DELAY_ROTATION_AVATAR, DURATION_FULL_ROTATION_AVATAR } from '../constants/constants';



export default function AnimatedAvatar({avatar, reversed}) {
    const avatarRotationZ = useSharedValue("0deg")
    console.log(DELAY_ROTATION_AVATAR);

    useEffect(() => {
        avatarRotationZ.value = withDelay(DELAY_ROTATION_AVATAR, 
            withRepeat(
                withTiming("360deg", {
                    duration: DURATION_FULL_ROTATION_AVATAR,
                    easing: Easing.inOut(Easing.linear),
                }), -1
            )
        ) 
    }, [])

    return (
        <Animated.View style={[
            styles.avatarSection,
            {transform: [{rotateZ: avatarRotationZ}, {scaleX: reversed ? -1 : 1}]}
        ]}>
            <Image
            source={avatar}
            style={{width: '100%', height: '100%', borderRadius: 100}}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    avatarSection: {
        position: 'absolute',
        width: 75,
        aspectRatio: 1/1,
    }
})