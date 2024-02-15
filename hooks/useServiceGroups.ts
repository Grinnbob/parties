import { useMemo } from "react";
import { ServiceModel } from "../models";

export const useServiceGroups = (services: ServiceModel[]) => {
  const serviceGroups = useMemo(() => {
    const result: Record<string, Array<ServiceModel>> = {};    

    services.forEach((service) => {
      if (!service.serviceTypes.length) {
        if (result["Service"]) {
          result["Service"].push(service);
        } else {
          result["Service"] = [service];
        }
      }
      service.serviceTypes.forEach((type) => {
        if (result[type.title]) {
          result[type.title] = [...result[type.title], service];
        } else {
          result[type.title] = [service];
        }
      });
    });

    return result;
  }, [services]);

  return { serviceGroups };
};
