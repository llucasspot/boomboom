import { useEffect, useRef } from "react";
import { Animated, Image, Text, View } from "react-native";

import { BaseText } from "#components/texts/BaseText";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { buildImageSource } from "#modules/core/utils/images.utils";
import { ProfileToShowUser } from "#modules/match/beans";

export type CardHeaderProps = {
  user: ProfileToShowUser;
  sayOnlyHello: boolean;
};

// TODO add styles pattern and I18n

export function CardHeader({ user, sayOnlyHello }: CardHeaderProps) {
  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;

  const height = 60;

  const translateY = useRef(new Animated.Value(-0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: sayOnlyHello ? 0 : -height,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [sayOnlyHello]);

  return (
    <View style={{ height, overflow: "hidden" }}>
      <Animated.View
        style={{ alignItems: "center", transform: [{ translateY }] }}
      >
        <View
          style={{ height, alignItems: "center", justifyContent: "center" }}
        >
          <BaseText
            i18nKey="match.CardHeader.sayHelloTo"
            style={tagStyles.F15}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            height,
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <View
            style={{ height: 40, width: 40, borderRadius: 10, marginBottom: 5 }}
          >
            <Image
              source={buildImageSource(user.avatarUri)}
              style={{ width: "100%", height: "100%", borderRadius: 1000 }}
            />
          </View>
          <Text style={tagStyles.F13}>{user.name}</Text>
        </View>
      </Animated.View>
    </View>
  );
}
