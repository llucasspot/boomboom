import {LayoutChangeEvent, View} from "react-native";
import {useEffect, useState} from "react";
import {Profile} from "./beans/Profile";
import {CardHeader} from "./CardHeader";
import {Carousel} from "./Carousel";
import {CarouselSteps} from "./CarouselSteps";
import {Item} from "./beans/Item";

type CardContentProps = {
    profile: Profile,
    setCurrentIdBackground: React.Dispatch<React.SetStateAction<string | null>>
}

// TODO add styles pattern and I18n

export function CardContent({profile, setCurrentIdBackground}: CardContentProps) {

    const [idxItemActive, setIdxItemActive] = useState<number>(0);
    const [carouselWidth, setCarouselWidth] = useState(200);

    const carouselItems = buildItems(profile);

    useEffect(() => {
        setCurrentIdBackground(profile.songs[idxItemActive] ? profile.songs[idxItemActive].trackId : null);
    }, [idxItemActive]);

    function onLayout(event: LayoutChangeEvent) {
        setCarouselWidth(event.nativeEvent.layout.width);
    }

    return (
        <>
            <CardHeader user={profile.user} sayOnlyHello={idxItemActive === carouselItems.length - 1}/>
            <View onLayout={onLayout} style={{width: '100%', flex: 1, alignItems: 'center'}}>
                <Carousel
                    idxItemActive={idxItemActive}
                    setIdxItemActive={setIdxItemActive}
                    carouselWidth={carouselWidth}
                    items={carouselItems}
                ></Carousel>
                <View style={{height: 20}}></View>
                <CarouselSteps
                    idxItemActive={idxItemActive}
                    items={carouselItems}
                />
                <View style={{height: 20}}></View>
            </View>
        </>
    )
}

function buildItems({user, songs}: Profile): Item[] {

    let items = [
        ...songs.map(song => ({...song, type: 'SONG'})),
        {type: 'USER', ...user},
    ];

    // Add indexes
    items = items.map((item, index) => ({...item, idx: index}));

    return items as Item[];
}
