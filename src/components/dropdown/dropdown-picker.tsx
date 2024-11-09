import React from 'react';
import { fontStyles } from '../../styles';
import { PickerProps } from './interface';
import { Colors, moderateScale } from '../../constants';
import { Text, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';


const Picker = ({ close, show, name, data, onSelect, value }: PickerProps) => {

    const getDisplaykey = ({ data }: any) => {
        if (typeof data === 'string') {
            return data;
        } else {
            const getDisplayValue = () => {
                switch (name) {
                    case 'state_name': return data['state_name'];
                    case 'project_status': return data['project_status'];
                    case 'city_name': return data['city_name'];
                    case 'requirement_types': return data['category_name'];
                    case 'country_id': return data['country_name'];
                    case 'gender': return data['full_name'];
                    case 'requirement': return data['category_name'];
                    case 'outsider_name': return data['nickname'];
                    case 'organization_name': return data['organization_name'];
                    default: return null;
                }
            };
            return getDisplayValue();
        }
    };

    const changeBackground = (data: any) => {
        let style;
        if (typeof data === 'string') {
            style = { backgroundColor: data === value ? Colors.whiteGrey : Colors.white };
        } else {
            const getDisplayValue = () => {
                switch (name) {
                    case 'state_name': return data['state_name'];
                    case 'project_status': return data['project_status'];
                    case 'city_name': return data['city_name'];
                    case 'requirement_types': return data['category_name'];
                    case 'country_id': return data['country_name'];
                    case 'gender': return data['full_name'];
                    case 'requirement': return data['category_name'];
                    case 'outsider_name': return data['nickname'];
                    case 'organization_name': return data['organization_name'];
                    default: return null;
                }
            };
            style = { backgroundColor: getDisplayValue() === value ? Colors.whiteGrey : Colors.white };
        }
        return style;
    };

    return (
        show && (
            <FlatList
                data={data}
                bounces={false}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.borderBottom} />}
                keyExtractor={(_, i) => i.toString()}
                contentContainerStyle={[styles.contentContainer]}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.item, changeBackground(item)]}
                        onPress={() => {
                            onSelect(name, item);
                            close();
                        }}
                    >
                        <Text style={styles.text}>{getDisplaykey({ data: item })}</Text>
                    </TouchableOpacity>
                )}
            />
        )
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: Colors.white,
    },
    item: {
        padding: 13,
        backgroundColor: Colors.white,
    },
    text: {
        ...fontStyles.r6,
        textTransform: 'capitalize',
    },
    dots: {
        left: 10,
    },
    borderBottom: {
        height: moderateScale(1),
        backgroundColor: Colors.whiteGrey
    }
});

export default Picker;