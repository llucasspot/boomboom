/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { IMAGES } from './../../../../../assets/assets';
import { DELAY_FIRST_ANIMATION, DURATION_FIRST_ANIMATION } from './../constants/constants';



export default function AnimatedTonearm({reversed}) {
    const tonearmRotationZ = useSharedValue("-45deg")

    useEffect(() => {
        tonearmRotationZ.value = withDelay(DELAY_FIRST_ANIMATION, withTiming("0deg", {duration: DURATION_FIRST_ANIMATION}))
    }, [])

    
    return (
        <Animated.View style={[
            styles.tonearmSection,
            {transform: [{rotateZ: "-45deg"}]},
            !reversed ? {right: 75, transform: [{rotateZ: tonearmRotationZ}]} : {left: 75, transform: [{scaleX: -1}, {rotateZ: tonearmRotationZ}]}
        ]}>
            <Image
                source={IMAGES.matching.tonearm}
                style={[{width: '100%', height: '100%'}]}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    tonearmSection: {
        position: "absolute",
        width: 344 / 2,
        height: 344 / 2,
        top: -100,
    },
})