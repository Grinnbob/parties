import React, { useMemo, useState } from "react";
import { Image, ImageBackground, SafeAreaView, Text, View } from "react-native";
import { styles } from "./styles";
import { Divider, Tabs } from "../../../components/Atoms";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../../../components/navigation/BackButton";
import { PartyModel } from "../../../models";
import {
  CalendarIcon,
  ClockIcon,
  GuestsIcon,
  LocationIcon,
} from "../../../components/Icons";
import dayjs from "dayjs";
import { Chat } from "../../../components/Chat";
import useGlobalState from "../../../stateManagement/hook";
import StateTypes from "../../../stateManagement/StateTypes";

const tabs = [
  {
    id: "eventDetails",
    label: "Event Details",
  },
  {
    id: "messages",
    label: "Messages",
  },
];

type PartyDetailsScreenProps = {
  route: {
    params: {
      party: PartyModel;
    };
  };
};

export const PartyDetailsScreen: React.FC<PartyDetailsScreenProps> = ({
  route,
}) => {
  const navigation = useNavigation();
  const { navigate } = navigation;
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [user] = useGlobalState(StateTypes.user.key, StateTypes.user.default);

  const handleTabChange = (id: string) => {
    setSelectedTab(id);
  };

  const { party } = route.params;

  const startDate = useMemo(() => {
    const start = dayjs(party.startDate).format("MM/DD/YYYY");
    const end = dayjs(party.endDate).format("MM/DD/YYYY");

    return start === end ? start : `${start} - ${end}`;
  }, [party]);

  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.bgIcon}
        resizeMode="cover"
        source={require("../../../assets/bg11.png")}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <View style={styles.header}>
          <Image
            style={styles.partyImage}
            source={require("../../../assets/photo-05.png")}
          />
          <View style={styles.headerInnerContainer}>
            <View style={styles.backButtonContainer}>
              <BackButton />
            </View>
          </View>
        </View>
        <Tabs value={selectedTab} tabs={tabs} onChange={handleTabChange} />
        <View style={styles.content}>
          {selectedTab === tabs[0].id && (
            <View style={styles.eventDetailsContainer}>
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
          )}
          {selectedTab === tabs[1].id && (
            <Chat conversationId={"1"} userId={user.id} />
          )}
        </View>
      </View>
    </View>
  );
};
