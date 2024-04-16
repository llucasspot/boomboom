import { ProfileData, UserInfo } from "@boumboum/swagger-backend";
import React, { createContext, PropsWithChildren, useContext } from "react";

import { ActionState, Observer } from "#modules/match/hooks/useObserver.hook";
import { Value } from "#modules/match/hooks/useValue.hook";

interface HomeScreenContextData {
  matchedUser: Value<UserInfo | undefined>;
  userOnTop: Value<ProfileData | undefined>;
  actionObserver: Observer<ActionState>;
  currentIdBackground: Value<string | undefined>;
}

// @ts-ignore
const HomeScreenContext = createContext<HomeScreenContextData>();

export const useHomeScreenContext = () => {
  const context = useContext(HomeScreenContext);
  if (!context) {
    throw new Error(
      "useHomeScreenContext must be used within a HomeScreenContextProvider",
    );
  }
  return context;
};

type RootStackContextProviderProps = PropsWithChildren<{
  contextData: HomeScreenContextData;
}>;

export function RootStackContextProvider({
  children,
  contextData,
}: RootStackContextProviderProps) {
  return (
    <HomeScreenContext.Provider value={contextData}>
      {children}
    </HomeScreenContext.Provider>
  );
}
