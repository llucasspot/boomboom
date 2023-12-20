import {singleton} from 'tsyringe';
import {SpotifyApiServiceI} from "./SpotifyApiServiceI";

@singleton()
export class SpotifyApiMockService implements SpotifyApiServiceI {

    async fetchTop5Tracks() {
        const tracks = await this.fetchTracksNyName()
        return tracks.slice(0, 5);
    }

    fetchTracksNyName(name?:string) {
        const trackId = " zrkjbgjhzrg-gergzegzeg-gegeztg";
        return Promise.resolve([
            {name: 'Flex', artistName: 'Arma Jackson', image: require('../../assets/mokes/songs/1.png'), trackId},
            {
                name: 'Jamais',
                artistName: 'Mister V',
                image: require('../../assets/mokes/songs/2.png'),
                trackId: `${trackId}2`
            },
            {
                name: 'Feed good',
                artistName: 'Julien Granel',
                image: require('../../assets/mokes/songs/3.png'),
                trackId: `${trackId}3`
            },
            {
                name: 'Need Some Mo',
                artistName: 'Ko Ko Mo',
                image: require('../../assets/mokes/songs/4.png'),
                trackId: `${trackId}4`
            },
            {
                name: 'Street and Stories',
                artistName: 'Part-Time friends',
                image: require('../../assets/mokes/songs/5.jpg'),
                trackId: `${trackId}5`
            },
            {
                name: 'Quand je marche',
                artistName: 'Ben Mazué',
                image: require('../../assets/mokes/songs/paradis.jpg'),
                trackId: `${trackId}6`
            },
        ].filter(song => {
            return name ? song.name.toLowerCase().includes(name.toLowerCase()) : true
        }))
    }
}
