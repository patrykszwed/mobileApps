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
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import ImageViewer from "react-native-image-zoom-viewer";
import NewPhotoButton from "./NewPhotoButton";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const NUMBER_OF_PHOTOS_TO_LOAD = 60;

class Gallery extends Component {
  state = {
    photos: [],
    modalVisible: false,
    imageIndex: -1,
  };

  getPhotos = async (creationTime) => {
    creationTime = creationTime || new Date().getTime() + 1;
    await MediaLibrary.requestPermissionsAsync();
    const EXPO_ALBUM_ID = await MediaLibrary.getAlbumAsync("DCIM").then(
      (albumId) => albumId
    );
    let systemPhotos = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo"],
      first: NUMBER_OF_PHOTOS_TO_LOAD,
      createdBefore: creationTime,
      sortBy: MediaLibrary.SortBy.creationTime,
    });
    let expoPhotos = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo"],
      first: NUMBER_OF_PHOTOS_TO_LOAD,
      album: EXPO_ALBUM_ID,
      sortBy: MediaLibrary.SortBy.modificationTime,
    }).then((expoAssets) =>
      expoAssets.assets.filter(
        (asset) => asset.modificationTime <= creationTime
      )
    );
    systemPhotos.assets = systemPhotos.assets.concat(expoPhotos);
    systemPhotos.assets.sort((a, b) => {
      const aCreationTime =
        a.creationTime > 0 ? a.creationTime : a.modificationTime;
      const bcreationTime =
        b.creationTime > 0 ? b.creationTime : b.modificationTime;
      return aCreationTime < bcreationTime;
    });
    let photos = systemPhotos.assets.map((photo, key) => {
      return {
        url: photo.uri,
        index: key,
        albumId: photo.albumId,
        creationTime: photo.creationTime,
        modificationTime: photo.modificationTime,
      };
    });
    this.setState({ photos });
  };

  hideModal = () => {
    this.getPhotos();
    this.setState({ modalVisible: false });
  };

  showModal = (imageIndex) => () => {
    this.setState({ modalVisible: true, imageIndex });
  };

  removePhoto = async (photoIndexToRemove) => {
    const { photos } = this.state;
    const photoToRemove = photos.find(
      (photo) => photo.index === photoIndexToRemove
    );
    const albumWithPhotoToRemove = await MediaLibrary.getAlbumsAsync().then(
      (albums) => albums.find((album) => album.id === photoToRemove.albumId)
    );

    const photoToRemoveId = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo"],
      album: photoToRemove.albumId,
      sortBy: MediaLibrary.SortBy.creationTime,
      first: albumWithPhotoToRemove.assetCount,
    })
      .then((albumWithAsset) =>
        albumWithAsset.assets.find((asset) => photoToRemove.url === asset.uri)
      )
      .then((photoToRemove) => photoToRemove.id);
    await MediaLibrary.removeAssetsFromAlbumAsync(
      [photoToRemoveId],
      photoToRemove.albumId
    ).then(() => this.hideModal());
  };

  render() {
    const { photos, modalVisible, imageIndex } = this.state;
    return (
      <View style={styles.container}>
        {photos.length === 0 && (
          <Button
            color="#ffc400"
            title="Open gallery"
            onPress={() => this.getPhotos()}
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
              enableImageZoom
            />
            <Button
              color="#cf2727"
              title="Delete photo"
              onPress={() => this.removePhoto(imageIndex)}
            />
          </Modal>
        )}
        {photos.length > 0 && (
          <FlatList
            data={photos}
            keyExtractor={(item) => item.index}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={this.showModal(item.index)}
                style={styles.GridViewContainer}
              >
                <Image
                  resizeMode="cover"
                  style={{
                    height: SCREEN_HEIGHT / (photos.length / 4),
                    width: SCREEN_WIDTH / 4,
                  }}
                  source={{ uri: item.url }}
                />
              </TouchableOpacity>
            )}
            numColumns={5}
          />
        )}
        {photos.length > 0 && <NewPhotoButton reloadPhotos={this.getPhotos} />}
        {photos.length > 0 && (
          <Button
            color="#ffc400"
            title="Next page"
            onPress={() => {
              const photosCreationTime = photos.map((photo) =>
                photo.creationTime > 0
                  ? photo.creationTime
                  : photo.modificationTime
              );
              this.getPhotos(Math.min(...photosCreationTime));
            }}
          />
        )}
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
    alignItems: "center",
  },
});
