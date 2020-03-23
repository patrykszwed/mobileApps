import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "../styles/styles";

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={myStyles.main}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>View More</Text>
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
    paddingTop: 225,
    paddingBottom: 50
  }
});

export default Footer;
