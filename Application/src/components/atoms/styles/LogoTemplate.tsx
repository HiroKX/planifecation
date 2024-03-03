import { Image } from 'react-native';

type Props = {
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
};

export default function LogoTemplate(props?: Readonly<Props>) {
  return (
    <Image style={props?.style} source={require('../../../assets/logo.png')} />
  );
}
