import lueur from '../assets/commons/blur_1024_red.png'
import {Image, View} from 'react-native';

export function LueurBackground() {
    return (
        <>
            <View style={{width: '100%', height: '100%', overflow: 'hidden', position: 'absolute'}}>
                <Image source={lueur} style={{
                    width: 1024, height: 1024, ...{
                        top: 0,
                        left: 0,
                    }, position: 'absolute'
                }}/>
            </View>
            <View style={{width: '100%', height: '100%', overflow: 'hidden', position: 'absolute'}}>
                <Image source={lueur} style={{
                    width: 1024, height: 1024, ...{
                        bottom: 0,
                        right: 0,
                    }, position: 'absolute'
                }}/>
            </View>
        </>
    )
}
