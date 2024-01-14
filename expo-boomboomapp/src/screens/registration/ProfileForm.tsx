import React from "react";
import { View } from "react-native";

import { useForm } from "react-hook-form";
import { StepProps } from "../../components/ScreenStepperLayout";
import {
  UserProfileForm,
  type UserFormProps,
} from "../../components/matching/common/UserProfileForm";
import UserService from "../../services/UserService/UserService";
import { Gender } from "../../services/UserService/userServiceI";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../tsyringe/diUtils";

export function ProfileForm({ setStepperLayoutCallback }: StepProps) {
  const userService = getGlobalInstance<UserService>(
    ServiceInterface.UserService
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormProps>({
    defaultValues: {
      gender: Gender.NO_SPECIFIC,
    },
  });

  setStepperLayoutCallback(() => {
    handleSubmit((data) => userService.updateUserState(data));
  });

  return (
    <View style={{ gap: 20 }}>
      <UserProfileForm inputsIsRequired control={control} errors={errors} />
    </View>
  );
}
