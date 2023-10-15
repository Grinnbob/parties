import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export type TabsProps = {
  value: string;
  tabs: Array<{ id: string; label: string }>;
  onChange: (id: string) => void;
};

export const Tabs: React.FC<TabsProps> = ({ value, tabs, onChange }) => {
  console.log("tabs", tabs);
  return (
    <View style={styles.root}>
      {tabs.map((item) => {
        const isSelected = item.id === value;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.tab, isSelected ? styles.selectedTab : undefined]}
            onPress={() => onChange(item.id)}
          >
            <Text style={[isSelected ? styles.selectedText : styles.text]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
