export type PartyModel = {
  id: number;
  name: string;
  description?: string;
  theme?: string;
  startDate: string;
  endDate: string;
  startTime?: Date;
  endTime?: Date;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  point?: [number, number];
  attendingMin: number;
  attendingMax: number;
  image?: string;
};
