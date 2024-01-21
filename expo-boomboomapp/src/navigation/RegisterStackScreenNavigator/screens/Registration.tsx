import { useNavigation } from "@react-navigation/core";
import { NavigationProp } from "@react-navigation/core/src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RegisterStepper } from "../../../components/RegisterStepper/RegisterStepper";
import FavoriteSongs from "../../../components/RegisterStepper/steps/FavoriteSongs";
import { ProfileForm } from "../../../components/RegisterStepper/steps/ProfileForm";
import UploadAvatar from "../../../components/RegisterStepper/steps/UploadAvatar";
import { RegisterStackParamsList, RegisterStackScreen } from "../RegisterStack";

type RegistrationScreenProps = NativeStackScreenProps<
  RegisterStackParamsList,
  RegisterStackScreen.REGISTRATION_SCREEN
>;

export function Registration({}: RegistrationScreenProps) {
  const navigation = useNavigation<NavigationProp<RegisterStackParamsList>>();
  return (
    <RegisterStepper navigation={navigation}>
      {[UploadAvatar, ProfileForm, FavoriteSongs]}
    </RegisterStepper>
  );
}
