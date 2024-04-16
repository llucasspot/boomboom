import { SerializedTrack } from "@boumboum/swagger-backend";
import { ReactNode } from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Text,
  View,
} from "react-native";

import { createStyleSheet } from "#modules/core/style/beans/createStyleSheet";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { useAppThemeStyle } from "#modules/core/style/hooks/useAppThemeStyle.hook";
import { AppTheme } from "#modules/core/style/themes/beans/theme";

type SongCardProps = {
  icon: () => ReactNode;
  song: SerializedTrack;
};

export function SongCard({ song, icon }: SongCardProps) {
  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;
  const styles = useAppThemeStyle((appTheme: AppTheme) =>
    createStyleSheet({
      cardSubContainer: {
        flex: 1,
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center",
      },
      textContainer: {
        gap: appTheme.spacers.spacer0,
      },
    }),
  );

  return (
    <View style={tagStyles.SONG_CARD}>
      <View style={styles.cardSubContainer}>
        {song.albumImage && (
          <Image
            source={song.albumImage as ImageSourcePropType}
            style={tagStyles.SONG_CARD_IMAGE as ImageStyle}
          />
        )}
        <View style={{ ...styles.textContainer, flex: 1 }}>
          <Text
            style={tagStyles.FONT_SONGTITLE}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {song.name}
          </Text>
          <Text style={tagStyles.p} numberOfLines={1} ellipsizeMode="tail">
            {song.artistNames}
          </Text>
        </View>
      </View>
      {icon()}
    </View>
  );
}
