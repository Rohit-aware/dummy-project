import React, { useState } from "react"
import { Colors } from "../../constants";
import { fontStyles } from "../../styles";
import { Dots } from "../../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import CountryPicker from "react-native-country-picker-modal";
import { useCommonStore, useMyLeadStore, useReloadStore } from "../../store";
import { Button, DateTimeInput, Header, SearchBar, showToast } from "../../components";
import { View, Text, TouchableWithoutFeedback, ScrollView, StyleSheet, Keyboard } from "react-native"

const FilterMyLeads = () => {
    const { navigate } = useNavigation<any>();
    const { sources } = useCommonStore();
    const { reloadPage } = useReloadStore();
    const { leadsFilter, FilterLeads, setIsFinish, setMyLeadPage } = useMyLeadStore();
    const { countryName, country_id, from, source, to } = leadsFilter || {};
    const [search, setSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<Array<any>>([]);
    const Filtertype = [
        { title: "Source", data: sources },
        { title: "Country", data: selectedCountry },
        { title: "Notes", data: [] },
        // { title: "Outsider", data: [] },
    ];

    const resetLeadPage = () => {
        setIsFinish();
        setMyLeadPage({ leadPage: 0 });
    };
    const [active, setActive] = useState(0)
    const [filters, setFilters] = useState(sources);
    const [countryModal, setCountryModal] = useState(false);

    var [enableFilter, setEnableFilter] = useState({
        source: source ? source : "",
        countryCode: country_id ? country_id : "",
        countryName: countryName ? countryName : "",
        from: from ? from : "",
        to: to ? to : "",
    })

    const apply = () => {

        if (enableFilter.from !== "" && enableFilter.to == "") {
            showToast("Please select To Date");
        }
        else if (enableFilter.to !== "" && enableFilter.from == "") {
            showToast("Please select From Date");
        }
        else {
            if (enableFilter.source !== "" || enableFilter.countryCode !== "" || enableFilter.from !== "" || enableFilter.to !== "") {
                let data = {}
                enableFilter.source != "" && Object.assign(data, { source: enableFilter.source })
                enableFilter.countryCode != "" && Object.assign(data, { country_id: enableFilter.countryCode, countryName: enableFilter.countryName })
                enableFilter.from != "" && Object.assign(data, { from: enableFilter.from })
                enableFilter.to != "" && Object.assign(data, { to: enableFilter.to })

                reloadPage();
                resetLeadPage();
                FilterLeads(data);
                navigate('BottomTab', { screen: 'MyLeads' });
            }
            else {
                reloadPage();
                resetLeadPage();
                FilterLeads(null);
                navigate('BottomTab', { screen: 'MyLeads' });
            }
        }
    }
    const clear = () => {
        reloadPage();
        resetLeadPage();
        FilterLeads(null);
        navigate('BottomTab', { screen: 'MyLeads' });
    }

    const onSearch = (text: string) => {
        setSearch(text)
        if (active == 0) {
            if (text.length > 0) {
                let filteredData = sources.filter((item) => item.toLowerCase().includes(text.toLowerCase()) ? item : null)
                setFilters(filteredData)
            }
            else {
                setFilters(sources)
            }
        }
    }


    const onChangeDate = (name: string, value: string) => {
        setEnableFilter({ ...enableFilter, [name]: value })
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <Header title="Filter" />
                <View style={{ flexDirection: "row", flex: 1, paddingTop: 20 }}>
                    <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: "#F0F3F4" }}>
                        {
                            Filtertype.map((item, i) => {
                                return (
                                    <TouchableWithoutFeedback key={i} onPress={() => {

                                        if (i !== 1 && active != i) {
                                            setActive(i)
                                            setFilters(item.data)
                                            setSearch("")
                                        }
                                        else if (i == 1) {
                                            setActive(i)
                                            if (enableFilter.countryName) {
                                                setFilters([enableFilter.countryName])
                                            }
                                            else {
                                                setFilters(item.data)
                                            }
                                            setCountryModal(true)
                                        }
                                    }}>

                                        <View style={{ marginHorizontal: 10, }}>
                                            <Text style={[fontStyles.r3, { paddingVertical: 13, }]}>{item.title}</Text>
                                            {
                                                ((item.title == "Source" && enableFilter.source !== "") || (item.title == "Country" && enableFilter.countryCode !== "") || (item.title == "Country" && enableFilter.countryCode !== "") || (item.title == "Notes" && enableFilter.from !== "" && enableFilter.to !== "")) ?

                                                    <View style={{ position: "absolute", width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: Colors.yellow, right: 13, top: 20 }} />
                                                    : null
                                            }
                                            {
                                                active == i ? <View style={{ right: 0, width: 7, backgroundColor: Colors.blue, height: "100%", position: "absolute" }} /> : null
                                            }
                                            <Dots />
                                        </View>


                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
                    <View style={{ flex: 1, }}>
                        <SearchBar hide searchStyle={{ marginHorizontal: 0, marginVertical: 0 }} textinputStyle={{ marginRight: 10, marginHorizontal: 10, height: 40 }} onChangeText={onSearch} value={search} />
                        <ScrollView style={{ marginTop: 15 }}>
                            {
                                active == 2 ?
                                    <>
                                        <DateTimeInput placeholder="From date" star containerStyle={{ flex: 1, marginHorizontal: 15, height: 50 }} name="from" value={enableFilter.from} onChangeText={onChangeDate} mode="date" />
                                        <DateTimeInput placeholder="To date" star containerStyle={{ flex: 1, marginHorizontal: 15, height: 50 }} name="to" value={enableFilter.to} onChangeText={onChangeDate} mode="date" />

                                    </>
                                    :
                                    filters.map((item, i) => {
                                        return (

                                            <TouchableWithoutFeedback key={i} onPress={() => {
                                                if (active == 0) {
                                                    enableFilter.source.toLowerCase() == item.toLowerCase() ? setEnableFilter({ ...enableFilter, source: "" }) : setEnableFilter({ ...enableFilter, source: item })
                                                }
                                                else if (active == 1) {
                                                    setEnableFilter({ ...enableFilter, countryCode: "", countryName: "", })
                                                    setFilters([])
                                                }


                                            }}>

                                                <View style={{
                                                    marginHorizontal: 10,
                                                    backgroundColor:
                                                        item.toLowerCase() == enableFilter.source.toLowerCase() ? Colors.whiteGrey :
                                                            item == enableFilter.countryName ? Colors.whiteGrey : Colors.white
                                                }}>
                                                    <Text style={[fontStyles.r3, { paddingVertical: 13, textTransform: "capitalize" }]}>{item.category_name ? item.category_name : item}</Text>
                                                    <Dots />
                                                </View>

                                            </TouchableWithoutFeedback>
                                        )
                                    })
                            }
                        </ScrollView>
                    </View>




                </View>

                <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", marginHorizontal: 20 }}>
                    <Button title="Clear" onPress={clear} style={[styles.button, styles.button1]} textStyle={{ color: Colors.blue }} />
                    <Button title="Apply" onPress={apply} style={[styles.button]} />
                </View>

                <CountryPicker
                    countryCode="IN"
                    visible={true}
                    modalProps={{ visible: countryModal }}
                    onSelect={(country: any) => {
                        const { callingCode, name } = country;
                        setEnableFilter({ ...enableFilter, countryCode: callingCode.toString(), countryName: name })
                        setSelectedCountry([name])
                        setFilters([name])
                    }}
                    onClose={() => {
                        setCountryModal(false)
                    }}
                    withFilter
                    withCallingCode
                    containerButtonStyle={{ display: "none" }}
                />

            </View>
        </TouchableWithoutFeedback>
    )
}

export default FilterMyLeads

const styles = StyleSheet.create({
    button: {
        width: 120,
        height: 40,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button1: {
        marginRight: 15,
        backgroundColor: Colors.white,

    }
})