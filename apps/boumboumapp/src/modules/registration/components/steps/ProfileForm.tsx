import { CreateOneProfileBodyGenderEnum } from "@boumboum/swagger-backend";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";

import { MeProfileApiServiceI } from "#modules/api/services/ProfileApi/me-profile-api.serviceI";
import { diService } from "#modules/core/di/di-utils";
import { StepProps } from "#modules/registration/components/RegisterStepper";
import {
  UserFormData,
  UserProfileForm,
} from "#modules/registration/components/UserProfileForm/UserProfileForm";
import { RegistrationState } from "#modules/registration/services/RegistrationState.manager";

export function ProfileForm({
  setStepperLayoutCallback,
  stepperNavigation,
  stateManager,
}: StepProps) {
  // @ts-ignore interface
  const profileApiService = diService.getInstance(MeProfileApiServiceI);
  const { data: userInfo } = profileApiService.useProfile();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    // TODO I18N
    // @ts-ignore exception yup resolver
    resolver: yupResolver(
      yup.object().shape({
        fullName: yup
          .string()
          .matches(/^[a-zA-Z0-9]*$/, "Full name must be alphanumeric")
          .required("Full name is required"),
        dateOfBirth: yup.date().required("Date of birth is required"),
        gender: yup
          .string()
          .oneOf(Object.values(CreateOneProfileBodyGenderEnum))
          .required("Gender is required"),
        gendersToShow: yup
          .array()
          .of(yup.string().oneOf(Object.values(CreateOneProfileBodyGenderEnum)))
          .required("Enum array is required")
          .min(1, "At least one enum value is required"),
        description: yup.string(),
      }),
    ),
    defaultValues: {
      gender: CreateOneProfileBodyGenderEnum.NonBinary,
      gendersToShow: [],
      fullName: userInfo!.data.name,
    },
  });

  setStepperLayoutCallback(() => {
    handleSubmit(
      (data: Omit<Required<RegistrationState>, "profilePictureUri">) => {
        stateManager.updateRegistrationState({
          fullName: data.fullName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          gendersToShow: data.gendersToShow,
          description: data.description,
        });
        // @ts-ignore navigate TODO
        stepperNavigation.navigate(`${stepperNavigation.getState().index + 1}`);
      },
    )();
  });

  return (
    <View>
      <UserProfileForm control={control} errors={errors} />
    </View>
  );
}
