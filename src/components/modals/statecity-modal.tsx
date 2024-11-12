import React from 'react';
import { styles } from './styles';
import Loader from '../loaders/loader';
import Modal from 'react-native-modal';
import { Colors } from '../../constants';
import SearchBar from '../serach-bar/search-bar';
import { Back, Dots, DropDownIcon } from '../../../assets/icons';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, FlatList, Pressable, Keyboard } from 'react-native';

interface SelectCountryDodalProps {
    name?: string;
    value?: string;
    containerStyle?: any;
    hide?: boolean;
    headerTitle?: string;
    data?: any;
    onPress?: (name: string, item: any) => void;
    dependentValue?: string;
    placeholder: string;
    disabled?: boolean;
    star?: boolean;
    loading?: boolean;
}

const StateCityModal = ({
    name,
    value,
    containerStyle,
    hide,
    headerTitle,
    data,
    onPress,
    dependentValue,
    placeholder,
    disabled,
    star,
    loading,
}: SelectCountryDodalProps) => {
    const [isVisible, setVisible] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [showData, setData] = React.useState(data);

    const onOpenModal = () => {
        if (name == 'city_name' && dependentValue == '') {
            // showToast('Please select the state first');
        } else {
            disabled ? onPress?.('', '') : setVisible(true);
        }
    };
    const closeModal = () => {
        setVisible(false);
    };

    React.useEffect(() => {
        let newData;
        if (name == 'state_name') {
            newData = data.filter((item: any) => {
                if (item.state_name.toLowerCase().includes(search.toLowerCase())) {
                    return item;
                }
            });
        } else if (name == 'city_name') {
            newData = data.filter((item: any) => {
                if (item.city_name.toLowerCase().includes(search.toLowerCase())) {
                    return item;
                }
            });
        }
        setData(newData);
    }, [search, data]);

    React.useEffect(() => {
        !isVisible ? setSearch('') : null;
    }, [isVisible]);

    const changeBackground = (item: any) => {
        const backgroundColor =
            name == 'state_name' && item['state_name'] == value
                ? styles.activeContainer
                : name == 'city_name' && item['city_name'] == value
                    ? styles.activeContainer
                    : styles.inactiveContainer;
        return backgroundColor;
    };

    const getDisplayKey = (item: any) => {
        if (typeof item == 'string') {
            return item;
        } else {
            const keyname =
                name == 'state_name'
                    ? item['state_name']
                    : name == 'city_name'
                        ? item['city_name']
                        : null;
            return keyname;
        }
    };
    const displayEmptyText = () => {
        return name == 'state_name'
            ? `No state found with '${search}'`
            : name == 'city_name'
                ? `No cities found with '${search}'`
                : null;
    };

    return hide ? null : (
        <View style={[styles.container, containerStyle]}>
            <Pressable
                onPress={onOpenModal}
                disabled={loading || disabled ? true : false}>
                <View style={[styles.placeholder]}>
                    {value && value.length != 0 ? (
                        <Text
                            style={[styles.text, { opacity: 1 }]}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            <Text style={styles.value}>{value}</Text>
                        </Text>
                    ) : (
                        <Text style={[styles.text]} numberOfLines={1} ellipsizeMode="tail">
                            <Text style={{ letterSpacing: 1 }}>{placeholder}</Text>
                            {star && <Text style={styles.star}> *</Text>}
                        </Text>
                    )}
                    <Pressable
                        style={[styles.button]}
                        android_ripple={{ color: Colors.blue, borderless: true, radius: 15 }}
                        onPress={onOpenModal}
                        disabled={loading ? true : false}>
                        {loading ? (
                            <Loader color={Colors.blue} size={25} />
                        ) : (
                            <DropDownIcon />
                        )}
                    </Pressable>
                </View>
            </Pressable>

            <Modal
                isVisible={isVisible}
                useNativeDriver
                useNativeDriverForBackdrop
                onBackButtonPress={closeModal}
                onBackdropPress={closeModal}
                style={styles.modal}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.headerContainer}>
                        <Pressable
                            style={styles.back}
                            android_ripple={{
                                color: Colors.lightblue,
                                borderless: true,
                                radius: 20,
                            }}
                            onPress={closeModal}>
                            <Back />
                        </Pressable>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.heading}>
                            {headerTitle}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <SearchBar
                    hide
                    textinputStyle={styles.searchinputStyle}
                    onChangeText={text => setSearch(text)}
                />
                <FlatList
                    data={showData}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={[styles.wrapper, changeBackground(item)]}
                                onPress={() => {
                                    onPress?.(name!, item);
                                    setVisible(false);
                                }}>
                                <Text style={styles.displaykey}>{getDisplayKey(item)}</Text>
                                <Dots style={styles.dot} />
                            </TouchableOpacity>
                        );
                    }}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyText}>{displayEmptyText()}</Text>
                    )}
                />
            </Modal>
        </View>
    );
};

export default StateCityModal;