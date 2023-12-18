import React from 'react';
import {Text, View} from 'react-native';
import {getGlobalInstance} from "../src/tsyringe/diUtils";
import LanguageService from "../src/services/LanguageService/LanguageService";
import ServiceInterface from "../src/tsyringe/ServiceInterface";
import useEStyles from "../src/hooks/useEStyles";
import {BaseButton, BaseButtonTheme} from "../src/components/Buttons/BaseButton";
import {IconName} from "../src/components/Icons/IconName";
import { SafeAreaView } from 'react-native-safe-area-context'

type HomeScreenProps = {}

export default function HomeScreen({}: HomeScreenProps): JSX.Element {
    const languageService = getGlobalInstance<LanguageService>(
        ServiceInterface.LanguageServiceI,
    );
    const I18n = languageService.useTranslation();
    const styles = useEStyles({
        mainContainer: {
            flex: 1,
            backgroundColor: '$backgroundColor',
        },
        footer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: '$spacer6',
            marginVertical: '$spacer6',
        },
        footerButton: {
            marginHorizontal: '$spacer1',
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: '$spacer6',
            marginVertical: '$spacer6',
        },
        content: {
            flex: 1,
            paddingHorizontal: '$spacer6',
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            color: '$secondaryColor',
            fontSize: '1.2rem',
            fontWeight: 'bold',
        },
        subtitle: {
            color: '$secondaryColor',
            textAlign: 'center',
        },
    });

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.header}>
                <BaseButton
                    color={'$secondaryColor'}
                    theme={BaseButtonTheme.OUTLINED}
                    content={I18n.t('common.profile')}
                />
                <BaseButton
                    color={'$secondaryColor'}
                    theme={BaseButtonTheme.OUTLINED}
                    content={I18n.t('common.matches')}
                />
            </View>
            <View style={styles.content}>
                <Text>{I18n.t('common.toImplement')}</Text>
            </View>
            <View style={styles.footer}>
                <BaseButton
                    icon={IconName.X_CROSS}
                    color={'$secondaryColor'}
                    theme={BaseButtonTheme.OUTLINED}
                    style={styles.footerButton}
                />
                <BaseButton
                    icon={IconName.RED_HEART}
                    color={'$secondaryColor'}
                    theme={BaseButtonTheme.OUTLINED}
                    style={styles.footerButton}
                />
            </View>
        </SafeAreaView>
    );
};
