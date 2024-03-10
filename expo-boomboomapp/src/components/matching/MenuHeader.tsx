import React, { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { MyMatches } from "./MyMatches/MyMatches";
import { MyProfile } from "./MyProfile/MyProfile";

import { IMAGES } from "#assets/assets";
import RegistrationStateService from "#services/RegistrationStateService/RegistrationState.service";
import { useCoreStyles } from "#services/StyleService/styles";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { getGlobalInstance } from "#tsyringe/diUtils";
import { buildImageSource } from "#utils/images.utils";

const CONTENT_PADDING = 20;

// TODO add styles pattern and I18n

export function MenuHeader() {
  const registrationStateService = getGlobalInstance<RegistrationStateService>(
    ServiceInterface.RegistrationStateService,
  );
  const registrationState = registrationStateService.useRegistrationState();

  const coreStyle = useCoreStyles();

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
        <MyProfile onBack={() => setModalMyProfileOpened(false)} />
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
        <MyMatches onBack={() => setModalMyMatchesOpened(false)} />
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
            source={buildImageSource(registrationState?.profilePicture.uri)}
            style={{ width: 48 / 2, height: 48 / 2, borderRadius: 10 }}
          />
          <Text style={coreStyle.F13}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={btnMyMatches} style={menuButton}>
          <Text style={coreStyle.F13}>Matches</Text>
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
