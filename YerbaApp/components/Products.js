import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Item from "./Item";

class Products extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={myStyles.container}>
        <Item
          itemName="Organic Yerba Mate"
          description="La Potente Energy"
          price="4.45"
          img="y1"
        />
        <Item
          itemName="Rosamonte Especial"
          description="With Stems (Con Palos)"
          price="5.25"
          img="y2"
        />
        <Item
          itemName="Sara Azul Extra"
          description="Smooth Yerba Mate"
          price="8.99"
          img="y3"
        />
        <Item
          itemName="Verde Mate"
          description="Green Cactus"
          price="6.99"
          img="y4"
        />
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  container: {
    marginTop: 45,
    flex: 10,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fcfcfc",
    padding: 10,
    width: 300,
    height: 300,
    borderRadius: 14
  }
});

export default Products;
