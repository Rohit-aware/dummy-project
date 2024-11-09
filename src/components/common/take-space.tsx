import React from 'react';
import { View } from 'react-native';

type TakeSpaceProps = { space?: number };

const TakeSpace = (Props: TakeSpaceProps) => {
    const { space = 16 } = Props
    return (<View style={{ padding: space }} />)
}
export default TakeSpace;