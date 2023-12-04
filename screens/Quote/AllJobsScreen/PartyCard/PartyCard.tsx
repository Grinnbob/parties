import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import {
  NotFoundImageIcon,
  RightArrowIcon,
} from "../../../../components/Icons";
import { PartyModel } from "../../../../models";
import dayjs from "dayjs";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

type PartyCardProps = {
  party: PartyModel;
  onPress: () => void;
  price: number;
};

export const PartyCard: React.FC<PartyCardProps> = ({
  party,
  price,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View style={styles.partyContainer}>
        <View style={styles.partyImageNotFound}>
          <NotFoundImageIcon
            width="24"
            height="24"
            style={styles.notFoundIcon}
          />
        </View>
        <View style={styles.partyInnerContainer}>
          <Text style={styles.titleText}>{party.name}</Text>
          <View style={styles.partyDateContainer}>
            <Text style={styles.partyDateText}>
              {dayjs(party.startDate).format("MM/DD/YYYY")}
            </Text>
            <Text style={styles.partyDateText}>
              {dayjs(party.startTime).format("h:mm A")} -{" "}
              {dayjs(party.endTime).format("h:mm A")}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <RightArrowIcon style={styles.arrowIcon} />
        <Text style={styles.titleText}>{formatter.format(price)}</Text>
      </View>
    </TouchableOpacity>
  );
};
