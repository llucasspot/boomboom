import React from "react";

import { BaseButtonIconPosition } from "#components/buttons/BaseButton";
import { IconName } from "#components/buttons/IconName";
import { ThemedButton } from "#components/buttons/ThemedButton";
import { BaseText } from "#components/texts/BaseText";

type ReturnButtonProps = {
  goBack?: boolean;
  onPress: () => void;
};

export function ReturnButton({
  goBack = true,
  onPress,
}: Readonly<ReturnButtonProps>) {
  // const appTheme = useAppTheme();
  // const styles = createStyleSheet({
  //   goBackButton: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     gap: 10,
  //   },
  //   iconContainer: {
  //     borderRadius: appTheme.borderRadius.circleBorderRadius,
  //     padding: appTheme.spacers.spacer1,
  //     borderColor: appTheme.colors.onSurfaceVariant,
  //     borderWidth: 1,
  //   },
  //   back: {
  //     color: appTheme.colors.onSecondaryContainer,
  //   },
  // });

  if (!goBack) {
    return null;
  }

  return (
    <ThemedButton
      colorName="secondary"
      onPress={onPress}
      icon={IconName.ARROW_RIGHT}
      iconPosition={BaseButtonIconPosition.LEFT}
      content={<BaseText i18nKey="component.ReturnButton.back" />}
    />
  );

  // return (
  //   <Pressable onPress={onPress} style={styles.goBackButton}>
  //     <Text style={styles.back}>{I18n.t("component.ReturnButton.back")}</Text>
  //     <View style={styles.iconContainer}>
  //       <Icon
  //         size={iconSize!}
  //         name={IconName.ARROW_RIGHT}
  //         color="$secondaryColor"
  //       />
  //     </View>
  //   </Pressable>
  // );
}
