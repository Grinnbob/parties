import React, { useState } from "react";
import { View, Image } from "react-native";
import { WebView } from "react-native-webview";
import { Spinner } from "native-base";
import Config from "react-native-config";

const Term = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {loading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            zIndex: 1,
          }}
        >
          <Spinner color="#0C1D37" />
        </View>
      )}
      <WebView
        source={{ uri: Config.TERMS_LINK }}
        onLoadProgress={({ nativeEvent }) => {
          this.loadingProgress = nativeEvent.progress;
          if (nativeEvent.progress === 1) {
            setLoading(false);
          }
        }}
      ></WebView>
    </View>
  );
};

export default Term;
