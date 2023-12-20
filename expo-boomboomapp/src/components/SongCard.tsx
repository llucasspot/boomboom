import {Image, ImageSourcePropType, ImageStyle, Text, View} from "react-native";
import {ReactNode} from "react";
import {useCoreStyles} from "../services/StyleService/styles";
import {Track} from "../api/SpotifyApiService/SpotifyApiServiceI";
import useEStyles from "../hooks/useEStyles";

type SongCardProps = {
    icon: () => ReactNode,
    song: Track,
}

export function SongCard({song, icon}: SongCardProps) {

    const coreStyles = useCoreStyles()
    const styles = useEStyles({
        cardSubContainer: {
            flex: 1,
            flexDirection: 'row',
            gap: '1rem',
            alignItems: 'center'
        },
        textContainer: {
            gap: '$spacer0',
        }
    })

    return (
        <View key={song.trackId} style={coreStyles.SONG_CARD}>
            <View style={styles.cardSubContainer}>
                <Image source={song.image as ImageSourcePropType} style={coreStyles.SONG_CARD_IMAGE as ImageStyle}/>
                <View style={styles.textContainer}>
                    <Text style={{...coreStyles.FONT_SONGTITLE}}>{song.name}</Text>
                    <Text style={{...coreStyles.P}}>{song.artistName}</Text>
                </View>
            </View>
            {icon()}
        </View>
    )

}
