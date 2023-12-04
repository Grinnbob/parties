import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import {
  ActivityIndicator,
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
import { RequestQuote, RequestQuoteStepEnum } from "../RequestQuoteScreen";
import { useLoadable } from "../../../../hooks";
import { constantsQuery } from "../../../../stateManagement";

type DeliveryServiceStepProps = {
  quote: RequestQuote;
  setQuote: Dispatch<SetStateAction<RequestQuote>>;
};

export const DeliveryServiceStep: React.FC<DeliveryServiceStepProps> = ({
  quote,
  setQuote,
}) => {
  const [constants, isConstantsLoading] = useLoadable(constantsQuery);

  const deliveryServiceOptions = useMemo(() => {
    if (constants) {
      return Object.values(constants.QUOTE_OPTIONS.SHIPMENT);
    }

    return [];
  }, [constants]);

  const breakDownServiceOptions = useMemo(() => {
    if (constants) {
      return Object.values(constants.QUOTE_OPTIONS.ASSEMBLING);
    }
    return [];
  }, [constants]);

  const handleDeliveryServiceSelect = (id: string) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        shipment: id,
      };
    });
  };

  const handleBreakDownServiceSelect = (id: string) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        assembling: id,
      };
    });
  };

  const isValid = !!quote.assembling && !!quote.shipment;

  useEffect(() => {
    setQuote((prevState) => {
      return {
        ...prevState,
        steps: {
          ...prevState.steps,
          [RequestQuoteStepEnum.DELIVERY_SERVICE]: { isValid },
        },
      } as RequestQuote;
    });
  }, [isValid]);

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
          <Text style={styles.listItemText}>{element.item.text}</Text>
          {element.item.id === quote.shipment ? (
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
          <Text style={styles.listItemText}>{element.item.text}</Text>
          {element.item.id === quote.assembling ? (
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
      {isConstantsLoading ? (
        <ActivityIndicator size={20} style={styles.activityIndicator} />
      ) : (
        <>
          <Text style={styles.title}>
            Do you need delivery OR pickup service?
          </Text>
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
        </>
      )}
    </ScrollView>
  );
};
