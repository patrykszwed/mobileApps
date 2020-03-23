import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: props.itemName,
      description: props.description,
      price: props.price,
      img: props.img
    };
  }

  getImageToRender(img) {
    switch (img) {
      case "y1":
        return (
          <Image style={myStyles.image} source={require("../assets/y1.png")} />
        );
      case "y2":
        return (
          <Image style={myStyles.image} source={require("../assets/y2.png")} />
        );
      case "y3":
        return (
          <Image style={myStyles.image} source={require("../assets/y3.png")} />
        );
      case "y4":
        return (
          <Image style={myStyles.image} source={require("../assets/y4.png")} />
        );
    }
  }

  render() {
    const { img } = this.state;
    return (
      <View style={myStyles.itemContainer}>
        <View>{this.getImageToRender(img)}</View>
        <View style={myStyles.item}>
          <Text>{this.state.itemName}</Text>
          <Text style={myStyles.description}>{this.state.description}</Text>
          <Text>${this.state.price}</Text>
        </View>
        <View style={myStyles.imageDotsContainer}>
          <Image
            style={myStyles.imageDots}
            source={require("../assets/dots.png")}
          />
        </View>
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  item: {
    flex: 3
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    flex: 6,
    padding: 5,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#fcfcfc"
  },
  image: {
    width: 60,
    height: 65,
    flex: 2
  },
  imageDots: {
    width: 30,
    height: 30
  },
  imageDotsContainer: {
    marginLeft: 0,
    flex: 1,
    justifyContent: "center"
  },
  description: {
    color: "#a2aba7"
  }
});

export default Item;
