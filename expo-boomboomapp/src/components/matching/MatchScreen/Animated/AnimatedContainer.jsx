/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Animated, { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { DELAY_START, DURATION_TRANSLATION_COMPONENT } from '../constants/constants';



const WIDTH = Dimensions.get('window').width / 2

export default function AnimatedContainer({children, reversed}) {
    const containerTranslateX = useSharedValue(!reversed ? -WIDTH : WIDTH)

    useEffect(() => {
        containerTranslateX.value = withDelay(DELAY_START, withTiming(0, {duration: DURATION_TRANSLATION_COMPONENT})) 
    }, [])

    return (
        <Animated.View style={[
            styles.container, 
            {transform: [{translateX: containerTranslateX}]},
            !reversed && {alignItems: 'flex-end'}
        ]}>
            {children}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})