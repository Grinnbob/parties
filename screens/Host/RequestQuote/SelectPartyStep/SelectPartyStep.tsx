import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import dayjs from "dayjs";
import { styles } from "./styles";
import {
  CheckCircleIcon,
  UncheckedCircleIcon,
} from "../../../../components/Icons";
import { Divider } from "../../../../components/Atoms";
import { RequestQuote, RequestQuoteStepEnum } from "../RequestQuoteScreen";
import { PartyModel } from "../../../../models";

export type Party = {
  id: string;
  name: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
};

type SelectPartyStepProps = {
  quote: RequestQuote;
  setQuote: Dispatch<SetStateAction<RequestQuote>>;
  parties: Array<PartyModel>;
  isPartiesLoading: boolean;
};

export const SelectPartyStep: React.FC<SelectPartyStepProps> = ({
  quote,
  setQuote,
  parties,
  isPartiesLoading,
}) => {
  const actualParties = useMemo(() => {
    return [
      ...parties,
      {
        id: "",
        name: "",
      },
    ];
  }, [parties]);

  const handleSelectParty = (party: Party) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        party: party,
      };
    });
  };

  const isValid = quote?.party?.id !== undefined;

  useEffect(() => {
    setQuote((prevState) => {
      return {
        ...prevState,
        steps: {
          ...prevState.steps,
          [RequestQuoteStepEnum.PARTY_SELECT]: { isValid },
        },
      } as RequestQuote;
    });
  }, [isValid]);

  const renderParty = (element: ListRenderItemInfo<Party>) => {
    return (
      <View style={styles.partyItemContainer}>
        <TouchableOpacity
          onPress={() => {
            handleSelectParty(element.item);
          }}
          style={styles.partyItem}
        >
          <Text style={styles.partyText}>
            {element.item.name ? element.item.name : "New Party"}
          </Text>
          {!!element.item.date && (
            <Text style={styles.partyText}>
              {dayjs(element.item.date).format("MM dd,YYYY")}
            </Text>
          )}
          {element.item.id === quote?.party?.id ? (
            <CheckCircleIcon />
          ) : (
            <UncheckedCircleIcon />
          )}
        </TouchableOpacity>
        {element.index !== actualParties.length - 1 && <Divider />}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {isPartiesLoading ? (
        <ActivityIndicator size={20} style={styles.activityIndicator} />
      ) : (
        <>
          <Text style={styles.newPartyText}>Is this for a new party?</Text>
          <Text style={styles.existingPartyText}>OR an existing party?</Text>
          <FlatList
            data={actualParties}
            renderItem={renderParty}
            contentContainerStyle={styles.partiesContainer}
          />
        </>
      )}
    </View>
  );
};
