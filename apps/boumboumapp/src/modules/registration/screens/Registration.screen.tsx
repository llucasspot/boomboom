import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  RegisterStackParamsList,
  RegisterStackScreen,
} from "#modules/registration/Register.stack";
import { RegisterStepper } from "#modules/registration/components/RegisterStepper";
import { FavoriteSongs } from "#modules/registration/components/steps/FavoriteSongs";
import { ProfileForm } from "#modules/registration/components/steps/ProfileForm";
import { UploadAvatar } from "#modules/registration/components/steps/UploadAvatar";

type RegistrationScreenProps = NativeStackScreenProps<
  RegisterStackParamsList,
  RegisterStackScreen.REGISTRATION_SCREEN
>;
export function RegistrationScreen({ navigation }: RegistrationScreenProps) {
  return (
    <RegisterStepper rootNavigation={navigation}>
      {[UploadAvatar, ProfileForm, FavoriteSongs]}
    </RegisterStepper>
  );
}
