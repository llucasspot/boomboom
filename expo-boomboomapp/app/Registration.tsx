import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ScreenStepperLayout } from "../src/components/ScreenStepperLayout";
import { RegistrationStackScreenParamsList } from "../src/navigation/RegistrationStack/RegistrationStack";
import FavoriteSongs from "../src/screens/registration/FavoriteSongs";
import { ProfileForm } from "../src/screens/registration/ProfileForm";
import UploadAvatar from "../src/screens/registration/UploadAvatar";

type RegistrationProps =
  NativeStackScreenProps<RegistrationStackScreenParamsList>;

export default function Registration({ navigation }: RegistrationProps) {
  return (
    <ScreenStepperLayout>
      {[UploadAvatar, ProfileForm, FavoriteSongs]}
    </ScreenStepperLayout>
  );
}
