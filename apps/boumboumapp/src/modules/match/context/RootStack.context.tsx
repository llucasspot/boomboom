import { UserInfoData } from "@boumboum/swagger-backend";
import React, { createContext, PropsWithChildren, useContext } from "react";

interface RootStackContextData {
  userInfo: UserInfoData;
  avatarUri: string | undefined;
}

// @ts-ignore
const RootStackContext = createContext<RootStackContextData>();

export const useRootStackContext = () => {
  const context = useContext(RootStackContext);
  if (!context) {
    throw new Error(
      "useRootStackContext must be used within a RootStackContextProvider",
    );
  }
  return context;
};

type RootStackContextProviderProps = PropsWithChildren<{
  contextData: RootStackContextData;
}>;
export function RootStackContextProvider({
  children,
  contextData,
}: RootStackContextProviderProps) {
  return (
    <RootStackContext.Provider value={contextData}>
      {children}
    </RootStackContext.Provider>
  );
}
