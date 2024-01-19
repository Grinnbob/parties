import React, { useState } from "react";
import { FlatList, ListRenderItemInfo, Text, View } from "react-native";
import { styles } from "./styles";
import { AddButton } from "../../Atoms/AddButton";
import { ServiceModel } from "../../../models";
import { useNavigation } from "@react-navigation/native";
import { useServiceGroups } from "../../../hooks/useServiceGroups";
import { ServiceCard } from "./ServiceCard";
import { ConfirmationModal } from "../ConfirmationModal";
import apis from "../../../apis";
import { useToast } from "native-base";

type ServicesListProps = {
  label: string;
  services: Array<ServiceModel>;
  vendorId: number;
  onDelete?: (service: ServiceModel) => void;
  onEdit?: (service: ServiceModel) => void;
};

export const ServicesList: React.FC<ServicesListProps> = ({
  label,
  services,
  vendorId,
  onDelete,
  onEdit,
}) => {
  const toast = useToast();
  const navigation = useNavigation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceModel | null>(
    null
  );
  const handleAddPress = () => {
    navigation.push("Service", {
      vendorId: vendorId,
      onEdit,
    });
  };

  const handleEditPress = (service: ServiceModel) => {
    navigation.push("Service", {
      vendorId: vendorId,
      service,
      onEdit,
    });
  };

  const handleDeletePress = (service: ServiceModel) => {
    setServiceToDelete(service);
  };

  const handleDeleteService = async () => {
    try {
      setIsDeleting(true);
      if (serviceToDelete) {
        const res = await apis.service.deleteById(String(serviceToDelete.id));
        if (res?.success === false) {
          toast.show({
            placement: "top",
            description: res.message,
          });
        } else {
          toast.show({
            placement: "top",
            description: `${serviceToDelete.name} was removed`,
          });
          onDelete?.(serviceToDelete);
        }
        setServiceToDelete(null);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setServiceToDelete(null);
  };

  const { serviceGroups } = useServiceGroups(services);

  const renderService = (element: ListRenderItemInfo<ServiceModel>) => {
    return (
      <ServiceCard
        name={element.item.name}
        description={element.item.description}
        price={element.item.price}
        unit={element.item.rate}
        image={{ source: { uri: element.item.image }, resizeMode: "cover" }}
        actions={{
          onDelete: () => {
            handleDeletePress(element.item);
          },
          onEdit: () => {
            handleEditPress(element.item);
          },
        }}
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
      <ConfirmationModal
        isOpen={!!serviceToDelete}
        onClose={handleCloseDeleteModal}
        title={`Are sure to delete ${serviceToDelete?.name} service?`}
        onAccept={handleDeleteService}
        isLoading={isDeleting}
      />
    </View>
  );
};
