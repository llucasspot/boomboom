import { ProfileData, UserInfo } from "@boumboum/swagger-backend";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ComponentProps, useEffect, useMemo } from "react";
import {
  Image,
  ImageStyle,
  Modal,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { SafeAreaView } from "react-native-safe-area-context";

import { BaseText } from "#components/texts/BaseText";
import { MatchsApiServiceI } from "#modules/api/services/MatchApi/matchs-api.serviceI";
import { MatchsRequestsApiServiceI } from "#modules/api/services/MatchApii/matchs-requests-api.serviceI";
import { diService } from "#modules/core/di/di-utils";
import {
  RootStackParamsList,
  RootStackScreen,
} from "#modules/match/Root.stack";
import { IMAGES } from "#modules/match/assets/images";
import { Track } from "#modules/match/beans";
import { BlurredBackground } from "#modules/match/components/BlurredBackground";
import { Card } from "#modules/match/components/Card/Card";
import { MainAnimationsMatchScreen } from "#modules/match/components/MainAnimationsMatchScreen/MainAnimationsMatchScreen";
import { MenuHeader } from "#modules/match/components/MenuHeader";
import { RootStackContextProvider } from "#modules/match/context/HomeScreen.context";
import {
  ActionState,
  useObserver,
} from "#modules/match/hooks/useObserver.hook";
import { useValue, Value } from "#modules/match/hooks/useValue.hook";
import { MatchScreen } from "#modules/match/screens/Match.screen";

type HomeScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  RootStackScreen.HOME
>;

type StackProfileData = ProfileData & {
  key: string;
};

export function HomeScreen(props: HomeScreenProps): JSX.Element {
  // @ts-ignore interface
  const matchsApiService = diService.getInstance(MatchsApiServiceI);
  const matchsRequestsApiService = diService.getInstance(
    // @ts-ignore interface
    MatchsRequestsApiServiceI,
  );

  const {
    data: profiless,
    hasNextPage,
    fetchNextPage,
  } = matchsApiService.useInfiniteProfiles();
  const profiles = useMemo(
    () =>
      (profiless ?? { pages: [] }).pages.flatMap((page, index) => {
        return page.data.map((data): StackProfileData => {
          return {
            key: data.userInfo.id + page.currentPage,
            ...data,
          };
        });
      }),
    [profiless],
  );
  const loadMoreProfiles = () => {
    console.log(hasNextPage);
    if (hasNextPage) fetchNextPage();
  };

  const {
    mutate: sendMatchRequestToUser,
    data: sendMatchRequestToUserResponse,
  } = matchsRequestsApiService.useSendMatchRequestToUser();

  const actionObserver = useObserver<ActionState>();
  const isLoading = useValue(false);

  const currentIdBackground = useValue<Track["trackId"] | undefined>(undefined);
  const matchedUser = useValue<UserInfo | undefined>(undefined);
  const userOnTop = useValue<ProfileData | undefined>(undefined);
  const stackProfiles = useValue<StackProfileData[]>([]);

  useEffect(() => {
    if (profiles) {
      stackProfiles.set(profiles);
    }
  }, [profiles]);

  useEffect(() => {
    const cb = actionObserver.subscribe(({ user }) => {
      // observer to pop the profile from stack
      isLoading.set(true);
      setTimeout(() => {
        isLoading.set(false);
        stackProfiles.set((stackProfiles) =>
          stackProfiles.filter(
            (profile) => profile.userInfo.id !== user.userInfo.id,
          ),
        );
      }, 400);
    });
    return () => {
      actionObserver.unsubscribe(cb);
    };
  }, []);

  useEffect(() => {
    const cb = actionObserver.subscribe(({ action, user }) => {
      // observer send match request
      if (action === "dislike") {
        return;
      }
      sendMatchRequestToUser(user.userInfo.id);
    });
    return () => {
      actionObserver.unsubscribe(cb);
    };
  }, []);

  useEffect(() => {
    if (!sendMatchRequestToUserResponse) {
      return;
    }
    if (!sendMatchRequestToUserResponse.data.isMatch) {
      return;
    }
    matchedUser.set(sendMatchRequestToUserResponse.data.userInfo);
  }, [sendMatchRequestToUserResponse]);

  useEffect(() => {
    if (stackProfiles.get[0]) {
      userOnTop.set(stackProfiles.get[0]);
    }
    if (stackProfiles.get.length === 3) {
      loadMoreProfiles();
    }
  }, [stackProfiles]);

  if (!stackProfiles.get) {
    return <BaseText i18nKey="match.HomeScreen.noProfileToShow" />;
  }

  function onFavUser() {
    if (!userOnTop.get) {
      return;
    }
    actionObserver.publish({
      action: "like",
      user: userOnTop.get,
    });
  }

  function onDislikeUser() {
    if (!userOnTop.get) {
      return;
    }
    actionObserver.publish({
      action: "dislike",
      user: userOnTop.get,
    });
  }

  return (
    <RootStackContextProvider
      contextData={{
        matchedUser,
        userOnTop,
        actionObserver,
        currentIdBackground,
      }}
    >
      <MatchModal
        matchedUser={matchedUser}
        onRequestClose={() => {
          matchedUser.set(undefined);
        }}
      />
      <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
        <BlurredBackground stackProfiles={stackProfiles.get} />

        <MenuHeader />

        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: 400,
              maxHeight: 600,
            }}
          >
            {stackProfiles.get.map((profile, index) => {
              return <Card index={index} key={profile.key} profile={profile} />;
            })}
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={IMAGES.matching.ellipse}
            style={styles.image_ellipse as ImageStyle}
          />
          <View style={{ flexDirection: "row", gap: 30, marginVertical: 20 }}>
            <TouchableOpacity
              style={styles.roundedButton as ImageStyle}
              onPress={onDislikeUser}
            >
              <Image
                source={IMAGES.matching.nope}
                style={{ width: 34 / 2, height: 34 / 2 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundedButton as ViewStyle}
              onPress={onFavUser}
            >
              <Image
                source={IMAGES.matching.yes}
                style={{ width: 53 / 2, height: 49 / 2 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </RootStackContextProvider>
  );
}

type MatchModalProps = {
  onRequestClose: () => void;
  matchedUser: Value<
    ComponentProps<typeof MainAnimationsMatchScreen>["matchedUser"] | undefined
  >;
};

function MatchModal({ onRequestClose, matchedUser }: MatchModalProps) {
  return (
    <Modal
      animationType="slide"
      statusBarTranslucent
      transparent={false}
      visible={!!matchedUser.get}
      onRequestClose={onRequestClose}
    >
      {!!matchedUser.get && (
        <>
          <MatchScreen
            matchedUser={matchedUser.get}
            onClose={() => matchedUser.set(undefined)}
          />
        </>
      )}
    </Modal>
  );
}

const styles = {
  image_ellipse: {
    width: 390,
    height: 77,
    position: "absolute",
    bottom: Platform.OS === "ios" ? 0 : -20,
  },
  roundedButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: 64,
    height: 64,
    backgroundColor: "white",
    shadowColor: "#F2ADFF",
    shadowRadius: 20,
    shadowOpacity: 0.4,
    shadowOffset: { height: 20, width: 0 },
    elevation: 10,
  },
};
