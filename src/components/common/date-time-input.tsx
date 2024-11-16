import React from "react"
import moment from "moment"
import { fontStyles } from "../../styles"
import Colors from "../../constants/colors"
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'

interface DateTimeInputProps {
    star: boolean;
    containerStyle?: ViewStyle;
    textInputStyle?: TextStyle;
    textStyle?: TextStyle;
    onChangeText: (name: string, date: string) => void;
    value: string;
    name: string;
    mode: 'date' | 'countdown' | 'datetime' | 'time';
    placeholder: string;
}

const DateTimeInput = ({ placeholder, star, containerStyle, textInputStyle, textStyle, onChangeText, value, name, mode }: DateTimeInputProps) => {

    const [show, setShow] = React.useState(false);
    const [current, setCurrent] = React.useState(new Date(Date.now()))

    return (

        <View style={[styles.container, containerStyle]}>
            <Text
                onPress={() => {
                    setShow(true)
                }}
                style={[styles.textinput, fontStyles.r3, textInputStyle,]}
            // onChangedText={(data) => {
            //     onChangeText(name, data)
            // }}
            >{value}</Text>


            {
                value.length == 0 ?
                    <Text style={[styles.text, fontStyles.r3, textStyle, { opacity: .5 }]} numberOfLines={1} ellipsizeMode="tail" >
                        <Text style={{ letterSpacing: 1 }}>{placeholder}</Text>
                        {star && <Text style={{ color: Colors.brown, }}> *</Text>}
                    </Text>
                    : null
            }
            {show ?
                <DateTimePicker
                    mode={mode}
                    display="default"
                    value={current}
                    is24Hour={true}
                    onChange={(event, selectedDate) => {
                        setShow(false)
                        if (selectedDate) {
                            if (mode === "date") {
                                onChangeText(name, moment(selectedDate).format("YYYY-MM-DD"))
                            } else {
                                onChangeText(name, moment(selectedDate).set('seconds', 0).format("HH:mm:ss"))
                            }
                            setCurrent(selectedDate)
                        }
                    }}
                />
                :
                null
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        justifyContent: "center",
        height: 60,
        borderWidth: 0.7,
        borderRadius: 10,
        borderColor: Colors.grey,
        marginVertical: 10,
    },
    textinput: {
        color: "#312D2D",
        paddingHorizontal: 15,
        zIndex: 1,

    },
    text: {
        position: "absolute",
        marginLeft: 15,
        opacity: .5,
        zIndex: -1
    }
})

export default DateTimeInput