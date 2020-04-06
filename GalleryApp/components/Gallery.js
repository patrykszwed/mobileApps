import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Text
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import ImageViewer from "react-native-image-zoom-viewer";
import NewPhotoButton from "./NewPhotoButton";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);

class Gallery extends Component {
  state = {
    photos: [],
    modalVisible: false,
    imageIndex: -1
  };

  getPhotos = async () => {
    console.log("getPhotos");
    await MediaLibrary.requestPermissionsAsync();
    let systemPhotos = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo"],
      first: 50,
      sortBy: MediaLibrary.SortBy.creationTime
    });
    systemPhotos.assets.forEach(photo => console.log(photo));
    const photos = systemPhotos.assets.map((photo, key) => ({
      url: photo.uri,
      index: key
    }));
    console.log(photos.forEach(photo => console.log(photo.url)));
    this.setState({ photos });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  showModal = imageIndex => () => {
    this.setState({ modalVisible: true, imageIndex });
  };

  test = () => {
    console.log("test");
  };

  render() {
    const { photos, modalVisible, imageIndex } = this.state;
    return (
      <View style={styles.container}>
        {photos.length === 0 && (
          <Button
            color="#ffc400"
            title="Open gallery"
            onPress={this.getPhotos}
          />
        )}
        {modalVisible && (
          <Modal visible={true} transparent={true} animationType="slide">
            <ImageViewer
              imageUrls={photos}
              onCancel={this.hideModal}
              index={imageIndex}
              enableSwipeDown
              saveToLocalByLongPress
            />
          </Modal>
        )}
        {photos.length > 0 && (
          <FlatList
            data={photos}
            keyExtractor={item => item.index}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={this.showModal(item.index)}
                style={styles.GridViewContainer}
              >
                <Image
                  resizeMode="cover"
                  style={{
                    height: SCREEN_HEIGHT / (photos.length / 4),
                    width: SCREEN_WIDTH / 4
                  }}
                  source={{ uri: item.url }}
                />
              </TouchableOpacity>
            )}
            numColumns={5}
          />
        )}
        {photos.length > 0 && <NewPhotoButton reloadPhotos={this.getPhotos} />}
      </View>
    );
  }
}

export default Gallery;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1329",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
