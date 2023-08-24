import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import TopNavigationContent from "../../../components/TopNavigationContent";
import { Color } from "../../../GlobalStyles";
import UploadModal from "../../../components/Modal/UploadModal";
import useGlobalState from "../../../stateManagement/hook";
// import types from "../../../stateManagement/types";
import StateTypes from "../../../stateManagement/StateTypes";
import { Text, Pressable } from "native-base";
import CustomCameraSelect from "./component/CustomCameraSelect";
import StaggeredList from "@mindinventory/react-native-stagger-view";
import { useCameraRoll } from "@react-native-camera-roll/camera-roll";

const width = Dimensions.get("screen").width;

const VendorCameraRoll = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageStyles, setImageStyles] = useState([]);
  const [selection, setSelection] = useState([]);
  const [photoAlbum, setPhotoAlbum] = useGlobalState(
    StateTypes.photoalbum.key,
    StateTypes.photoalbum.default
  );
  const [selectedPhoto, setSelectedPhoto] = useGlobalState(
    StateTypes.selectedphoto.key,
    StateTypes.selectedphoto.default
  );
  const [photos, getPhotos, save] = useCameraRoll();

  const handleCameraRoll = () => {
    getPhotos();
  };

  useEffect(() => {
    handleCameraRoll();
  }, [route]);

  useEffect(() => {
    setPhotoAlbum(photos.edges);
  }, [photos]);

  useEffect(() => {
    const temp = [];

    for (const el of photoAlbum) {
      temp.push({
        width: (width - 18) / 2,
        height: Number(Math.random() * 20 + 12) * 10,
        backgroundColor: "gray",
        margin: 4,
        borderRadius: 18,
      });
    }
    setImageStyles([...temp]);
  }, [photoAlbum]);

  const handlePress = (id) => {
    const selections = photoAlbum.find(
      (item, i) => item?.node?.image?.uri === id
    );

    setSelection([selections]);
  };

  const handleDone = () => {
    setSelectedPhoto(selection);
    if (route.params.params === "create") {
      navigation.navigate("VendorCreate");
    } else if (route.params.params === "verify") {
      navigation.navigate("VerifyCreate");
    } else {
      navigation.navigate("Edit");
    }
  };

  const renderItem = (item, index) => {
    let enable = selection.find(
      (photo) => photo.node.image.uri === item.node.image.uri
    );

    return (
      <CustomCameraSelect
        key={item.node.image.uri}
        item={item}
        imageStyles={imageStyles[index]}
        index={index}
        enable={enable}
        onPress={() => handlePress(item.node.image.uri)}
      />
    );
  };

  const handleUpload = () => {
    setModalVisible(true);
  };

  return (
    <>
      <UploadModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.photoalbumscreen}>
        <Image
          style={styles.bgIcon}
          resizeMode="cover"
          source={require("../../../assets/bg3.png")}
        />
        <View
          style={{ flex: 1, justifyContent: "space-between", marginTop: 20 }}
        >
          <View>
            <TopNavigationContent
              title={"Upload photos & videos"}
              RightComponent={
                <Pressable onPress={handleDone}>
                  <Text color={"#FFF"} fontWeight={"700"}>
                    Done
                  </Text>
                </Pressable>
              }
            />
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StaggeredList
                data={photoAlbum}
                animationType={"NONE"}
                extraData={imageStyles}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, i }) => renderItem(item, i)}
                isLoading={false}
                // LoadingView={
                //   <View style={styles.activityIndicatorWrapper}>
                //     <ActivityIndicator color={"black"} size={"large"} />
                //   </View>
                // }
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  photoalbumscreen: {
    backgroundColor: Color.labelColorLightPrimary,
    width: "100%",
    overflow: "hidden",
    flex: 1,
  },
  bgIcon: {
    top: 0,
    width: "100%",
    height: "100%",
    left: 0,
    position: "absolute",
  },
  listView: {
    flexWrap: 1,
    width: "100%",
  },
  scrollViewStyle: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default VendorCameraRoll;
