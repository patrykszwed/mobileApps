import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={myStyles.header}>
        <View style={myStyles.headerLeft}>
          <Image
            style={myStyles.image}
            source={require("../assets/arrow.png")}
          />
        </View>
        <View style={myStyles.headerMiddle}></View>
        <View style={myStyles.headerRight}>
          <View>
            <Image
              style={myStyles.image}
              source={require("../assets/glass.png")}
            />
          </View>
        </View>
        <View style={myStyles.headerRight}>
          <View>
            <Image
              style={myStyles.image}
              source={require("../assets/dots.png")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 40,
    justifyContent: "space-between",
    backgroundColor: "white",
    alignItems: "center"
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  headerMiddle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  headerRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  image: {
    width: 30,
    height: 30
  }
});

export default Header;
