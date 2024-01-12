import React from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { styles } from "./styles";
import { AddButton } from "../../Atoms/AddButton";
import { ServiceModel } from "../../../models";
import { useNavigation } from "@react-navigation/native";
import { useServiceGroups } from "../../../hooks/useServiceGroups";
import { ServiceCard } from "./ServiceCard";

type ServicesListProps = {
  label: string;
  services: Array<ServiceModel>;
  vendorId: number;
};

export const ServicesList: React.FC<ServicesListProps> = ({
  label,
  services,
  vendorId,
}) => {
  const navigation = useNavigation();
  const handleAddPress = () => {
    navigation.navigate("AlbumNavigator", {
      screen: "Service",
      params: {
        vendorId: vendorId,
      },
    });
  };

  // console.log("services", services);
  const { serviceGroups } = useServiceGroups(services);

  // console.log("serviceGroups", serviceGroups);
  const renderService = (element: ListRenderItemInfo<ServiceModel>) => {
    return (
      <ServiceCard
        name={element.item.name}
        description={element.item.description}
        price={element.item.price}
        unit={element.item.rate}
      />
    );
  };

  const groups = Object.keys(serviceGroups);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>{label}</Text>
        <AddButton onPress={handleAddPress} />
      </View>
      <View style={styles.content}>
        {groups.length ? (
          <>
            {groups.map((key, index) => {
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
          </>
        ) : (
          <ServiceCard
            name="Create A Service Package"
            description="Add a description for your package here. This is what your service package will look like once you add your image and details."
            price={1}
            unit="person"
            disabled={true}
            image={{
              source: require("../../../assets/service-default-image.png"),
            }}
          />
        )}
      </View>
    </View>
  );
};
