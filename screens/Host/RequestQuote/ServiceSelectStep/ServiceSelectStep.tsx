import React, { Dispatch, SetStateAction, useCallback } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "./styles";
import { RequestQuote } from "../RequestQuoteScreen";
import { ServiceCard } from "./ServiceCard";
import { Button } from "../../../../components/Atoms";

type SelectServiceStepProps = {
  quote: RequestQuote;
  setQuote: Dispatch<SetStateAction<RequestQuote>>;
};

const services = [
  {
    name: "Food",
    data: [
      {
        id: 1,
        name: "BBQ Combo 1 + Sides",
        price: "20",
        unit: "person",
        description:
          "All combos come with your choice of one of the following per season: Bean paste sew, tofu soup, white kimchi noodles, or steamed egg.",
      },
      {
        id: 2,
        name: "BBQ Combo 1 + Sides",
        price: "20",
        unit: "person",
        description:
          "All combos come with your choice of one of the following per season: Bean paste sew, tofu soup, white kimchi noodles, or steamed egg.",
      },
    ],
  },
  {
    name: "Party Rental",
    data: [
      {
        id: 3,
        name: "2 Table + 10 Chairs",
        price: "20",
        unit: "person",
        description:
          "All combos come with your choice of one of the following per season: Bean paste sew, tofu soup, white kimchi noodles, or steamed egg.",
      },
      {
        id: 4,
        name: "2 Table + 10 Chairs",
        price: "20",
        unit: "person",
        description:
          "All combos come with your choice of one of the following per season: Bean paste sew, tofu soup, white kimchi noodles, or steamed egg.",
      },
    ],
  },
];

export const ServiceSelectStep: React.FC<SelectServiceStepProps> = ({
  quote,
  setQuote,
}) => {
  const handleSelectService = useCallback((id: number) => {
    setQuote((prevState) => {
      return {
        ...prevState,
        selectedService: id,
      };
    });
  }, []);

  const renderService = (
    element: ListRenderItemInfo<(typeof services)[number]["data"][number]>
  ) => {
    return (
      <ServiceCard
        name={element.item.name}
        description={element.item.description}
        price={element.item.price}
        unit={element.item.unit}
        isSelected={quote.selectedService === element.item.id}
        style={
          !!quote.selectedService && quote.selectedService !== element.item.id
            ? styles.disabledService
            : undefined
        }
        onPress={() => {
          handleSelectService(element.item.id);
        }}
      />
    );
  };

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>
        What kind of service you need (select all that apply)
      </Text>
      <View style={styles.tagsContainer}>
        <Text style={styles.vendorText}>Vendor Specialties</Text>
        <View style={styles.tagsInnerContainer}>
          <Button text="Food" style={styles.tag} textStyle={styles.tagText} />
          <Button
            text="Party Rentals"
            style={styles.tag}
            textStyle={styles.tagText}
          />
          <Button
            text="Decorations"
            style={styles.tag}
            textStyle={styles.tagText}
          />
        </View>
      </View>
      {services.map((service, index) => {
        return (
          <View key={service.name} style={styles.serviceContainer}>
            <Text style={styles.serviceNameText}>{service.name}</Text>
            <FlatList
              data={service.data}
              renderItem={renderService}
              contentContainerStyle={[
                styles.serviceItemsContainer,
                index === services.length - 1
                  ? styles.lastContainer
                  : undefined,
              ]}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};
