import { RegisterStepper } from "../src/components/RegisterStepper/RegisterStepper";
import FavoriteSongs from "../src/components/RegisterStepper/steps/FavoriteSongs";
import { ProfileForm } from "../src/components/RegisterStepper/steps/ProfileForm";
import UploadAvatar from "../src/components/RegisterStepper/steps/UploadAvatar";

export default function Registration() {
  return (
    <RegisterStepper>
      {[UploadAvatar, ProfileForm, FavoriteSongs]}
    </RegisterStepper>
  );
}
