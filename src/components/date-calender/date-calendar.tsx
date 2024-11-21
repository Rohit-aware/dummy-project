import React from "react";
import moment from "moment";
import { fontStyles } from "../../styles";
import { Colors } from "../../constants";
import Calendar from "../../../assets/images/Calendar";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { helpers } from "../../utility";


const DateCalendar = ({ date, onDateChange }: { date: string, onDateChange: (value1: string, value2: string) => void }) => {
    const { getDateString } = helpers
    const [show, setShow] = React.useState(false);
    const [current, setCurrent] = React.useState(new Date(Date.now()))


    return (
        <View style={styles.container} >
            <Text style={styles.dateText}>Date : {date}</Text>
            <TouchableOpacity onPress={() => setShow(true)} >
                <Calendar height={23} />
            </TouchableOpacity>
            {/* <Dots /> */}

            {show ?
                <DateTimePicker

                    mode={"date"}
                    display="default"
                    value={current}
                    is24Hour={true}
                    onChange={(event, selectedDate) => {
                        setShow(false)
                        if (selectedDate) {
                            onDateChange(moment(selectedDate).format("YYYY-MM-DD"), getDateString(selectedDate.toDateString()))
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

export default DateCalendar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 30,
        justifyContent: "space-between",
        marginHorizontal: 15
    },
    dateText: {
        ...fontStyles.r3,
        color: Colors.black
    }
})