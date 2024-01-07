import { Canvas, useImage, Image, SkPath, Skia, Mask, Group, Rect, Path } from "@shopify/react-native-skia";
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { View, LayoutChangeEvent } from "react-native";
import { useCallback, useMemo, useRef, useState } from 'react';
import { svgPathProperties } from "svg-path-properties";
import { Todo } from "../../../models/Todo";

const STROKE_WIDTH = 10;

interface LayerProps  {
    width : number,
    height : number
}

interface TodoProps {
    returnFunc : (p : Todo) => void;
}


const CheckedView = ({width, height} : LayerProps) => {
    const checkedImage = useImage(require('../../../assets/images/check.png'));
    return (
        checkedImage && (
            <Image image={checkedImage} fit='contain' width={width} height={height} />
        )
    )
}

const CoveredView = ({width, height} : LayerProps) => {
    const coveredImage = useImage(require('../../../assets/images/clear.png'));
    return (
        coveredImage && (
            <Image image={coveredImage} fit='cover' width={width} height={height} />
        )
    )
}

export default function CheckTodo( props : Readonly<TodoProps>) {


    const [canvasLayoutMeta, setCanvasLayoutMeta] = useState({
        width : 0,
        height : 0,
    });
    const totalArea= useRef<number>(0);
    const [paths, setPaths] = useState<SkPath[]>([])
    const handleLayoutCanvas = useCallback((e : LayoutChangeEvent) => {
        const {width, height} = e.nativeEvent.layout;
        setCanvasLayoutMeta({width, height});
        console.log(`Canvas [width : ${width}, height ${height}]`);
    }, []);

    const checkTodoPan = Gesture.Pan().runOnJS(true)
    .onBegin(g => {
        const newPaths = [...paths];
        const path = Skia.Path.Make();
        path.moveTo(g.x, g.y);
        newPaths.push(path);
        setPaths(newPaths);
    })
    .onUpdate(g => {
        const newPaths = [...paths];
        const path = newPaths[newPaths.length-1];
        path.lineTo(g.x, g.y);
        setPaths(newPaths);
    })
    .onEnd(() => {
        const pathProperties = new svgPathProperties(
            paths[paths.length-1].toSVGString()
        );
        const pathArea = pathProperties.getTotalLength() * STROKE_WIDTH;
        totalArea.current += pathArea; 
        const {width, height} = canvasLayoutMeta;
        const areaCheckedPercentage = (totalArea.current / (width*height)) * 100;
        console.log("areaCheckedPercentage : " +areaCheckedPercentage);
        if(areaCheckedPercentage > 80) {
            props.returnFunc(props.item);
        }
    })
    .minDistance(1)

    const {width, height} = useMemo(() => canvasLayoutMeta, [canvasLayoutMeta]);

    return (
        <View style={{ width:200, height: 200, backgroundColor: 'blue'}}>
            <GestureHandlerRootView>
                <GestureDetector gesture={checkTodoPan}>
                        <Canvas onLayout={handleLayoutCanvas} style={{width: '100%', height: '100%'}}>
                            <CheckedView width={width} height={height} />
                            <Mask clip mode="luminance" mask={<Group>
                                <Rect
                                x={0}
                                y={0}
                                width={width}
                                height={height}
                                color='white'
                                />
                                {
                                    paths.map(p => (
                                        <Path
                                            key={p.toSVGString()}
                                            path={p}
                                            strokeWidth={STROKE_WIDTH}
                                            style="stroke"
                                            strokeJoin="round"
                                            strokeCap="round"
                                            antiAlias
                                            color='black' />
                                    ))
                                }
                            </Group>
                            }>
                                <CoveredView width={width} height={height} />
                            </Mask>
                        </Canvas>
                </GestureDetector>
            </GestureHandlerRootView>
        </View>
    );
}