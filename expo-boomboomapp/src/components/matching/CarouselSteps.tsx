import {useEffect, useRef} from "react";
import {Animated, View} from "react-native";
import {Item} from "./beans/Item";


type CarouselStepsProps = {
    items: Item[]
    idxItemActive: number
}

// TODO add styles pattern and I18n

export function CarouselSteps({items, idxItemActive}: CarouselStepsProps) {
    return (
        <View style={{gap: 3, flexDirection: 'row'}}>
            {items.map(item =>
                <ProgressionItem key={item.idx} isActive={item.idx === idxItemActive}/>
            )}
        </View>
    )
}


type ProgressionItemProps = {
    isActive: boolean
}

function ProgressionItem({isActive}: ProgressionItemProps) {
    const widthAnim = useRef(new Animated.Value(8)).current;

    useEffect(() => {
        Animated.timing(widthAnim, {
            toValue: isActive ? 16 : 8,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isActive]);

    return (
        <Animated.View style={{height: 8, width: widthAnim, borderRadius: 20, backgroundColor: '#d7d7d7'}}/>
    )
}
