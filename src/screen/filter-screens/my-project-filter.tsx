import React, { useState } from "react";
import { fontStyles } from "../../styles";
import { Colors } from "../../constants";
import { Dots } from "../../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import CountryPicker from "react-native-country-picker-modal";
import { Button, Header, SearchBar } from "../../components";
import { useCommonStore, useMyProjectStore, useReloadStore } from "../../store";
import { View, Text, TouchableWithoutFeedback, ScrollView, StyleSheet, Keyboard } from "react-native";

const FilterMyProjects = () => {
    const { navigate } = useNavigation<any>();
    const { reloadPage } = useReloadStore();
    const { projectStatus, sources, requirementTypes } = useCommonStore();
    const { isProjectFilter } = useMyProjectStore();
    const { enableProjectFilter, FilterProjects, project_status } = useMyProjectStore();


    const [search, setSearch] = useState("")
    const [selectedCountry, setSelectedCountry] = useState<Array<any>>([]);

    const Filtertype = React.useMemo(() => [
        { title: "Project Status", data: projectStatus },
        { title: "Requirement Type", data: requirementTypes },
        { title: "Source", data: sources },
        { title: "Country", data: selectedCountry }
    ], [projectStatus, requirementTypes, sources, selectedCountry]);

    const [active, setActive] = useState(0)
    const [filters, setFilters] = useState(projectStatus);
    const [countryModal, setCountryModal] = useState(false);
    const { countryName, country_id, project_category_id, project_status: oldProject_status, requirement_type, source } = isProjectFilter! || {};

    var [enableFilter, setEnableFilter] = useState({
        project_status: oldProject_status ? oldProject_status : (oldProject_status !== null && oldProject_status !== "Projects" && project_status !== '') ? projectStatus.find(e => e.project_status == project_status)?.['id'] : "",
        requirement_type: requirement_type ? requirement_type : "",
        source: source ? source : "",
        countryCode: country_id ? country_id : "",
        countryName: countryName ? countryName : "",
        project_category_id: project_category_id ? project_category_id : ""
    });


    const apply = () => {
        if (enableFilter.project_status !== "" || enableFilter.requirement_type != "" || enableFilter.source != "" || enableFilter.countryCode != "" || enableFilter.project_category_id != "") {
            let data = {}
            enableFilter.project_status != "" && Object.assign(data, { project_status: enableFilter.project_status })
            enableFilter.requirement_type != "" && Object.assign(data, { requirement_type: enableFilter.requirement_type })
            enableFilter.source != "" && Object.assign(data, { source: enableFilter.source })
            enableFilter.countryCode != "" && Object.assign(data, { country_id: enableFilter.countryCode, countryName: enableFilter.countryName })
            enableFilter.project_category_id != "" && Object.assign(data, { project_category_id: enableFilter.project_category_id })
            enableProjectFilter({ project_status: '', client_id: '' })
            FilterProjects(data)
            reloadPage()
            navigate('BottomTab', { screen: 'MyProjects' })
        }
        else {
            enableProjectFilter({ project_status: '', client_id: '' })
            FilterProjects({})
            reloadPage()
            navigate('BottomTab', { screen: 'MyProjects' })
        }

    }
    const clear = () => {
        enableProjectFilter({ project_status: '', client_id: '' })
        FilterProjects({})
        reloadPage()
        navigate("MyProjects")

    }


    const onSearch = React.useCallback((text: string) => {
        setSearch(text);
        if (active == 0) {
            if (text.length > 0) {
                let filteredData = projectStatus.filter((item) => {
                    if (item.project_status?.toLowerCase().includes(text.toLowerCase())) {
                        return item;
                    }
                });
                setFilters(filteredData);
            } else {
                setFilters(projectStatus);
            }
        } else if (active == 1) {
            if (text.length > 0) {
                let filteredData = requirementTypes.filter((item) => {
                    if (item.category_name.toLowerCase().includes(text.toLowerCase())) {
                        return item;
                    }
                });
                setFilters(filteredData);
            } else {
                setFilters(requirementTypes);
            }
        } else if (active == 2) {
            if (text.length > 0) {
                let filteredData = sources.filter((item) => item.toLowerCase().includes(text.toLowerCase()) ? item : null);
                setFilters(filteredData);
            } else {
                setFilters(sources);
            }
        }
    }, [active, projectStatus, requirementTypes, sources]);

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

                                        if (i !== 3 && active != i) {
                                            setActive(i)
                                            setFilters(item.data)
                                            setSearch("")
                                        }
                                        else if (i == 3) {
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
                                                // ((item.title == "Project Status" && enableFilter.project_status !== "") || (item.title == "Requirement Type" && enableFilter.requirement_type !== "") || (item.title == "Source" && enableFilter.source !== "") || (item.title == "Country" && enableFilter.countryCode !== "") && screen == "MyProjects") || ((item.title == "Source" && enableFilter.source !== "") || (item.title == "Country" && enableFilter.countryCode !== "") && screen == "MyLeads") || (screen == "MyProjects" && project_status !== null && i == 0 && project_status !== "Projects" && enableFilter.project_status !== "") ?
                                                ((item.title == "Project Status" && enableFilter?.project_status !== "") || (item.title == "Requirement Type" && enableFilter?.requirement_type !== "") || (item.title == "Source" && enableFilter.source !== "") || (item.title == "Country" && enableFilter.countryCode !== "") || project_status !== null && i == 0 && project_status !== "Projects" && enableFilter.project_status !== "") ?
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
                                filters.map((item: any, i: number) => {

                                    return (

                                        <TouchableWithoutFeedback key={i} onPress={() => {
                                            // setActive(i)
                                            if (active == 0) {
                                                typeof (item) == "object" && enableFilter?.project_status == item.id ? setEnableFilter({ ...enableFilter, project_status: "" }) : setEnableFilter({ ...enableFilter, project_status: item.id })
                                            }
                                            else if (active == 1) {
                                                enableFilter.requirement_type == item.category_name ? setEnableFilter({ ...enableFilter, requirement_type: "", project_category_id: "" }) : setEnableFilter({ ...enableFilter, requirement_type: item.category_name, project_category_id: item.project_category_id })
                                            }
                                            else if (active == 2) {
                                                enableFilter.source == item ? setEnableFilter({ ...enableFilter, source: "" }) : setEnableFilter({ ...enableFilter, source: item })
                                            }
                                            else if (active == 3) {
                                                setEnableFilter({ ...enableFilter, countryCode: "", countryName: "", })
                                                setFilters([])
                                            }


                                        }}>

                                            <View style={{
                                                marginHorizontal: 10,
                                                backgroundColor:
                                                    item.category_name == enableFilter.requirement_type ? Colors.whiteGrey :
                                                        typeof (item) == "object" && item?.id == enableFilter?.project_status ? Colors.whiteGrey :
                                                            item == enableFilter.source ? Colors.whiteGrey :
                                                                item == enableFilter.countryName ? Colors.whiteGrey : Colors.white
                                            }}>
                                                <Text style={[fontStyles.r3, { paddingVertical: 13, textTransform: "capitalize" }]}>{item.category_name ? item.category_name : item.project_status ? item.project_status : item}</Text>
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
                    onSelect={(country) => {
                        const { callingCode, name } = country;
                        setEnableFilter({ ...enableFilter, countryCode: callingCode.toString(), countryName: name.toString() })
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

export default FilterMyProjects

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