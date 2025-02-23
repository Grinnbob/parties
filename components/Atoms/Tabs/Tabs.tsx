import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";
import { Color } from "../../../GlobalStyles";

export type TabsProps = {
  value: string;
  tabs: Array<{
    id: string;
    label: string;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
  }>;
  onChange: (id: string) => void;
  style?: StyleProp<ViewStyle>;
};

export const Tabs: React.FC<TabsProps> = ({ value, tabs, onChange, style }) => {
  return (
    <View style={[styles.root, style]}>
      {tabs.map((item) => {
        const isSelected = item.id === value;
        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.tab,
              item.style,
              isSelected ? styles.selectedTab : undefined,
            ]}
            onPress={() => onChange(item.id)}
          >
            <View style={styles.textContainer}>
              {item.loading ? (
                <ActivityIndicator
                  size={14}
                  style={styles.activityIndicator}
                  color={Color.primaryPink}
                />
              ) : (
                <View style={styles.hidden} />
              )}
              <Text style={[isSelected ? styles.selectedText : styles.text]}>
                {item.label}
              </Text>
              <View style={styles.hidden} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
