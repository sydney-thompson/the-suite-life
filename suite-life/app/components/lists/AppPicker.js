import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../text/AppText";
import PickerItem from "./PickerItem";
import Screen from "../Screen";
import defaultStyles from "../../config/styles";
import colors from "../../config/colors";

export default function AppPicker({
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width: width, flex: 1 }]}>
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.label}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen style={styles.screen}>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.truewhite,
    borderRadius: 10,
    borderColor: colors.medium,
    borderWidth: 2,
    flexDirection: "row",
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  screen: {
    alignContent: "center",
    paddingLeft: 20,
  },
  text: {
    flex: 1,
    color: defaultStyles.colors.black,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
});
