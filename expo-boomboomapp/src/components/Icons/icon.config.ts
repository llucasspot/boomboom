import { ImageSourcePropType } from "react-native";

import { IconName } from "./IconName";
import { IconTheme } from "./IconTheme";
import aniBg from "../../assets/bg-ani.svg";
import check from "../../assets/check.svg";
import edit from "../../assets/edit.svg";
import arrowLeft from "../../assets/feather_icons/arrow-letf.svg";
import arrowRight from "../../assets/feather_icons/arrow-right.svg";
import plus from "../../assets/feather_icons/plus.svg";
import search from "../../assets/feather_icons/search.svg";
import trash2 from "../../assets/feather_icons/trash-2.svg";
import femaleGender from "../../assets/femaleGender.svg";
import heart from "../../assets/heart.png";
import boomboomLogo from "../../assets/logo.png";
import boomboomText from "../../assets/logo_text.svg";
import maleGender from "../../assets/maleGender.svg";
import noSpecificGender from "../../assets/noSpecificGender.svg";
import pfp from "../../assets/pfp.png";
import spotifyLogo from "../../assets/spotify.png";
import xCross from "../../assets/x-cross.svg";
import boomboomLogoWithboomboomText from "../../assets/zoom_logo.svg";
import bigBoomboomLogo from "../../assets/zoom_logo_only.png";

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
  [IconName.ARROW_LEFT]: [
    {
      theme: IconTheme.FEATHER,
      svg: arrowLeft,
    },
  ],
  [IconName.ARROW_RIGHT]: [
    {
      theme: IconTheme.FEATHER,
      svg: arrowRight,
    },
  ],
  [IconName.TRASH]: [
    {
      theme: IconTheme.FEATHER,
      svg: trash2,
    },
  ],
  [IconName.SEARCH]: [
    {
      theme: IconTheme.FEATHER,
      svg: search,
    },
  ],
  [IconName.PLUS]: [
    {
      theme: IconTheme.FEATHER,
      svg: plus,
    },
  ],
};

export default iconConfig;
