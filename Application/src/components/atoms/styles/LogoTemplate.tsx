import { Image } from 'react-native';

type Props = {
    width? : number,
    height? : number
}

export default function LogoTemplate(props? : Readonly<Props> ) {
    return (
        <Image width={props?.width ?? 250} height={props?.height ?? 250}
            resizeMode='stretch'
            style={{height: props?.height, width : props?.width}}
            source={require('../../../assets/logo.png')}/>
    );
}