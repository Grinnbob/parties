import React, { useState } from "react";
import {
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
import { RequestQuote } from "../RequestQuoteScreen";

export type Party = {
  name: string;
  date?: Date;
  startTime?: string;
  endTime?: string;
};

type SelectPartyStepProps = {
  quote: RequestQuote;
};

export const SelectPartyStep: React.FC<SelectPartyStepProps> = ({ quote }) => {
  const [parties, setParties] = useState<Party[]>([
    { name: "Mermaid Party", date: new Date() },
    { name: "New Party" },
  ]);
  const [selectedParty, setSelectedParty] = useState(quote.party);

  const handleSelectParty = (party: Party) => {
    setSelectedParty(party);
  };

  const renderParty = (element: ListRenderItemInfo<Party>) => {
    return (
      <>
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
          {element.item.name === selectedParty?.name ? (
            <CheckCircleIcon />
          ) : (
            <UncheckedCircleIcon />
          )}
        </TouchableOpacity>
        {element.index !== parties.length - 1 && <Divider />}
      </>
    );
  };

  return (
    <>
      <View>
        <Text style={styles.newPartyText}>Is this for a new party?</Text>
        <Text style={styles.existingPartyText}>OR an existing party?</Text>
      </View>
      <View style={styles.partiesContainer}>
        <FlatList data={parties} renderItem={renderParty} />
      </View>
    </>
  );
};
