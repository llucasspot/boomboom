import {
    Animated,
    Easing,
    Image,
    ImageSourcePropType,
    ImageStyle,
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
import React, {useEffect, useRef} from "react";
import {BlurredAura} from "./BlurredAura";
import {IMAGES} from "../../../assets/assets";
import {useCoreStyles} from "../../services/StyleService/styles";
import {CustomButton} from "./common/CustomButton";
import {getGlobalInstance} from "../../tsyringe/diUtils";
import UserService from "../../services/UserService/UserService";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import {Redirect} from "expo-router";
import {RootStackScreen} from "../../navigation/RootStackScreenNavigator/RootStack";

export type ItsAMatchProps = {
    onClose: () => void,
    matchedUser: { image: ImageSourcePropType }
}

const CONTENT_PADDING = 20

// TODO add styles pattern and I18n

export function ItsAMatch({onClose, matchedUser}: ItsAMatchProps) {
    const userService = getGlobalInstance<UserService>(ServiceInterface.UserService)
    const user = userService.useUser()
    if (!user.isConnected) {
        return <Redirect href={`/${RootStackScreen.AUTH_HOME}`}/>
    }

    const coreStyles = useCoreStyles()

    const photoMe = user.profilePicture.uri;
    const photoMatched = matchedUser.image;

    const loopAnim = useRef(new Animated.Value(0)).current;
    const inAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        loopAnim.setValue(0);

        // Démarrer l'animation de rotation tout doucement
        setTimeout(() => {
            Animated.timing(loopAnim, {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
                easing: Easing.bezier(.31, .03, .31, .35),
            }).start();
        }, 1800)

        // Continuer l'animation de rotation avec la même vitesse
        setTimeout(() => {
            loopAnim.setValue(0);
            Animated.loop(
                Animated.timing(loopAnim, {
                    toValue: 1,
                    duration: 5000,
                    useNativeDriver: true,
                    easing: Easing.linear,
                })
            ).start();
        }, 5000 + 1800)

    }, [matchedUser]);

    useEffect(() => {
        inAnim.setValue(0);
        Animated.timing(inAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [matchedUser]);

    const rotate = loopAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });
    const revertedRotate = loopAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg']
    });
    const translateXInner = inAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 0]
    });
    const rotateArm = inAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-45deg', '0deg']
    });

    function btnContact() {
    }

    return (
        <View style={{flex: 1}}>

            <BlurredAura color="red" position="bottom-right"/>

            <View style={{height: 40}}></View>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={IMAGES.logos.logo_3} style={styles.image_logo}/>
                <Text style={coreStyles.H2}>Your hearts in tunes</Text>
                <Text style={coreStyles.P}>Boum Boum, it's a match!</Text>
            </View>

            <View style={{flex: 2, justifyContent: 'flex-end', paddingVertical: 20}}>
                <View style={{alignItems: 'center'}}>
                    <View style={styles.floating_hearts_container as ViewStyle}>
                        <Image source={IMAGES.matching.floating_hearts}
                               style={styles.image_floating_hearts as ImageStyle}/>
                    </View>
                    <View style={{flexDirection: 'row', height: 494 / 2, width: '100%'}}>
                        <Animated.View style={{flex: 1, transform: [{translateX: translateXInner}]}}>
                            <Animated.Image source={IMAGES.matching.vinyl} style={{
                                ...styles.image_vinyl as ImageStyle,
                                right: 0,
                                transform: [{rotate: revertedRotate}]
                            }}/>
                            <Animated.Image source={IMAGES.matching.tonearm} style={{
                                ...styles.image_tonearm as ImageStyle,
                                right: 100,
                                transform: [{rotate: rotateArm}]
                            }}/>
                            <Animated.Image source={photoMe} style={{
                                ...styles.image_profile as ImageStyle,
                                right: 85,
                                transform: [{rotate: revertedRotate}]
                            }}/>
                        </Animated.View>
                        <Animated.View
                            style={{flex: 1, transform: [{translateX: Animated.multiply(translateXInner, -1)}]}}>
                            <Animated.Image source={IMAGES.matching.vinyl} style={{
                                ...styles.image_vinyl as ImageStyle,
                                left: 0,
                                transform: [{rotate}, {scaleX: -1}]
                            }}/>
                            <Animated.Image source={IMAGES.matching.tonearm} style={{
                                ...styles.image_tonearm as ImageStyle,
                                left: 100,
                                transform: [{scaleX: -1}, {rotate: rotateArm}]
                            }}/>
                            <Animated.Image source={photoMatched} style={{
                                ...styles.image_profile as ImageStyle,
                                left: 85,
                                transform: [{rotate}]
                            }}/>
                        </Animated.View>
                    </View>
                </View>
            </View>

            <View style={{alignItems: 'center', padding: CONTENT_PADDING, paddingTop: 40}}>
                <CustomButton title={'Contact your match'} onPress={btnContact}/>
                <TouchableOpacity style={{marginTop: 16}} onPress={onClose}>
                    <Text style={{...coreStyles.P, textDecorationLine: 'underline'}}>Or continue to match</Text>
                </TouchableOpacity>
            </View>

        </View>
    )

}

const styles = {
    floating_hearts_container: {
        alignItems: 'center',
        position: 'absolute',
        top: -492 / 2,
        width: '100%',
        overflow: 'hidden'
    },
    image_logo: {
        width: 156 / 2, height: 148 / 2, marginBottom: 10
    },
    image_floating_hearts: {
        position: 'relative',
        width: 1174 / 2,
        height: 492 / 2,
    },
    image_vinyl: {
        position: 'absolute',
        width: 494 / 2,
        height: 494 / 2,
    },
    image_tonearm: {
        position: 'absolute',
        width: 344 / 2,
        height: 344 / 2,
        top: -100,
    },
    image_profile: {
        width: 75,
        height: 75,
        borderRadius: 75,
        position: 'absolute',
        top: 87,
    }
}
