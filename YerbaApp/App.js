import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Menu from "./components/Menu";

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Menu />
        <Products />
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  main: {
    backgroundColor: "white"
  }
});

export default App;
