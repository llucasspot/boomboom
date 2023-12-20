import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {router} from "expo-router";
import {RootStackScreen} from "../../navigation/RootStackScreenNavigator/RootStack";
import {SongPicker} from "../../components/SongPicker";
import {SongCard} from "../../components/SongCard";
import {useCoreStyles} from "../../services/StyleService/styles";
import useEStyles from "../../hooks/useEStyles";
import {BaseButton} from "../../components/Buttons/BaseButton";
import {IconName} from "../../components/Icons/IconName";
import {getGlobalInstance} from "../../tsyringe/diUtils";
import LanguageService from "../../services/LanguageService/LanguageService";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import {Track} from "../../api/SpotifyApiService/SpotifyApiServiceI";
import {StepProps} from "../../components/ScreenStepperLayout";

// TODO use styles
const CONTENT_PADDING = 20

export default function FavoriteSongs({setStepperLayoutCallback}: StepProps) {
    const languageService = getGlobalInstance<LanguageService>(
        ServiceInterface.LanguageServiceI,
    );
    const I18n = languageService.useTranslation();
    const [mySongs, setMySongs] = useState<Track[]>([]);

    const [pickSongModalVisible, setPickSongModalVisible] = useState(false);

    const maxSongsReached = mySongs.length >= 5;

    const coreStyles = useCoreStyles()
    const styles = useEStyles({
        touchableOpacity: {
            borderColor: '$borderColor',
            borderBottomWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            opacity: maxSongsReached ? .3 : 1
        }
    })

    function searchSong() {
        setPickSongModalVisible(true);
    }

    function removeSong(title: string) {
        setMySongs(mySongs.filter(song => song.name !== title));
    }

    setStepperLayoutCallback(() => {
        router.replace(`/${RootStackScreen.WELCOME_SCREEN}`);
    })

    return (
        <>

            <Modal
                animationType="slide"
                transparent={false}
                visible={pickSongModalVisible}
                onRequestClose={() => setPickSongModalVisible(false)}>
                <SongPicker mySongs={mySongs} setMySongs={setMySongs} onBack={() => setPickSongModalVisible(false)}/>
            </Modal>
            <View style={{flex: 1, paddingHorizontal: CONTENT_PADDING, paddingVertical: 15}}>
                <TouchableOpacity disabled={maxSongsReached} onPress={searchSong}
                                  style={styles.touchableOpacity}
                >
                    <Text
                        // TODO add I18n
                        style={{flex: 1, ...coreStyles.FONT_INPUT}}>{!maxSongsReached ? 'Add a new song...' : 'Remove a song before adding a new one'}</Text>
                    <BaseButton color={'$errorColor'} icon={IconName.ARROW_LEFT}/>
                </TouchableOpacity>

                <ScrollView style={{marginTop: 15}}>
                    <View style={{marginTop: 5, gap: 8}}>
                        {mySongs.map((song) =>
                            <SongCard song={song} key={song.trackId} icon={() =>
                                <BaseButton color={'$errorColor'} icon={IconName.ARROW_LEFT}
                                            onPress={() => removeSong(song.name)}/>
                            }/>
                        )}
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
