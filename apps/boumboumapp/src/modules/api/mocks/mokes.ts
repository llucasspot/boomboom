import {
  SerializedTrack,
  UserInfoData,
  UserInfoProfileGendersToShowEnum,
} from "@boumboum/swagger-backend";

function uuidv4() {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
}

export const songs: SerializedTrack[] = [
  {
    name: "Quand je marche",
    artistNames: ["Ben Mazué"],
    // image: require("#assets/mokes/songs/paradis.jpg"),
    trackId: uuidv4(),
  },
  {
    name: "Flex",
    artistNames: ["Arma Jackson"],
    // image: require("#assets/mokes/songs/1.png"),
    trackId: uuidv4(),
  },
  {
    name: "Jamais",
    artistNames: ["Mister V"],
    // image: require("#assets/mokes/songs/2.png"),
    trackId: uuidv4(),
  },
  {
    name: "Feed good",
    artistNames: ["Julien Granel"],
    // image: require("#assets/mokes/songs/3.png"),
    trackId: uuidv4(),
  },
  {
    name: "Need Some Mo",
    artistNames: ["Ko Ko Mo"],
    // image: require("#assets/mokes/songs/4.png"),
    trackId: uuidv4(),
  },
  {
    name: "Street and Stories",
    artistNames: ["Part-Time friends"],
    // image: require("#assets/mokes/songs/5.jpg"),
    trackId: uuidv4(),
  },
];

export const user_yohan: UserInfoData = {
  id: uuidv4(),
  name: "Yohan",
  profile: {
    dateOfBirth: new Date("01/01/1980"),
    description: "Yohan description",
    gendersToShow: [UserInfoProfileGendersToShowEnum.Male],
    gender: UserInfoProfileGendersToShowEnum.Male,
    // TODO trackIds is not send my backend in getProfile endpoint
    // trackIds: songs.splice(0, 5).map((track) => track.trackId),
  },
};
