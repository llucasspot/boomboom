import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";

import {
  type UserFormData,
  UserProfileForm,
} from "../../matching/common/UserProfileForm";
import { StepProps } from "../RegisterStepper";

import { RegisterStackParamsList } from "#navigation/RegisterStackScreenNavigator/RegisterStack";
import RegistrationStateService from "#services/RegistrationStateService/RegistrationState.service";
import { Gender } from "#services/UserService/userServiceI";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { getGlobalInstance } from "#tsyringe/diUtils";

export function ProfileForm({
  setStepperLayoutCallback,
}: StepProps<RegisterStackParamsList>) {
  const registrationStateService = getGlobalInstance<RegistrationStateService>(
    ServiceInterface.RegistrationStateService,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    // TODO I18n
    // @ts-ignore TODO yupResolver
    resolver: yupResolver(
      yup.object().shape({
        fullName: yup
          .string()
          .matches(/^[a-zA-Z0-9]*$/, "Full name must be alphanumeric")
          .required("Full name is required"),
        dateOfBirth: yup
          // TODO .date() when data picker is up
          // .date()
          .string()
          .required("Date of birth is required"),
        genderId: yup
          .mixed<Gender>()
          .oneOf(Object.values(Gender) as Gender[], "Invalid gender")
          .required("Gender is required"),
        preferedGenderId: yup
          .mixed<Gender>()
          .oneOf(Object.values(Gender) as Gender[], "Invalid gender")
          .required("Prefered gender is required"),
        description: yup.string(),
      }),
    ),
    defaultValues: {
      genderId: Gender.NO_SPECIFIC,
      preferedGenderId: Gender.NO_SPECIFIC,
    },
  });

  setStepperLayoutCallback(({ navigateOnNextStep }) => {
    handleSubmit((data: UserFormData) => {
      registrationStateService.updateRegistrationState(data);
      navigateOnNextStep();
    })();
  });

  return (
    <View>
      <UserProfileForm control={control} errors={errors} />
    </View>
  );
}
