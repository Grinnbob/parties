import React, { useCallback, useMemo, useState } from "react";
import { Text, View } from "react-native";
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
import { DenyQuoteModal } from "../../Moleculs";
import { CreateQuoteModal } from "../../Moleculs/CreateQuoteModal/CreateQuoteModal";
import { Message } from "../Message/Message";
import FastImage from "react-native-fast-image";
import { Color } from "../../../GlobalStyles";
import useGlobalState from "../../../stateManagement/hook";
import StateTypes from "../../../stateManagement/StateTypes";

type MyQuoteMessageProps = {
  chatMessage: ChatMessageModel;
  isMe: boolean;
};

export const QuoteMessage: React.FC<MyQuoteMessageProps> = ({
  chatMessage,
  isMe,
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

  const [user] = useGlobalState(StateTypes.user.key, StateTypes.user.default);

  return (
    <>
      <Message
        chatMessage={chatMessage}
        isMe={isMe}
        type="host"
        content={
          <>
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
          </>
        }
      />
      {!isMe && (
        <>
          <View style={styles.innerContainer}>
            <View style={styles.actionsRoot}>
              <Text style={styles.actionTitle}>
                Would you like to accept or deny this Job?
              </Text>
              <GradientButton
                text="Create a Quote"
                textStyle={styles.createQuoteText}
                onPress={toggleQuoteModal}
              />
              <Button
                text="Denny Request"
                onPress={toggleDenyModal}
                style={styles.denyRequestButton}
              />
            </View>
            {user?.avatar ? (
              <FastImage
                style={styles.image}
                resizeMode="cover"
                source={{ uri: user?.avatar }}
              />
            ) : (
              <PersonIcon width={32} height={32} fill={Color.primaryPink} />
            )}
          </View>
          <DenyQuoteModal
            isOpen={isDenyModalOpen}
            onClose={toggleDenyModal}
            quoteId={chatMessage.QuoteId!}
          />
          <CreateQuoteModal
            isOpen={isCreateQuoteModalOpen}
            onClose={toggleQuoteModal}
          />
        </>
      )}
    </>
  );
};
