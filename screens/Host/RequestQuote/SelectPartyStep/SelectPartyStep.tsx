import React, { Dispatch, SetStateAction, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
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
import { RequestQuote } from "../RequestQuoteScreen";

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
};

export const SelectPartyStep: React.FC<SelectPartyStepProps> = ({
  quote,
  setQuote,
}) => {
  const [parties, setParties] = useState<Party[]>([
    {
      id: "1",
      name: "Mermaid Party",
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
    },
    {
      id: "",
      name: "New Party",
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
    },
  ]);

  const handleSelectParty = (party: Party) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        newParty: party,
      };
    });
  };

  const renderParty = (element: ListRenderItemInfo<Party>) => {
    return (
      <View style={styles.partyItemContainer}>
        <TouchableOpacity
          onPress={() => {
            handleSelectParty(element.item);
          }}
          style={styles.partyItem}
        >
          <Text style={styles.partyText}>{element.item.name}</Text>
          {!!element.item.date && (
            <Text style={styles.partyText}>
              {dayjs(element.item.date).format("MM dd,YYYY")}
            </Text>
          )}
          {element.item.name === quote?.newParty?.name ? (
            <CheckCircleIcon />
          ) : (
            <UncheckedCircleIcon />
          )}
        </TouchableOpacity>
        {element.index !== parties.length - 1 && <Divider />}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <Text style={styles.newPartyText}>Is this for a new party?</Text>
      <Text style={styles.existingPartyText}>OR an existing party?</Text>
      <FlatList
        data={parties}
        renderItem={renderParty}
        contentContainerStyle={styles.partiesContainer}
      />
    </View>
  );
};
