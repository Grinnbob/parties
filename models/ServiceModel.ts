export type ServiceModel = {
  VendorId: number;
  amount: number;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  price: number;
  rate: string;
  serviceTypes: Array<{ id: number; title: string }>;
  updatedAt: string;
};
