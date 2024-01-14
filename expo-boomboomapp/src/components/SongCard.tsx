import { ReactNode } from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Text,
  View,
} from "react-native";

import { Track } from "../api/SpotifyApiService/SpotifyApiServiceI";
import useEStyles from "../hooks/useEStyles";
import { useCoreStyles } from "../services/StyleService/styles";

type SongCardProps = {
  icon: () => ReactNode;
  song: Track;
};

export function SongCard({ song, icon }: SongCardProps) {
  const coreStyles = useCoreStyles();
  const styles = useEStyles({
    cardSubContainer: {
      flex: 1,
      flexDirection: "row",
      gap: "1rem",
      alignItems: "center",
    },
    textContainer: {
      gap: "$spacer0",
    },
  });

  return (
    <View key={song.trackId} style={coreStyles.SONG_CARD}>
      <View style={styles.cardSubContainer}>
        {song.image && (
          <Image
            source={song.image as ImageSourcePropType}
            style={coreStyles.SONG_CARD_IMAGE as ImageStyle}
          />
        )}
        <View style={{ ...styles.textContainer, flex: 1 }}>
          <Text
            style={{ ...coreStyles.FONT_SONGTITLE }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {song.name}
          </Text>
          <Text
            style={{ ...coreStyles.P }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {song.artistName}
          </Text>
        </View>
      </View>
      {icon()}
    </View>
  );
}
