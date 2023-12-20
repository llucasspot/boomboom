import {Button, Image, Platform, Text, TouchableOpacity, View} from "react-native";
import {user_yohan} from "../../mokes";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useCoreStyles} from "../../../services/StyleService/styles";
import {RootStackScreen} from "../../../navigation/RootStackScreenNavigator/RootStack";
import {router} from "expo-router";
import {ProfileForm} from "../common/ProfileForm";

const CONTENT_PADDING = 30;

type MyProfileProps = {
    onBack: () => void
}

// TODO add styles pattern and I18n

export function MyProfile({onBack}: MyProfileProps) {

    const coreStyles = useCoreStyles()

    const navigation = useNavigation();

    function btnReset() {
        onBack();
        router.push(`/${RootStackScreen.HOME}`);
    }

    return (
        <SafeAreaView style={{}}>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: CONTENT_PADDING
            }}>
                <Text style={coreStyles.H3}>Profile</Text>
                <TouchableOpacity onPress={onBack}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>

            <View style={{height: 20}}/>

            <View style={{alignItems: 'center', gap: 10}}>
                <Image source={user_yohan.image}
                       style={{width: 80, height: 80, objectFit: 'cover', borderRadius: 16}}></Image>
                <Text style={coreStyles.F13}>Hey {user_yohan.name}</Text>
            </View>

            <View style={{height: 20}}/>

            <View style={{padding: CONTENT_PADDING}}>
                <ProfileForm/>
            </View>

            <View>
                {Platform.OS !== 'android' && <Button title={'Debug : Back to home'} onPress={btnReset}/>}
            </View>


        </SafeAreaView>
    )

}
