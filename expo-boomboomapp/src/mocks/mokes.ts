import { v4 as uuidv4 } from "uuid";

import {
  ProfileI,
  StackProfileI,
} from "../api/ProfileApiService/ProfileApiServiceI";
import { Track } from "../api/SpotifyApiService/SpotifyApiServiceI";
import { Gender } from "../services/UserService/userServiceI";

export const songs: Track[] = [
  {
    name: "Quand je marche",
    artistName: "Ben Mazué",
    image: require("../assets/mokes/songs/paradis.jpg"),
    trackId: uuidv4(),
    uri: "",
  },
  {
    name: "Flex",
    artistName: "Arma Jackson",
    image: require("../assets/mokes/songs/1.png"),
    trackId: uuidv4(),
    uri: "",
  },
  {
    name: "Jamais",
    artistName: "Mister V",
    image: require("../assets/mokes/songs/2.png"),
    trackId: uuidv4(),
    uri: "",
  },
  {
    name: "Feed good",
    artistName: "Julien Granel",
    image: require("../assets/mokes/songs/3.png"),
    trackId: uuidv4(),
    uri: "",
  },
  {
    name: "Need Some Mo",
    artistName: "Ko Ko Mo",
    image: require("../assets/mokes/songs/4.png"),
    trackId: uuidv4(),
    uri: "",
  },
  {
    name: "Street and Stories",
    artistName: "Part-Time friends",
    image: require("../assets/mokes/songs/5.jpg"),
    trackId: uuidv4(),
    uri: "",
  },
];

export const user_jessica: StackProfileI = {
  user: {
    id: uuidv4(),
    name: "Jessica",
    image: require("../assets/mokes/jessica.png"),
  },
  songs: [
    {
      name: "Quand je marche",
      artistName: "Ben Mazué",
      image: require("../assets/mokes/songs/paradis.jpg"),
      trackId: uuidv4(),
      uri: "",
    },
    {
      name: "Flex",
      artistName: "Arma Jackson",
      image: require("../assets/mokes/songs/1.png"),
      trackId: uuidv4(),
      uri: "",
    },
    {
      name: "Jamais",
      artistName: "Mister V",
      image: require("../assets/mokes/songs/2.png"),
      trackId: uuidv4(),
      uri: "",
    },
    {
      name: "Feed good",
      artistName: "Julien Granel",
      image: require("../assets/mokes/songs/3.png"),
      trackId: uuidv4(),
      uri: "",
    },
    {
      name: "Need Some Mo",
      artistName: "Ko Ko Mo",
      image: require("../assets/mokes/songs/4.png"),
      trackId: uuidv4(),
      uri: "",
    },
  ],
};

export const user_yohan: ProfileI = {
  user_id: uuidv4(),
  date_of_birth: "01/01/1980",
  description: "Yohan description",
  avatar: require("../assets/mokes/yohan.png"),
  prefered_gender_id: Gender.MALE,
  userId: uuidv4(),
  // TODO name & trackIds is not send my backend in getProfile endpoint
  name: "Yohan",
  trackIds: songs.splice(0, 5).map((track) => track.trackId),
};

export const user_helena: StackProfileI = {
  user: {
    id: uuidv4(),
    name: "Helena",
    image: require("../assets/mokes/helena.webp"),
  },
  songs: [
    {
      name: "Quand je marche",
      artistName: "Ben Mazué",
      image: require("../assets/mokes/songs/paradis.jpg"),
      trackId: uuidv4(),
      uri: "",
    },
    {
      name: "Flex",
      artistName: "Arma Jackson",
      image: require("../assets/mokes/songs/1.png"),
      trackId: uuidv4(),
      uri: "",
    },
    {
      name: "Jamais",
      artistName: "Mister V",
      image: require("../assets/mokes/songs/2.png"),
      trackId: uuidv4(),
      uri: "",
    },
    {
      name: "Need Some Mo",
      artistName: "Ko Ko Mo",
      image: require("../assets/mokes/songs/4.png"),
      trackId: uuidv4(),
      uri: "",
    },
    {
      name: "Street and Stories",
      artistName: "Part-Time friends",
      image: require("../assets/mokes/songs/5.jpg"),
      trackId: uuidv4(),
      uri: "",
    },
  ],
};

export const user_isabella: StackProfileI = {
  user: {
    id: uuidv4(),
    name: "Isabella",
    image: require("../assets/mokes/isabella.png"),
  },
  songs: [
    {
      name: "Flex",
      artistName: "Arma Jackson",
      image: require("../assets/mokes/songs/1.png"),
      trackId: uuidv4(),
      uri: "",
    },
    {
      name: "Jamais",
      artistName: "Mister V",
      image: require("../assets/mokes/songs/2.png"),
      trackId: uuidv4(),
      uri: "",
    },
    {
      name: "Feed good",
      artistName: "Julien Granel",
      image: require("../assets/mokes/songs/3.png"),
      trackId: uuidv4(),
      uri: "",
    },
    {
      name: "Need Some Mo",
      artistName: "Ko Ko Mo",
      image: require("../assets/mokes/songs/4.png"),
      trackId: uuidv4(),
      uri: "",
    },
    {
      name: "Street and Stories",
      artistName: "Part-Time friends",
      image: require("../assets/mokes/songs/5.jpg"),
      trackId: uuidv4(),
      uri: "",
    },
  ],
};
