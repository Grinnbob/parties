import { selector } from "recoil";
import { ConstantsModel, ServiceTypeModel } from "../../models";
import apis from "../../apis";

export const serviceTypesQuery = selector<ServiceTypeModel[]>({
  key: "serviceTypesQuery",
  get: async () => {
    const serviceTypes = await apis.serviceType.getAll();
    return serviceTypes;
  },
});

export const constantsQuery = selector<ConstantsModel>({
  key: "constantsQuery",
  get: async () => {
    const constants = await apis.constants.getAll();
    return constants;
  },
});
