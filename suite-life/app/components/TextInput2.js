import React from "react";
import { StyleSheet, Text, TextInput, View} from "react-native";

import defaultStyles from "../config/styles";
import colors from "../config/colors";

const TextInput2 = ({ label, default_text, width = "100%"}) => {
    const [text_value, onChangeText] = React.useState(default_text);

    return (
      <View style={[styles.container, { width }]}>
        <Text style={defaultStyles.text}>{label}</Text>
        <TextInput
          placeholderTextColor={colors["secondary"]}
          style={styles.inputbox}
          onChangeText={text => onChangeText(text)}
          value = {text_value}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: defaultStyles.colors.white,
      borderRadius: 25,
      flexDirection: "row",
      width: "100%",
      padding: 15,
      marginVertical: 1,
      alignItems: "center",
    },
    inputbox: {
      color: colors.black,
      fontSize: 18,
      fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
      width: "75%",
      padding: 10,
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: colors["secondary"],
      borderRadius: 10
    }
  });
  
  export default TextInput2;