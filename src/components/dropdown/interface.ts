import { ViewStyle } from "react-native";

interface PickerProps {
    close: () => void;
    show: boolean;
    name: string;
    data: any;
    value: string;
    onSelect: (name: string, item: any) => void;
};


interface DropdownButtonprops {
    placeholder: string
    value: string
    star?: boolean
    onPress?: () => void
    wrapperStyle?: ViewStyle
    name?: string
    data?: string | Array<any>
    loading?: boolean
    disabled?: boolean
    onSelect: (name: string, item: any) => void;
}



export type { PickerProps, DropdownButtonprops }