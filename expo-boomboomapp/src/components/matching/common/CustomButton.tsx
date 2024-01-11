import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { IMAGES } from "../../../../assets/assets";
import { COLORS } from "../../../services/StyleService/StyleStateServiceI";

type CustomButtonProps = {
  disabled?: boolean;
  title: string;
  icon?: ImageSourcePropType;
  style?: object;
  onPress: () => void;
};

// TODO add styles pattern and I18n

export function CustomButton({
  disabled,
  title,
  icon,
  onPress,
  style,
}: CustomButtonProps) {
  const _style = {
    ...style,

    position: "relative",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

    width: "100%",
    maxWidth: 400,
    padding: 16,
    borderRadius: 10,

    backgroundColor: disabled ? "#000000" : COLORS.DARK_BLUE,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={_style as ViewStyle}
    >
      <Image
        source={IMAGES.commons.blur_256_red}
        style={{
          width: 130,
          height: 130,
          position: "absolute",
          left: 20,
          top: -75,
        }}
      />
      <Image
        source={IMAGES.commons.blur_256_blue}
        style={{
          width: 130,
          height: 130,
          position: "absolute",
          right: 20,
          bottom: -75,
        }}
      />
      {icon && (
        <Image source={icon} style={{ width: 20, height: 20, marginEnd: 5 }} />
      )}
      <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
