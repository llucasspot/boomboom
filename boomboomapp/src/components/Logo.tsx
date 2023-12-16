import useEStyles from '../hooks/useEStyles';
import {Image, ImageStyle, View} from 'react-native';
import React from 'react';
import boomboomLogo from '../assets/logo.png';
import {SvgXml} from 'react-native-svg';
import boomboomLogoText from '../assets/logo_text.svg';

type LogoProps = {};

export const Logo = ({}: LogoProps): JSX.Element => {
  const styles = useEStyles({
    logoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoImageText: {
      width: '3rem',
      height: '3rem',
      marginRight: '$spacer4',
    },
  });

  return (
    <View style={styles.logoContainer}>
      <Image style={styles.logoImageText as ImageStyle} source={boomboomLogo} />
      <SvgXml width={'40%'} height={'100%'} xml={boomboomLogoText} />
    </View>
  );
};
