/* eslint-disable prettier/prettier */
import { buildImageSource } from '@utils/images.utils';
import React from 'react'
import { StyleSheet, View } from 'react-native'

import ServiceInterface from './../../../tsyringe/ServiceInterface';
import { getGlobalInstance } from './../../../tsyringe/diUtils';
import Vinyl from './Vinyl';
import FloatingIcons from './FloatingIcons';

export default function MainAnimationsMatchScreen({matchedUser}) {
    const userService = getGlobalInstance(ServiceInterface.UserService)
    const user = userService.useUser()
    const photoMatched = matchedUser.image

    return (
        <View style={styles.container}>

            <View style={styles.iconsAnimatedSection}>
                <FloatingIcons />
            </View>

            <View style={styles.vinylsSection}>

                <Vinyl 
                avatar={buildImageSource(user.profilePicture.uri)}
                />
                <Vinyl 
                reversed 
                avatar={buildImageSource(photoMatched)}
                />




            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconsAnimatedSection: {
        flex: 1,
    },
    vinylsSection: {
        // flex: 1,
        flexDirection: 'row',
        gap: 5
    },
})