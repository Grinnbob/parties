export type ConstantsModel = {
  QUOTE_OPTIONS: {
    ASSEMBLING: {
      BOTH: string;
      BREAKDOWN: string;
      NONE: string;
      SETUP: string;
    };
    CANCELLATION: { WITHIN24BACK80: string };
    PAY: { CARD: string; CASH: string };
    SHIPMENT: { DELIVERY: string; PICKUP: string };
    STATUS: {
      ACCEPTED: string;
      DENIED: string;
      NEW: string;
      PENDING: string;
    };
  };
};
