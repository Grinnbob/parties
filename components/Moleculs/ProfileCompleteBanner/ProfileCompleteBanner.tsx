import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { ProgressBar } from "../../Atoms";
import { CheckIcon, ProfileIcon } from "../../Icons";
import { Color } from "../../../GlobalStyles";

type ProfileCompleteBannerProps = {
  businessDescriptionCompleted: boolean;
  servicesCompleted: boolean;
  albumCompleted: boolean;
};
export const ProfileCompleteBanner: React.FC<ProfileCompleteBannerProps> = ({
  businessDescriptionCompleted,
  servicesCompleted,
  albumCompleted,
}) => {
  const percent = useMemo(() => {
    let value = 0;
    if (businessDescriptionCompleted) {
      value += 20;
    }
    if (albumCompleted) {
      value += 40;
    }
    if (servicesCompleted) {
      value = 40;
    }
    return value;
  }, [businessDescriptionCompleted, albumCompleted, servicesCompleted]);

  const checksList = useMemo(() => {
    return [
      {
        text: "Edit Your Business Description",
        success: businessDescriptionCompleted,
      },
      { text: "Add Media of your past work", success: albumCompleted },
      { text: "Add & Price your service", success: servicesCompleted },
    ];
  }, [servicesCompleted, albumCompleted, businessDescriptionCompleted]);

  return (
    <View style={styles.root}>
      <View style={styles.progressContainer}>
        <Text style={styles.completeText}>
          Your page is {percent}% complete
        </Text>
        <ProgressBar value={percent} />
      </View>
      <View style={styles.completeContainer}>
        <ProfileIcon color={Color.primaryPink} />
        <Text style={styles.completeProfileText}>Complete Your Profile</Text>
      </View>
      <View style={styles.checksContainer}>
        {checksList.map((check) => {
          return (
            <View key={check.text} style={styles.checkItemContainer}>
              <CheckIcon
                color={Color.primaryPink}
                style={check.success ? undefined : styles.unchecked}
              />
              <Text style={styles.checkText}>{check.text}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
