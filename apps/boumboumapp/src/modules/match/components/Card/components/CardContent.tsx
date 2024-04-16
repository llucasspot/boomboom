import { useEffect, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";

import { CardHeader } from "./CardHeader";
import { Carousel } from "./Carousel";
import { CarouselSteps } from "./CarouselSteps";

import { ProfileToShow } from "#modules/match/beans";
import { Item } from "#modules/match/components/Card/beans/Item";
import { useHomeScreenContext } from "#modules/match/context/HomeScreen.context";
import { useValue } from "#modules/match/hooks/useValue.hook";

type CardContentProps = {
  profile: ProfileToShow;
};

// TODO add styles pattern and I18n

export function CardContent({ profile }: CardContentProps) {
  const { currentIdBackground } = useHomeScreenContext();

  const idxItemActive = useValue<number>(0);
  const [carouselWidth, setCarouselWidth] = useState(200);

  const carouselItems = buildItems(profile);

  useEffect(() => {
    currentIdBackground.set(profile.songs[idxItemActive.get]?.trackId);
  }, [idxItemActive]);

  function onLayout(event: LayoutChangeEvent) {
    setCarouselWidth(event.nativeEvent.layout.width);
  }

  return (
    <>
      <CardHeader
        user={profile.userInfo}
        sayOnlyHello={idxItemActive.get === carouselItems.length - 1}
      />
      <View
        onLayout={onLayout}
        style={{ width: "100%", flex: 1, alignItems: "center" }}
      >
        <Carousel
          idxItemActive={idxItemActive}
          carouselWidth={carouselWidth}
          items={carouselItems}
        />
        <View style={{ height: 20 }} />
        <CarouselSteps idxItemActive={idxItemActive} items={carouselItems} />
        <View style={{ height: 20 }} />
      </View>
    </>
  );
}

function buildItems({ userInfo, songs }: ProfileToShow): Item[] {
  return [
    ...songs.map((song) => ({
      id: song.trackId,
      type: "SONG" as const,
      popularity: song.popularity,
      name: song.name,
      trackId: song.trackId,
      album: song.albumName,
      spotifyImage: song.albumImage?.url,
      artistName: song.artistNames.join(", "),
    })),
    {
      type: "USER",
      name: userInfo.name,
      id: userInfo.id,
      spotifyImage: userInfo.avatarUri,
    },
  ];
}
