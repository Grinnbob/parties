import React from "react";
import { Image, Text, View } from "react-native";
import { PartyModel } from "../../../models";
import { styles } from "./styles";
import dayjs from "dayjs";

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
        <Image
          style={styles.partyImage}
          source={require("../../../assets/photo-05.png")}
        />
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
