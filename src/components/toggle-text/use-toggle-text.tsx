import React from 'react';
import { Text } from 'react-native';
import { Colors } from '../../constants';
import { fontStyles } from '../../styles';

type ToggleTextProps = {
    input: string;
    maxLength?: number;
};

type GetTruncatedValueProps = {
    value: string;
    open: boolean;
    maxLength?: number;
};

type ReturnType = {
    textToShow: string;
    onToggle?: () => void;
    ToggleText: JSX.Element;
};

const useToggleText = ({ input, maxLength = 60 }: ToggleTextProps): ReturnType => {
    const [state, setState] = React.useState({
        open: false,
        displayValue: !input.length ? '-' : input.length >= maxLength ? input.substring(0, maxLength) + '...' : input,
    });

    // Memoize the getTruncatedValue function to avoid recreation on every render
    const getTruncatedValue = React.useCallback(
        ({ value, open, maxLength }: GetTruncatedValueProps) => {
            if (open || value.length <= maxLength!) {
                return value;
            }
            return value.substring(0, maxLength) + '...';
        }, []);

    const onToggle = () => {
        // Only update state if the value has actually changed
        setState((prevState) => {
            const newOpen = !prevState.open;
            const newDisplayValue = getTruncatedValue({ value: input, open: newOpen, maxLength });

            // Only update if the new state is different
            if (newOpen === prevState.open && newDisplayValue === prevState.displayValue) {
                return prevState;
            }

            return {
                open: newOpen,
                displayValue: newDisplayValue,
            };
        });
    };

    const ToggleText = input?.length > maxLength ? (
        <Text style={{ textDecorationLine: 'underline', ...fontStyles.r14, color: Colors.blue, alignSelf: 'flex-end' }} onPress={onToggle}>
            {state.open ? 'Show Less' : 'Show More'}
        </Text>
    ) : <></>;
    return {
        textToShow: state.displayValue,
        ToggleText,
    };
};

export default useToggleText;