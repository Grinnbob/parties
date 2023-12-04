import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { Divider } from "../../Atoms";
import { CalendarIcon, ClockIcon, GuestsIcon, LocationIcon } from "../../Icons";
import dayjs from "dayjs";
import { PartyModel } from "../../../models";

type PartyInfoProps = {
  party: PartyModel;
};

export const PartyInfo: React.FC<PartyInfoProps> = ({ party }) => {
  const startDate = useMemo(() => {
    const start = dayjs(party.startDate).format("MM/DD/YYYY");
    const end = dayjs(party.endDate).format("MM/DD/YYYY");

    return start === end ? start : `${start} - ${end}`;
  }, [party]);

  return (
    <View style={styles.root}>
      <Text style={styles.contentTitle}>{party.name}</Text>
      <View style={styles.partyInfoContainer}>
        <Divider style={styles.divider} />
        <View style={styles.partyItemRowInfo}>
          <CalendarIcon style={styles.icon} />
          <Text style={styles.contentText}>{startDate}</Text>
        </View>
        <View style={styles.partyItemRowInfo}>
          <ClockIcon style={styles.icon} />
          <Text style={styles.contentText}>
            {dayjs(party.startTime).format("h:mm A")} -{" "}
            {dayjs(party.endTime).format("h:mm A")}
          </Text>
        </View>
        {!!party.street && (
          <View style={styles.partyItemRowInfo}>
            <LocationIcon style={styles.icon} />
            <Text style={styles.contentText}>{party.street}</Text>
          </View>
        )}
        <View style={styles.partyItemRowInfo}>
          <GuestsIcon style={styles.icon} />
          <Text style={styles.contentText}>
            {party.attendingMin}-{party.attendingMax} guest
          </Text>
        </View>
        <Divider style={styles.divider} />
      </View>
      {!!party.description && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.contentTitle}>Party Details</Text>
          <Text style={styles.contentText}>{party.description}</Text>
        </View>
      )}
    </View>
  );
};
