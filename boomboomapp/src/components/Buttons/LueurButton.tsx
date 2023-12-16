import React from 'react';
import BaseButton, {BaseButtonProps} from './BaseButton';
import {SvgXml} from 'react-native-svg';
import lueurs from '../../assets/lueurs.svg';

export type LueurButtonProps = Omit<BaseButtonProps, 'content'> & {
  content: string | number;
};
export const LueurButton = ({
  color: _color,
  ...props
}: LueurButtonProps): JSX.Element => {
  return (
    <BaseButton
      {...props}
      color={_color ?? '$secondaryColor'}
      contentBackground={<SvgXml width={'100%'} height={'100%'} xml={lueurs} />}
    />
  );
};
