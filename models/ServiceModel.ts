export type ServiceModel = {
  vendorId: number;
  amount: number;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  price: number;
  rate: string;
  image: string;
  serviceTypes: Array<{ id: number; title: string }>;
  updatedAt: string;
};
