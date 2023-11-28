import React, { useCallback, useMemo, useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import {
  CalendarIcon,
  ClockIcon,
  GuestsIcon,
  LocationIcon,
  PersonIcon,
} from "../../Icons";
import { ChatMessageModel } from "../../../models";
import dayjs from "dayjs";
import { Button, GradientButton } from "../../Atoms";
import { DenyQuoteModal } from "../../Moleculs/DenyQuoteModal";
import { CreateQuoteModal } from "../../Moleculs/CreateQuoteModal/CreateQuoteModal";

type MyQuoteMessageProps = {
  chatMessage: ChatMessageModel;
  onErrorPress?: (id: string | number) => void;
  onImagePress?: (imageUrl: string) => void;
};

export const QuoteMessage: React.FC<MyQuoteMessageProps> = ({
  chatMessage,
}) => {
  const { party } = chatMessage;
  const startDate = useMemo(() => {
    const start = dayjs(party?.startDate).format("MM/DD/YYYY");
    const end = dayjs(party?.endDate).format("MM/DD/YYYY");

    return start === end ? start : `${start} - ${end}`;
  }, [party]);

  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [isCreateQuoteModalOpen, setIsCreateQuoteModalOpen] = useState(false);

  const toggleDenyModal = useCallback(() => {
    setIsDenyModalOpen((prevState) => {
      return !prevState;
    });
  }, []);

  const toggleQuoteModal = useCallback(() => {
    setIsCreateQuoteModalOpen((prevState) => {
      return !prevState;
    });
  }, []);

  return (
    <>
      <View style={styles.root}>
        <View style={styles.infoContainer}>
          <View style={styles.messageContainer}>
            <Text style={styles.partyNameText}>{party?.name}</Text>
            <View style={styles.partyInfoContainer}>
              <View style={styles.partyItemRowInfo}>
                <CalendarIcon style={styles.icon} />
                <Text style={styles.contentText}>{startDate}</Text>
              </View>
              <View style={styles.partyItemRowInfo}>
                <ClockIcon style={styles.icon} />
                <Text style={styles.contentText}>
                  {dayjs(party?.startTime).format("h:mm A")} -{" "}
                  {dayjs(party?.endTime).format("h:mm A")}
                </Text>
              </View>
              {!!party?.street && (
                <View style={styles.partyItemRowInfo}>
                  <LocationIcon style={styles.icon} />
                  <Text style={styles.contentText}>{party.street}</Text>
                </View>
              )}
              <View style={styles.partyItemRowInfo}>
                <GuestsIcon style={styles.icon} />
                <Text style={styles.contentText}>
                  {party?.attendingMin}-{party?.attendingMax} guest
                </Text>
              </View>
            </View>
            {!!party?.description && (
              <Text style={styles.descriptionText}>{party?.description}</Text>
            )}
          </View>
        </View>
        {chatMessage.user?.avatar ? (
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: chatMessage.user?.avatar }}
          />
        ) : (
          <PersonIcon width={32} height={32} style={styles.personIcon} />
        )}
      </View>
      <View style={styles.actionsRoot}>
        <Text style={styles.actionTitle}>
          Would you like to accept or deny this Job?
        </Text>
        <GradientButton text="Create a Quote" />
        <Button text="Denny Request" onPress={toggleDenyModal} />
      </View>
      <DenyQuoteModal isOpen={isDenyModalOpen} onClose={toggleDenyModal} />
      <CreateQuoteModal
        isOpen={isCreateQuoteModalOpen}
        onClose={toggleQuoteModal}
      />
    </>
  );
};
