import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

import { Ionicons, MaterialIcons, Foundation } from "@expo/vector-icons";

const flashModeOrder = {
  off: "on",
  on: "auto",
  auto: "torch",
  torch: "off",
};

const flashIcons = {
  off: "flash-off",
  on: "flash-on",
  auto: "flash-auto",
  torch: "highlight",
};

const landmarkSize = 2;

class NewPhotoButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flash: "off",
      zoom: 0,
      autoFocus: "on",
      type: "back",
      whiteBalance: "auto",
      ratio: "16:9",
      ratios: [],
      barcodeScanning: false,
      faceDetecting: false,
      faces: [],
      newPhotos: false,
      permissionsGranted: false,
      pictureSize: undefined,
      pictureSizes: [],
      pictureSizeId: 0,
      showGallery: false,
      showMoreOptions: false,
      modalVisible: false,
      reloadPhotos: props.reloadPhotos,
    };
    this.askForPermissions = this.askForPermissions.bind(this);
  }

  toggleView = () => {
    this.hideModal();
    this.state.reloadPhotos();
    this.setState({ newPhotos: false });
  };

  toggleFacing = () =>
    this.setState({ type: this.state.type === "back" ? "front" : "back" });

  toggleFlash = () =>
    this.setState({ flash: flashModeOrder[this.state.flash] });

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({
        onPictureSaved: this.onPictureSaved,
      });
    }
  };

  onPictureSaved = async (photo) => {
    const asset = await MediaLibrary.createAssetAsync(photo.uri);
    const albumId = await MediaLibrary.getAlbumAsync("Camera").then(
      (albumId) => albumId
    );
    await MediaLibrary.addAssetsToAlbumAsync([asset], albumId);
    this.setState({ newPhotos: true });
  };

  collectPictureSizes = async () => {
    if (this.camera) {
      const pictureSizes = await this.camera.getAvailablePictureSizesAsync(
        this.state.ratio
      );
      let pictureSizeId = 0;
      if (Platform.OS === "ios") {
        pictureSizeId = pictureSizes.indexOf("High");
      } else {
        // returned array is sorted in ascending order - default size is the largest one
        pictureSizeId = pictureSizes.length - 1;
      }
      this.setState({
        pictureSizes,
        pictureSizeId,
        pictureSize: pictureSizes[pictureSizeId],
      });
    }
  };

  async askForPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    await this.askForCameraRollPermissions();
    this.setState({
      permissionsGranted: status === "granted",
      modalVisible: status === "granted",
    });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "photos"
    ).catch((e) => {
      console.log(e, "Directory exists");
    });
  }

  async askForCameraRollPermissions() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  renderTopBar = () => (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFacing}>
        <Ionicons name="ios-reverse-camera" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFlash}>
        <MaterialIcons
          name={flashIcons[this.state.flash]}
          size={32}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );

  renderBottomBar = () => (
    <View style={styles.bottomBar}>
      <View style={{ flex: 0.4 }}>
        <TouchableOpacity
          onPress={this.takePicture}
          style={{ alignSelf: "center" }}
        >
          <Ionicons name="ios-radio-button-on" size={70} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.bottomButton} onPress={this.toggleView}>
        <View>
          <Foundation name="thumbnails" size={30} color="white" />
          {this.state.newPhotos && <View style={styles.newPhotosDot} />}
        </View>
      </TouchableOpacity>
    </View>
  );

  renderCamera = () => (
    <View style={{ flex: 1 }}>
      <Camera
        ref={(ref) => {
          this.camera = ref;
        }}
        style={styles.camera}
        onCameraReady={this.collectPictureSizes}
        type={this.state.type}
      >
        {this.renderTopBar()}
        {this.renderBottomBar()}
      </Camera>
    </View>
  );

  hideModal = () => {
    this.state.reloadPhotos();
    this.setState({ modalVisible: false });
  };

  showModal = (imageIndex) => () => {
    this.setState({ modalVisible: true, imageIndex });
  };

  render() {
    return this.state.permissionsGranted && this.state.modalVisible ? (
      <Modal
        visible={this.state.modalVisible}
        style={styles.container}
        onRequestClose={this.hideModal}
      >
        {this.renderCamera()}
      </Modal>
    ) : (
      <View style={styles.container}>
        <Button
          color="#ffc400"
          title="Take a photo"
          onPress={this.askForPermissions}
        />
      </View>
    );
  }
}

export default NewPhotoButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1329",
  },
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },
  topBar: {
    flex: 0.2,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottomBar: {
    paddingBottom: 5,
    backgroundColor: "transparent",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    flex: 0.12,
    flexDirection: "row",
  },
  noPermissions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  gallery: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  toggleButton: {
    flex: 0.25,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  autoFocusLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomButton: {
    flex: 0.3,
    height: 58,
    justifyContent: "center",
    alignItems: "center",
  },
  newPhotosDot: {
    position: "absolute",
    top: 0,
    right: -5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4630EB",
  },
  options: {
    position: "absolute",
    bottom: 80,
    left: 30,
    width: 200,
    height: 160,
    backgroundColor: "#000000BA",
    borderRadius: 4,
    padding: 10,
  },
  detectors: {
    flex: 0.5,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  pictureQualityLabel: {
    fontSize: 10,
    marginVertical: 3,
    color: "white",
  },
  pictureSizeContainer: {
    flex: 0.5,
    alignItems: "center",
    paddingTop: 10,
  },
  pictureSizeChooser: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  pictureSizeLabel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  facesContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: "absolute",
    borderColor: "#FFD700",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  landmark: {
    width: 2,
    height: landmarkSize,
    position: "absolute",
    backgroundColor: "red",
  },
  faceText: {
    color: "#FFD700",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
  },
});
