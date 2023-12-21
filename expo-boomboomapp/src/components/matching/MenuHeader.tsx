import {Image, Modal, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import React, {useState} from "react";
import {MyProfile} from "./MyProfile/MyProfile";
import {MyMatches} from "./MyMatches/MyMatches";
import {useCoreStyles} from "../../services/StyleService/styles";
import {IMAGES} from "../../../assets/assets";
import {getGlobalInstance} from "../../tsyringe/diUtils";
import UserService from "../../services/UserService/UserService";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import {Redirect} from "expo-router";
import {RootStackScreen} from "../../navigation/RootStackScreenNavigator/RootStack";

const CONTENT_PADDING = 20

type MenuHeaderProps = {}

// TODO add styles pattern and I18n

export function MenuHeader({}: MenuHeaderProps) {
    const userService = getGlobalInstance<UserService>(ServiceInterface.UserService)
    const user = userService.useUser()
    if (!user.isConnected) {
        return <Redirect href={`/${RootStackScreen.AUTH_HOME}`}/>
    }
    const coreStyle = useCoreStyles()

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
                statusBarTranslucent={true}
                transparent={false}
                visible={modalMyProfileOpened}
                onRequestClose={() => {
                    setModalMyProfileOpened(false);
                }}
            >
                <MyProfile onBack={() => setModalMyProfileOpened(false)}/>
            </Modal>

            <Modal
                animationType="slide"
                statusBarTranslucent={true}
                transparent={false}
                visible={modalMyMatchesOpened}
                onRequestClose={() => {
                    setModalMyMatchesOpened(false);
                }}
            >
                <MyMatches onBack={() => setModalMyMatchesOpened(false)}/>
            </Modal>

            <View style={{
                paddingHorizontal: CONTENT_PADDING,
                paddingTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={btnProfile} style={menuButton}>
                    <Image source={user.profilePicture.uri} style={{width: 48 / 2, height: 48 / 2, borderRadius: 10}}/>
                    <Text style={coreStyle.F13}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={btnMyMatches} style={menuButton}>
                    <Text style={coreStyle.F13}>Matches</Text>
                    <Image source={IMAGES.icons.messages} style={{width: 48 / 2, height: 48 / 2}}/>
                </TouchableOpacity>
            </View>

        </>
    )
}

const menuButton = {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
} as ViewStyle

