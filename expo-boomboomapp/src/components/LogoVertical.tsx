import useEStyles from '../hooks/useEStyles';
import {Image, ImageStyle, View} from 'react-native';
import React from 'react';
import boomboomLogo from '../assets/logo.png';
import {SvgXml} from 'react-native-svg';
import boomboomLogoText from '../assets/logo_text.svg';

type LogoProps = {};

export const LogoVertical = ({}: LogoProps): JSX.Element => {
  const styles = useEStyles({
    logoContainer: {
      alignItems: 'center',
      height: '4rem',
    },
    logoImageText: {
      width: '2rem',
      height: '2rem',
    },
  });

  return (
    <View style={styles.logoContainer}>
      <Image style={styles.logoImageText as ImageStyle} source={boomboomLogo} />
      <SvgXml width={'40%'} height={'100%'} xml={boomboomLogoText} />
    </View>
  );
};
