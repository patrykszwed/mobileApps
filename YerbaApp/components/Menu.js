import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={myStyles.main}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Yerba Mate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDisabled}>
          <Text style={styles.textDisabled}>Mate Cups</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    height: 20,
    width: 120,
    paddingTop: 5,
    paddingBottom: 20
  }
});

export default Menu;
