/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { DELAY_FIRST_ANIMATION, DURATION_FIRST_ANIMATION } from './../constants/constants';



export default function AnimatedVinyl({children, reversed}) {
    const vinylRotationZ = useSharedValue(!reversed ? "90deg" : "-90deg")

    useEffect(() => {
        vinylRotationZ.value = withDelay(DELAY_FIRST_ANIMATION, withTiming("0deg", {duration: DURATION_FIRST_ANIMATION}))
    }, [])

    return (
        <Animated.View style={[
            styles.vinylSection,
            {transform: [{rotate: vinylRotationZ}, {scaleX: reversed ? -1 : 1}]}
        ]}>
            {children}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    vinylSection: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 494 / 2,
        height: 494 / 2,
    },
})