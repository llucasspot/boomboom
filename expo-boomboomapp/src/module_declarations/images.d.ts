declare module '*.jpg' {
  import {ImageSourcePropType} from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.png' {
  import {ImageSourcePropType} from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
