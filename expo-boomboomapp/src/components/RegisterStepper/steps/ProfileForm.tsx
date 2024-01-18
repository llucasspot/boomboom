import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as yup from "yup";

import UserService from "../../../services/UserService/UserService";
import { Gender } from "../../../services/UserService/userServiceI";
import ServiceInterface from "../../../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../../../tsyringe/diUtils";
import {
  type UserFormData,
  UserProfileForm,
} from "../../matching/common/UserProfileForm";
import { StepProps } from "../RegisterStepper";

export function ProfileForm({ setStepperLayoutCallback }: StepProps) {
  const userService = getGlobalInstance<UserService>(
    ServiceInterface.UserService,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    // TODO I18n
    // @ts-ignore TODO
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
        gender: yup
          .mixed<Gender>()
          .oneOf(Object.values(Gender) as Gender[], "Invalid gender")
          .required("Gender is required"),
        description: yup.string(),
      }),
    ),
    defaultValues: {
      gender: Gender.NO_SPECIFIC,
    },
  });

  setStepperLayoutCallback(({ navigateOnNextStep }) => {
    handleSubmit((data) => {
      userService.updateUserState(data);
      navigateOnNextStep();
    })();
  });

  return (
    <View>
      <UserProfileForm control={control} errors={errors} />
    </View>
  );
}
