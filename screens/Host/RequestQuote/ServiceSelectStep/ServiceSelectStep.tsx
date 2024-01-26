import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "./styles";
import { RequestQuote, RequestQuoteStepEnum } from "../RequestQuoteScreen";
import { ServiceCard } from "../../../../components/Moleculs";
import { Button, GradientButton } from "../../../../components/Atoms";
import { ServiceModel } from "../../../../models";
import { useServiceGroups } from "../../../../hooks/useServiceGroups";

type SelectServiceStepProps = {
  quote: RequestQuote;
  setQuote: Dispatch<SetStateAction<RequestQuote>>;
  services: Array<ServiceModel>;
};

export const ServiceSelectStep: React.FC<SelectServiceStepProps> = ({
  quote,
  setQuote,
  services,
}) => {
  const handleSelectService = useCallback((id: number) => {
    setQuote((prevState) => {
      const isIncluded = prevState.services.includes(id);
      return {
        ...prevState,
        services: isIncluded
          ? prevState.services.filter((item) => item !== id)
          : [...prevState.services, id],
      };
    });
  }, []);

  const isValid = !!quote.services.length;

  useEffect(() => {
    setQuote((prevState) => {
      return {
        ...prevState,
        steps: {
          ...prevState.steps,
          [RequestQuoteStepEnum.SERVICE_SELECT]: { isValid },
        },
      } as RequestQuote;
    });
  }, [isValid]);

  const renderService = (element: ListRenderItemInfo<ServiceModel>) => {
    return (
      <ServiceCard
        name={element.item.name}
        description={element.item.description}
        price={element.item.price}
        unit={element.item.rate}
        isSelected={quote.services.includes(element.item.id)}
        style={[
          styles.serviceCard,
          !!quote.services.length && !quote.services.includes(element.item.id)
            ? styles.disabledService
            : undefined,
        ]}
        onPress={() => {
          handleSelectService(element.item.id);
        }}
      />
    );
  };

  const specialties = useMemo(() => {
    let result: ServiceModel["serviceTypes"] = [];
    services.forEach((item) => {
      result = [...result, ...item.serviceTypes];
    });
    const key = "id";
    return [...new Map(result.map((item) => [item[key], item])).values()];
  }, [services]);

  const filteredServices = useMemo(() => {
    if (quote.selectedSpecialties?.length) {
      const selectedIds = quote.selectedSpecialties.map((item) => item.id);
      return services.filter((service) => {
        return !!service.serviceTypes.find((type) =>
          selectedIds.includes(type.id)
        );
      });
    }
    return services;
  }, [services, quote.selectedSpecialties]);

  const { serviceGroups } = useServiceGroups(filteredServices);

  const handleSelectSpecialty = (
    item: ServiceModel["serviceTypes"][number],
    isSelected: boolean
  ) => {
    setQuote((prevState) => {
      const newVal = isSelected
        ? quote.selectedSpecialties.filter(
            (specialty) => specialty.id !== specialty.id
          )
        : [...quote.selectedSpecialties, item];
      return {
        ...prevState,
        selectedSpecialties: newVal,
      };
    });
  };

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>
        What kind of service you need (select all that apply)
      </Text>
      <View style={styles.tagsContainer}>
        <Text style={styles.vendorText}>Vendor Specialties</Text>
        <View style={styles.tagsInnerContainer}>
          {specialties.map((item) => {
            const isSelected = !!quote.selectedSpecialties.find(
              (specialty) => specialty.id === item.id
            );
            if (isSelected) {
              return (
                <GradientButton
                  key={item.id}
                  text={item.title}
                  style={styles.tag}
                  textStyle={styles.tagTextSelected}
                  onPress={() => {
                    handleSelectSpecialty(item, isSelected);
                  }}
                />
              );
            }
            return (
              <Button
                key={item.id}
                text={item.title}
                style={styles.tag}
                textStyle={styles.tagText}
                onPress={() => {
                  handleSelectSpecialty(item, isSelected);
                }}
              />
            );
          })}
        </View>
      </View>
      {Object.keys(serviceGroups).map((key, index) => {
        return (
          <View key={key} style={styles.serviceContainer}>
            <Text style={styles.serviceNameText}>{key}</Text>
            <FlatList
              data={serviceGroups[key]}
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
