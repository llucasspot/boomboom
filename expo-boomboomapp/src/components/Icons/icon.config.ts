import {ImageSourcePropType} from 'react-native';
import {IconName} from './IconName';
import {IconTheme} from './IconTheme';
import boomboomLogo from '../../assets/logo.png';
import boomboomText from '../../assets/logo_text.svg';
import boomboomLogoWithboomboomText from '../../assets/zoom_logo.svg';
import bigBoomboomLogo from '../../assets/zoom_logo_only.png';
import aniBg from '../../assets/bg-ani.svg';
import spotifyLogo from '../../assets/spotify.png';
import pfp from '../../assets/pfp.png';
import edit from '../../assets/edit.svg';
import femaleGender from '../../assets/femaleGender.svg';
import maleGender from '../../assets/maleGender.svg';
import noSpecificGender from '../../assets/noSpecificGender.svg';
import check from '../../assets/check.svg';
import heart from '../../assets/heart.png';
import xCross from '../../assets/x-cross.svg';

export type Svg = string;

export type IconConfig = {
  theme: IconTheme;
  svg: Svg | ImageSourcePropType;
};

export type IconsConfig = Record<IconName, IconConfig[]>;

const iconConfig: IconsConfig = {
  [IconName.BOOM_BOOM_LOGO]: [
    {
      theme: IconTheme.BOOMBOOM,
      svg: boomboomLogo,
    },
  ],
  [IconName.BACKGROUND]: [
    {
      theme: IconTheme.BOOMBOOM,
      svg: aniBg,
    },
  ],
  [IconName.BOOM_BOOM_LOGO_WITH_BOOM_BOOM_TEXT]: [
    {
      theme: IconTheme.BOOMBOOM,
      svg: boomboomLogoWithboomboomText,
    },
  ],
  [IconName.BOOM_BOOM_TEXT]: [
    {
      theme: IconTheme.BOOMBOOM,
      svg: boomboomText,
    },
  ],
  [IconName.BIG_BOOM_BOOM_LOGO]: [
    {
      theme: IconTheme.BOOMBOOM,
      svg: bigBoomboomLogo,
    },
  ],
  [IconName.SPOTIFY]: [
    {
      theme: IconTheme.BOOMBOOM,
      svg: spotifyLogo,
    },
  ],
  [IconName.PROFILE_EMPTY]: [
    {
      theme: IconTheme.BOOMBOOM,
      svg: pfp,
    },
  ],
  [IconName.EDIT]: [
    {
      theme: IconTheme.FEATHER,
      svg: edit,
    },
  ],
  [IconName.MALE_GENDER]: [
    {
      theme: IconTheme.FONTAWESOME_SOLID,
      svg: maleGender,
    },
  ],
  [IconName.FEMALE_GENDER]: [
    {
      theme: IconTheme.FONTAWESOME_SOLID,
      svg: femaleGender,
    },
  ],
  [IconName.NO_SPECIFIC_GENDER]: [
    {
      theme: IconTheme.FONTAWESOME_SOLID,
      svg: noSpecificGender,
    },
  ],
  [IconName.CHECK]: [
    {
      theme: IconTheme.FEATHER,
      svg: check,
    },
  ],
  [IconName.RED_HEART]: [
    {
      theme: IconTheme.BOOMBOOM,
      svg: heart,
    },
  ],
  [IconName.X_CROSS]: [
    {
      theme: IconTheme.BOOMBOOM,
      svg: xCross,
    },
  ],
};

export default iconConfig;
