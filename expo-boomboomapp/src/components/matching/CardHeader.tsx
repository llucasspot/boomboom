import { useEffect, useRef } from "react";
import { Animated, Image, Text, View } from "react-native";
import { ProfileToShowUser } from "swagger-boomboom-backend";

import { useCoreStyles } from "#services/StyleService/styles";
import { buildImageSource } from "#utils/images.utils";

export type CardHeaderProps = {
  user: ProfileToShowUser;
  sayOnlyHello: boolean;
};

// TODO add styles pattern and I18n

export function CardHeader({ user, sayOnlyHello }: CardHeaderProps) {
  const coreStyles = useCoreStyles();

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
          <Text style={coreStyles.F15}>Say hello to...</Text>
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
              source={buildImageSource(user.image)}
              style={{ width: "100%", height: "100%", borderRadius: 1000 }}
            />
          </View>
          <Text style={coreStyles.F13}>{user.name}</Text>
        </View>
      </Animated.View>
    </View>
  );
}
