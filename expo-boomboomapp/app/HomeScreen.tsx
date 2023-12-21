import React, {useEffect, useState} from 'react';
import {Image, ImageSourcePropType, ImageStyle, Modal, Platform, TouchableOpacity, View, ViewStyle} from 'react-native';
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import LanguageService from "../src/services/LanguageService/LanguageService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import {IMAGES} from "../assets/assets";
import {SafeAreaView} from "react-native-safe-area-context";
import {Track} from "../src/api/SpotifyApiService/SpotifyApiServiceI";
import {MenuHeader} from "../src/components/matching/MenuHeader";
import {Card} from "../src/components/matching/Card";
import {ItsAMatch} from "../src/components/matching/ItsAMatch";
import {BlurredBackground} from "../src/components/matching/BlurredBackground";
import {useObserver} from "../src/components/matching/hooks/useObserver";
import {ProfileApiServiceI, StackProfileI} from "../src/api/ProfileApiService/ProfileApiServiceI";

type HomeScreenProps = {}

export default function HomeScreen({}: HomeScreenProps): JSX.Element {
    const languageService = getGlobalInstance<LanguageService>(
        ServiceInterface.LanguageServiceI,
    );
    const I18n = languageService.useTranslation();
    const profileApiService = getGlobalInstance<ProfileApiServiceI>(
        ServiceInterface.ProfileApiServiceI,
    );

    const [stackProfiles, setStackProfiles] = useState<StackProfileI[]>([]);

    useEffect(() => {
        profileApiService
            .getStackProfiles()
            .then((stackProfiles) => {
                setStackProfiles(stackProfiles)
            })
            .catch(err => {
                // TODO handle error better
                console.log("HomeScreen : ", err)
            })
    }, [])

    const [currentIdBackground, setCurrentIdBackground] = useState<Track['trackId'] | null>(null);

    const onNextSubscriber = useObserver();

    // Delay the like button, time to animate the card and load/unload profiles
    const [isLoading, setIsLoading] = useState(false);

    // Its a match
    const [matchedUser, setMatchedUser] = useState<{ image: ImageSourcePropType } | null>(null);

    // On next(yes), call the api to like the profile and open ITsAMath modal if its a match
    useEffect(() => {
        if (stackProfiles.length === 0) return;
        let cb = onNextSubscriber.current.subscribe((isYes: boolean) => {
            if (!isYes) return;

            // TODO call the server

            // Its a match (simulation)
            setTimeout(() => {
                setMatchedUser(stackProfiles[0].user);
            }, 500);

        });
        return () => {
            onNextSubscriber.current.unsubscribe(cb);
        }
    }, [isLoading, stackProfiles]);

    // On next, pop the stack: That will place the next profile at the front and play the animation
    useEffect(() => {
        let cb = onNextSubscriber.current.subscribe(() => {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setStackProfiles(stackProfiles => [
                    ...stackProfiles.slice(1),
                ]);
            }, 400);
        });
        return () => {
            onNextSubscriber.current.unsubscribe(cb);
        }
    }, []);

    // On next, push a new profile in the stack
    useEffect(() => {
        let cb = onNextSubscriber.current.subscribe(() => {
            profileApiService.getStackProfiles()
                .then((newStackProfiles) => {
                    setStackProfiles(stackProfiles => [
                        ...stackProfiles,
                        newStackProfiles[Math.floor(Math.random() * newStackProfiles.length)],
                    ]);
                })
                .catch(err => {
                    // TODO handle error better
                    console.log("HomeScreen : ", err)
                })
        });
        return () => {
            onNextSubscriber.current.unsubscribe(cb);
        }
    }, []);

    function btnYes() {
        if (isLoading) return;
        onNextSubscriber.current.publish(true);
    }

    function btnNope() {
        if (isLoading) return;
        onNextSubscriber.current.publish(false);
    }

    return (
        <>
            <Modal
                animationType="slide"
                statusBarTranslucent={true}
                transparent={false}
                visible={matchedUser !== null}
                onRequestClose={() => {
                    setMatchedUser(null);
                }}
            >
                {matchedUser !== null && <ItsAMatch matchedUser={matchedUser} onClose={() => setMatchedUser(null)}/>}
            </Modal>


            <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
                <BlurredBackground
                    stackProfiles={stackProfiles}
                    currentIdBackground={currentIdBackground}
                    setCurrentIdBackground={setCurrentIdBackground}
                />

                <MenuHeader/>

                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '100%',
                        height: '100%', justifyContent: 'center',
                        alignItems: 'center', maxWidth: 400, maxHeight: 600,
                    }}>
                        {stackProfiles.map((profile, index) => (
                            <Card
                                setCurrentIdBackground={setCurrentIdBackground}
                                index={index}
                                key={profile.user.id}
                                profile={profile}
                                onNext={onNextSubscriber}
                            />
                        ))}
                    </View>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                    ,
                }}>
                    <Image source={IMAGES.matching.ellipse} style={styles.image_ellipse as ImageStyle}/>
                    <View style={{flexDirection: 'row', gap: 30, marginVertical: 20}}>
                        <TouchableOpacity style={styles.roundedButton as ImageStyle} onPress={btnNope}>
                            <Image source={IMAGES.matching.nope} style={{width: 34 / 2, height: 34 / 2}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.roundedButton as ViewStyle} onPress={btnYes}>
                            <Image source={IMAGES.matching.yes} style={{width: 53 / 2, height: 49 / 2}}/>
                        </TouchableOpacity>
                    </View>
                    {Platform.OS === 'ios' && <View style={{height: 20}}/>}
                </View>

            </SafeAreaView>
        </>
    );
};

const styles = {
    image_ellipse: {
        width: 390,
        height: 77,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 0 : -20
    },
    roundedButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        width: 64,
        height: 64,
        backgroundColor: 'white',
        shadowColor: '#F2ADFF',
        shadowRadius: 20,
        shadowOpacity: .4,
        shadowOffset: {height: 20, width: 0},
        elevation: 10,
    }
}
