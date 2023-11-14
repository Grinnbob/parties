import React, { Dispatch, SetStateAction } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import {
  CheckCircleIcon,
  UncheckedCircleIcon,
} from "../../../../components/Icons";
import { Divider } from "../../../../components/Atoms";
import { RequestQuote } from "../RequestQuoteScreen";

const deliveryServiceOptions = [
  {
    id: "delivery",
    name: "Delivery Only",
  },
  {
    id: "pickup",
    name: "Pick-up only",
  },
];

const breakDownServiceOptions = [
  {
    id: "setupOnly",
    name: "Setup Only",
  },
  {
    id: "breakdownOnly",
    name: "Breakdown only",
  },
  {
    id: "both",
    name: "Both",
  },
  {
    id: "none",
    name: "None needed",
  },
];

type DeliveryServiceStepProps = {
  quote: RequestQuote;
  setQuote: Dispatch<SetStateAction<RequestQuote>>;
};

export const DeliveryServiceStep: React.FC<DeliveryServiceStepProps> = ({
  quote,
  setQuote,
}) => {
  const handleDeliveryServiceSelect = (id: string) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        deliveryService: id,
      };
    });
  };

  const handleBreakDownServiceSelect = (id: string) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        breakDownService: id,
      };
    });
  };

  const renderDeliveryListItem = (
    element: ListRenderItemInfo<(typeof deliveryServiceOptions)[number]>
  ) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            handleDeliveryServiceSelect(element.item.id);
          }}
          style={styles.listItem}
        >
          <Text style={styles.listItemText}>{element.item.name}</Text>
          {element.item.id === quote.deliveryService ? (
            <CheckCircleIcon />
          ) : (
            <UncheckedCircleIcon />
          )}
        </TouchableOpacity>
        {element.index !== deliveryServiceOptions.length - 1 && <Divider />}
      </>
    );
  };

  const renderBreakDownServiceListItem = (
    element: ListRenderItemInfo<(typeof deliveryServiceOptions)[number]>
  ) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            handleBreakDownServiceSelect(element.item.id);
          }}
          style={styles.listItem}
        >
          <Text style={styles.listItemText}>{element.item.name}</Text>
          {element.item.id === quote.breakDownService ? (
            <CheckCircleIcon />
          ) : (
            <UncheckedCircleIcon />
          )}
        </TouchableOpacity>
        {element.index !== breakDownServiceOptions.length - 1 && <Divider />}
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text style={styles.title}>Do you need delivery OR pickup service?</Text>
      <FlatList
        data={deliveryServiceOptions}
        renderItem={renderDeliveryListItem}
        contentContainerStyle={styles.listItemContainer}
      />
      <Text style={[styles.title, styles.breakDownText]}>
        Do you need setup and breakdown service?
      </Text>
      <FlatList
        data={breakDownServiceOptions}
        renderItem={renderBreakDownServiceListItem}
        contentContainerStyle={styles.listItemContainer}
      />
    </ScrollView>
  );
};
