import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Item from "./Item";

class Products extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={myStyles.main}>
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
  main: {
    marginTop: 45
  }
});

export default Products;
