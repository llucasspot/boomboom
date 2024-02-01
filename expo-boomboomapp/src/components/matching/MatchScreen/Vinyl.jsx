/* eslint-disable prettier/prettier */
import React from 'react'
import { Image, StyleSheet} from 'react-native'

import { IMAGES } from './../../../../assets/assets';
import AnimatedAvatar from './Animated/AnimatedAvatar';
import AnimatedContainer from './Animated/AnimatedContainer';
import AnimatedTonearm from './Animated/AnimatedTonearm';
import AnimatedVinyl from './Animated/AnimatedVinyl';



export default function Vinyl({reversed = false, avatar}) {
    
    return (
        <AnimatedContainer reversed={reversed}>
            <AnimatedVinyl reversed={reversed}>
                <Image
                source={IMAGES.matching.vinyl}
                style={{width: '100%', height: '100%'}}
                />

                <AnimatedAvatar avatar={avatar} reversed={reversed} />

            </AnimatedVinyl>

            <AnimatedTonearm reversed={reversed} />

        </AnimatedContainer>
    )
}

const styles = StyleSheet.create({})