import React from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { Color } from "../../../GlobalStyles";

type TextInputWithAIProps = {
  label: string;
  inputProps?: TextInputProps;
};

export const TextInputWithAI: React.FC<TextInputWithAIProps> = ({
  label,
  inputProps,
}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Color.gray300}
          placeholder="Description"
          multiline={true}
          {...inputProps}
        />
        <TouchableOpacity>
          <LinearGradient
            colors={["#6C1B9E", "#FF077E"]}
            locations={[0, 1]}
            useAngle={true}
            angle={-90}
            style={{ padding: 1, borderRadius: 30 }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Generate AI Description</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
