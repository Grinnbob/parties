import {
  Menu as RNMenu,
  MenuProps as RNMenuProps,
  MenuOptions,
  MenuOption,
  MenuOptionProps,
  MenuTrigger,
} from "react-native-popup-menu";
import React from "react";
import { styles } from "./styles";

export type MenuProps = RNMenuProps & {
  options: Array<MenuOptionProps>;
};

export const Menu: React.FC<MenuProps> = ({ options, ...rest }) => {
  return (
    <RNMenu {...rest}>
      <MenuTrigger text="" />
      <MenuOptions optionsContainerStyle={[styles.menuOptions]}>
        {options.map((opt, index) => {
          return (
            <MenuOption
              key={index}
              style={[styles.menuOption, opt.style]}
              {...opt}
            />
          );
        })}
      </MenuOptions>
    </RNMenu>
  );
};
