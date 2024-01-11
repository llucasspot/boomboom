import {
  Animated,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Text,
  View,
} from "react-native";

import { Item as ItemType } from "./beans/Item";
import { useCoreStyles } from "../../services/StyleService/styles";

type CarouselProps = {
  carouselWidth: number;
  items: ItemType[];
  idxItemActive: number;
  setIdxItemActive: (index: number) => void;
};

// TODO add styles pattern and I18n

export function Carousel({
  carouselWidth,
  items,
  idxItemActive,
  setIdxItemActive,
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
    setIdxItemActive(Math.round(index));
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

      {items.map((item) => (
        <Item
          isActive={idxItemActive === item.idx}
          key={item.idx}
          itemWidth={itemWidth}
          contentWidth={contentWidth}
          item={item}
        />
      ))}
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
  const coreStyles = useCoreStyles();

  return (
    <Animated.View style={{ width: itemWidth, alignItems: "center" }}>
      <Image
        source={item.image as ImageSourcePropType}
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
            <Text style={coreStyles.F16}>{item.name}</Text>
            <Text style={coreStyles.P}>{item.artistName}</Text>
          </>
        )}
        {item.type === "USER" && (
          <>
            <Text style={coreStyles.F16}>{item.name}</Text>
          </>
        )}
      </View>
    </Animated.View>
  );
}
