import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    contentContainerStyle: {
      flexGrow: 1,
    },
    titleinput: {
      marginTop: 30,
    },
    btncontainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    linkContainer: {
      height: 150,
    },
    linkInput: {
      textAlignVertical: 'top',
      flex: 1,
      paddingVertical: 15,
    },
    placeholderStyle: {top: 15},
  });
  export {styles}