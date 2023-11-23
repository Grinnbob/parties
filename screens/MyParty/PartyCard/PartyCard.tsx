import React from "react";
import { Text, View } from "react-native";
import { PartyModel } from "../../../models";
import { styles } from "./styles";
import dayjs from "dayjs";
import { NotFoundImageIcon } from "../../../components/Icons";

type PartyCardProps = {
  party: PartyModel;
};

export const PartyCard: React.FC<PartyCardProps> = ({ party }) => {
  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.startDateText}>
            {dayjs(party.startDate).format("MMM DD YYYY")}
          </Text>
        </View>
        <View style={styles.partyImageNotFound}>
          <NotFoundImageIcon
            width="80"
            height="80"
            style={styles.notFoundIcon}
          />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.partyNameText}>{party.name}</Text>
        <Text style={styles.questsText}>
          {party.attendingMin} - {party.attendingMax} Guests
        </Text>
      </View>
    </View>
  );
};
