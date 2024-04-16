import {
  Animated,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Text,
  View,
} from "react-native";

import { Item as ItemType } from "../beans/Item";

import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { buildImageSource } from "#modules/core/utils/images.utils";
import { Value } from "#modules/match/hooks/useValue.hook";

type CarouselProps = {
  carouselWidth: number;
  items: ItemType[];
  idxItemActive: Value<number>;
};

// TODO add styles pattern and I18n

export function Carousel({
  carouselWidth,
  items,
  idxItemActive,
}: CarouselProps) {
  const overlap = 30;
  const contentPadding = 10;

  const contentWidth = carouselWidth - overlap * 2;
  const itemWidth = contentWidth + contentPadding * 2;

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const totalWidth =
      items.length * itemWidth + (overlap - contentPadding) * 2;
    const x = e.nativeEvent.contentOffset.x;
    const index = (items.length * x) / totalWidth;
    idxItemActive.set(Math.round(index));
  }

  return (
    <Animated.ScrollView
      snapToInterval={itemWidth}
      disableIntervalMomentum
      decelerationRate={Platform.OS === "ios" ? "fast" : 0}
      pagingEnabled
      onScroll={onScroll}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{
        width: carouselWidth,
        flexDirection: "row",
        position: "relative",
      }}
    >
      <View style={{ width: overlap - contentPadding }} />

      {items.map((item, index) => {
        return (
          <Item
            isActive={idxItemActive.get === index}
            key={item.id}
            itemWidth={itemWidth}
            contentWidth={contentWidth}
            item={item}
          />
        );
      })}
      <View style={{ width: overlap - contentPadding }} />
    </Animated.ScrollView>
  );
}

type ItemProps = {
  itemWidth: number;
  contentWidth: number;
  item: ItemType;
  isActive: boolean;
};

function Item({ itemWidth, contentWidth, item }: ItemProps) {
  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;

  return (
    <Animated.View style={{ width: itemWidth, alignItems: "center" }}>
      <Image
        source={buildImageSource(item.spotifyImage)}
        style={{
          width: contentWidth,
          height: contentWidth,
          objectFit: "cover",
          borderRadius: item.type === "SONG" ? 50 : 1000,
        }}
      />

      <View style={{ marginTop: 15, alignItems: "center", gap: 3 }}>
        {item.type === "SONG" && (
          <>
            <Text style={tagStyles.F16}>{item.name}</Text>
            <Text style={tagStyles.p}>{item.artistName}</Text>
          </>
        )}
        {item.type === "USER" && (
          <>
            <Text style={tagStyles.F16}>{item.name}</Text>
          </>
        )}
      </View>
    </Animated.View>
  );
}
