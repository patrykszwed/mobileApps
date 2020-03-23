import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: props.itemName,
      description: props.description,
      price: props.price,
      img: "../assets/" + props.img + ".png"
    };
  }

  render() {
    const { img } = this.state;
    return (
      <View style={myStyles.main}>
        <View>
          <Image style={myStyles.image} source={require("../assets/y1.png")} />
        </View>
        <View style={myStyles.item}>
          <Text>{this.state.itemName}</Text>
          <Text>{this.state.description}</Text>
          <Text>${this.state.price}</Text>
        </View>
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  item: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  main: {
    flexDirection: "row",
    backgroundColor: "white"
  },
  image: {
    marginTop: 10,
    marginRight: 5,
    width: 40,
    height: 40
  }
});

export default Item;
