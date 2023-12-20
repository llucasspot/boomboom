import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RegistrationStackScreenParamsList} from "../src/navigation/RegistrationStack/RegistrationStack";
import {ScreenStepperLayout} from "../src/components/ScreenStepperLayout";
import UploadAvatar from "../src/screens/registration/UploadAvatar";
import FavoriteSongs from "../src/screens/registration/FavoriteSongs";
import {ProfileForm} from "../src/screens/registration/ProfileForm";
import {View} from "react-native";
import {PropsWithChildren} from "react";

type RegistrationProps = NativeStackScreenProps<
    RegistrationStackScreenParamsList
>;

export default function Registration({navigation}: RegistrationProps) {
    const nextStepHandlers = [
        () => {
        },
        () => {
        },
        () => {
        },
    ]

    return (
        <ScreenStepperLayout>
            {[
                UploadAvatar,
                ProfileForm,
                FavoriteSongs
            ]}
        </ScreenStepperLayout>
    )
}
