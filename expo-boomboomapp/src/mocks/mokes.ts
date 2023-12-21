import {v4 as uuidv4} from "uuid";
import {Track} from "../api/SpotifyApiService/SpotifyApiServiceI";
import {ProfileI, StackProfileI} from "../api/ProfileApiService/ProfileApiServiceI";
import {Gender} from "../services/UserService/userServiceI";

export const songs: Track[] = [
    {
        name: 'Quand je marche',
        artistName: 'Ben Mazué',
        image: require('../assets/mokes/songs/paradis.jpg'),
        trackId: uuidv4()
    },
    {
        name: 'Flex',
        artistName: 'Arma Jackson',
        image: require('../assets/mokes/songs/1.png'),
        trackId: uuidv4()
    },
    {
        name: 'Jamais',
        artistName: 'Mister V',
        image: require('../assets/mokes/songs/2.png'),
        trackId: uuidv4()
    },
    {
        name: 'Feed good',
        artistName: 'Julien Granel',
        image: require('../assets/mokes/songs/3.png'),
        trackId: uuidv4()
    },
    {
        name: 'Need Some Mo',
        artistName: 'Ko Ko Mo',
        image: require('../assets/mokes/songs/4.png'),
        trackId: uuidv4()
    },
    {
        name: 'Street and Stories',
        artistName: 'Part-Time friends',
        image: require('../assets/mokes/songs/5.jpg'),
        trackId: uuidv4()
    },
];

export const user_jessica: StackProfileI = {
    user: {
        id: uuidv4(),
        name: 'Jessica',
        image: require('../assets/mokes/jessica.png')
    },
    songs: [
        {
            name: 'Quand je marche',
            artistName: 'Ben Mazué',
            image: require('../assets/mokes/songs/paradis.jpg'),
            trackId: uuidv4()
        },
        {
            name: 'Flex',
            artistName: 'Arma Jackson',
            image: require('../assets/mokes/songs/1.png'),
            trackId: uuidv4()
        },
        {
            name: 'Jamais',
            artistName: 'Mister V',
            image: require('../assets/mokes/songs/2.png'),
            trackId: uuidv4()
        },
        {
            name: 'Feed good',
            artistName: 'Julien Granel',
            image: require('../assets/mokes/songs/3.png'),
            trackId: uuidv4()
        },
        {
            name: 'Need Some Mo',
            artistName: 'Ko Ko Mo',
            image: require('../assets/mokes/songs/4.png'),
            trackId: uuidv4()
        },
    ]
};

export const user_yohan: ProfileI = {
    id: uuidv4(),
    dateOfBirth: '01/01/1980',
    description: "Yohan description",
    avatar: require('../assets/mokes/yohan.png'),
    preferedGenderId: Gender.MALE,
    userId: uuidv4(),
    // TODO name & trackIds is not send my backend in getProfile endpoint
    name: 'Yohan',
    trackIds: songs.splice(0, 5).map(track => track.trackId)
};

export const user_helena: StackProfileI = {
    user: {
        id: uuidv4(),
        name: 'Helena',
        image: require('../assets/mokes/helena.webp')
    },
    songs: [
        {
            name: 'Quand je marche',
            artistName: 'Ben Mazué',
            image: require('../assets/mokes/songs/paradis.jpg'),
            trackId: uuidv4()
        },
        {
            name: 'Flex',
            artistName: 'Arma Jackson',
            image: require('../assets/mokes/songs/1.png'),
            trackId: uuidv4()
        },
        {
            name: 'Jamais',
            artistName: 'Mister V',
            image: require('../assets/mokes/songs/2.png'),
            trackId: uuidv4()
        },
        {
            name: 'Need Some Mo',
            artistName: 'Ko Ko Mo',
            image: require('../assets/mokes/songs/4.png'),
            trackId: uuidv4()
        },
        {
            name: 'Street and Stories',
            artistName: 'Part-Time friends',
            image: require('../assets/mokes/songs/5.jpg'),
            trackId: uuidv4()
        },
    ]
};

export const user_isabella: StackProfileI = {
    user: {
        id: uuidv4(),
        name: 'Isabella',
        image: require('../assets/mokes/isabella.png')
    },
    songs: [
        {
            name: 'Flex',
            artistName: 'Arma Jackson',
            image: require('../assets/mokes/songs/1.png'),
            trackId: uuidv4()
        },
        {
            name: 'Jamais',
            artistName: 'Mister V',
            image: require('../assets/mokes/songs/2.png'),
            trackId: uuidv4()
        },
        {
            name: 'Feed good',
            artistName: 'Julien Granel',
            image: require('../assets/mokes/songs/3.png'),
            trackId: uuidv4()
        },
        {
            name: 'Need Some Mo',
            artistName: 'Ko Ko Mo',
            image: require('../assets/mokes/songs/4.png'),
            trackId: uuidv4()
        },
        {
            name: 'Street and Stories',
            artistName: 'Part-Time friends',
            image: require('../assets/mokes/songs/5.jpg'),
            trackId: uuidv4()
        },
    ]
};
