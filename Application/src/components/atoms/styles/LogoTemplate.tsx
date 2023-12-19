import { Image } from 'react-native';

type Props = {
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
};

export default function LogoTemplate(props?: Readonly<Props>) {
  return (
    <Image
      width={props?.style?.width ?? 250}
      height={props?.style?.height ?? 250}
      resizeMode="stretch"
      style={props?.style}
      source={require('../../../assets/logo.png')}
    />
  );
}
