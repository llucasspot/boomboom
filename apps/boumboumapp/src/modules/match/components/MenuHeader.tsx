import React, { useState } from "react";
import { Image, Modal, TouchableOpacity, View, ViewStyle } from "react-native";

import { MyMatchesScreen } from "../screens/MyMatches.screen";
import { MyProfileScreen } from "../screens/MyProfile.screen";

import { BaseText } from "#components/texts/BaseText";
import { useAppTheme } from "#modules/core/style/hooks/useAppTheme.hook";
import { buildImageSource } from "#modules/core/utils/images.utils";
import { IMAGES } from "#modules/match/assets/images";
import { useRootStackContext } from "#modules/match/context/RootStack.context";

const CONTENT_PADDING = 20;

// TODO add styles pattern and I18n

export function MenuHeader() {
  const { avatarUri } = useRootStackContext();

  const appTheme = useAppTheme();
  const tagStyles = appTheme.tags;

  const [modalMyProfileOpened, setModalMyProfileOpened] = useState(false);
  const [modalMyMatchesOpened, setModalMyMatchesOpened] = useState(false);

  function btnMyMatches() {
    setModalMyMatchesOpened(true);
  }

  function btnProfile() {
    setModalMyProfileOpened(true);
  }

  return (
    <>
      <Modal
        animationType="slide"
        statusBarTranslucent
        transparent={false}
        visible={modalMyProfileOpened}
        onRequestClose={() => {
          setModalMyProfileOpened(false);
        }}
      >
        <MyProfileScreen onBack={() => setModalMyProfileOpened(false)} />
      </Modal>

      <Modal
        animationType="slide"
        statusBarTranslucent
        transparent={false}
        visible={modalMyMatchesOpened}
        onRequestClose={() => {
          setModalMyMatchesOpened(false);
        }}
      >
        <MyMatchesScreen onBack={() => setModalMyMatchesOpened(false)} />
      </Modal>

      <View
        style={{
          paddingHorizontal: CONTENT_PADDING,
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={btnProfile} style={menuButton}>
          <Image
            source={buildImageSource(avatarUri)}
            style={{ width: 48 / 2, height: 48 / 2, borderRadius: 10 }}
          />
          <BaseText
            i18nKey="match.MenuHeader.MyProfileSectionButtonLabel"
            style={tagStyles.F13}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={btnMyMatches} style={menuButton}>
          <BaseText
            i18nKey="match.MenuHeader.MyMatchesSectionButtonLabel"
            style={tagStyles.F13}
          />
          <Image
            source={IMAGES.icons.messages}
            style={{ width: 48 / 2, height: 48 / 2 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const menuButton = {
  paddingVertical: 8,
  paddingHorizontal: 12,
  backgroundColor: "white",
  borderRadius: 10,
  flexDirection: "row",
  gap: 10,
  justifyContent: "center",
  alignItems: "center",
} as ViewStyle;
